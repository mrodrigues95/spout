using Entity = API.Data.Entities;
using HotChocolate.Types;
using HotChocolate.Resolvers;
using System.Threading.Tasks;
using API.Schema.Entities.Classroom;
using System.Threading;
using API.Schema.Entities.User;
using HotChocolate;
using API.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.Schema.Entities.Message;
using HotChocolate.Types.Pagination;

namespace API.Schema.Entities.Discussion {
    public class DiscussionType : ObjectType<Entity.Discussion> {
        protected override void Configure(IObjectTypeDescriptor<Entity.Discussion> descriptor) {
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
            public async Task<Entity.Classroom> GetClassroomAsync(
                Entity.Discussion discussion,
                ClassroomByIdDataLoader classroomById,
                CancellationToken cancellationToken) =>
                await classroomById.LoadAsync(discussion.ClassroomId, cancellationToken);

            public async Task<Entity.User> GetCreatedByAsync(
                Entity.Discussion discussion,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) =>
                await userById.LoadAsync(discussion.CreatedById, cancellationToken);

            public async Task<IEnumerable<Entity.Message>> GetMessagesAsync(
                Entity.Discussion discussion,
                [ScopedService] ApplicationDbContext dbContext,
                MessageByIdDataLoader messageById,
                CancellationToken cancellationToken) {
                // TODO: Paginate this.
                // This will currently fetch all messages and chop the pages in memory but
                // instead we should paginate the messages before passing it into the data loader.
                // See: https://github.com/ChilliCream/graphql-workshop/blob/master/docs/6-adding-complex-filter-capabilities.md
                int[] messageIds = await dbContext.Discussions
                    .Where(d => d.Id == discussion.Id)
                    .Include(d => d.Messages)
                    .SelectMany(d => d.Messages.Select(m => m.Id))
                    .ToArrayAsync(cancellationToken);

                return await messageById.LoadAsync(messageIds, cancellationToken);
            }                    
        }
    }
}
