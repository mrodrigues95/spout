using API.Data.Entities;
using HotChocolate.Types;
using System.Threading.Tasks;
using System.Threading;
using HotChocolate;
using API.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using HotChocolate.Types.Pagination;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Messages;
using API.Schema.Queries.Users;
using API.Schema.Types.Classrooms;
using API.Schema.Types.Messages;
using API.Schema.Types.Users;
using API.Schema.Queries.Discussions;

namespace API.Schema.Types.Discussions {
    public enum DiscussionEvent {
        CHANGE_TOPIC,
        CHANGE_DESCRIPTION
    }

    public class DiscussionEventType : EnumType<DiscussionEvent> { }

    public class DiscussionType : ObjectType<Discussion> {
        protected override void Configure(IObjectTypeDescriptor<Discussion> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(d => d.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<DiscussionByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(d => d.CreatedBy)
                .Type<NonNullType<UserType>>()
                .ResolveWith<DiscussionResolvers>(x => x.GetCreatedByAsync(default!, default!, default!))
                .Name("createdBy");

            descriptor
                .Field(d => d.Classroom)
                .Type<NonNullType<ClassroomType>>()
                .ResolveWith<DiscussionResolvers>(x => x.GetClassroomAsync(default!, default!, default!))
                .Name("classroom");

            descriptor
                .Field(d => d.Messages)
                .Type<NonNullType<ListType<NonNullType<MessageType>>>>()
                .UsePaging<NonNullType<MessageType>>(options: new PagingOptions { MaxPageSize = 50 })
                .UseSorting()
                .ResolveWith<DiscussionResolvers>(x => x.GetMessagesAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("messages");
        }

        private class DiscussionResolvers {
            public async Task<Classroom> GetClassroomAsync(
                [Parent] Discussion discussion,
                ClassroomByIdDataLoader classroomById,
                CancellationToken cancellationToken) =>
                await classroomById.LoadAsync(discussion.ClassroomId, cancellationToken);

            public async Task<User> GetCreatedByAsync(
                [Parent] Discussion discussion,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) =>
                await userById.LoadAsync(discussion.CreatedById, cancellationToken);

            public async Task<IEnumerable<Message>> GetMessagesAsync(
                [Parent] Discussion discussion,
                [ScopedService] ApplicationDbContext context,
                MessageByIdDataLoader messageById,
                CancellationToken cancellationToken) {
                // TODO: Paginate this.
                // This will currently fetch all messages and chop the pages in memory but
                // instead we should paginate the messages before passing it into the data loader.
                // See: https://github.com/ChilliCream/graphql-workshop/blob/master/docs/6-adding-complex-filter-capabilities.md
                int[] messageIds = await context.Discussions
                    .Where(d => d.Id == discussion.Id)
                    .Include(d => d.Messages)
                    .SelectMany(d => d.Messages.Select(m => m.Id))
                    .ToArrayAsync(cancellationToken);

                return await messageById.LoadAsync(messageIds, cancellationToken);
            }
        }
    }
}
