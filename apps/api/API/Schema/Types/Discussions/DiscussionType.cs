using API.Data.Entities;
using HotChocolate.Types;
using System.Threading.Tasks;
using System.Threading;
using HotChocolate;
using API.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using HotChocolate.Types.Pagination;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Users;
using API.Schema.Types.Classrooms;
using API.Schema.Types.Messages;
using API.Schema.Types.Users;
using API.Schema.Queries.Discussions;
using HotChocolate.Data.Filters;
using HotChocolate.Resolvers;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Data.Sorting.Expressions;
using HotChocolate.Types.Pagination.Extensions;

namespace API.Schema.Types.Discussions {
    public class DiscussionFilterInputType : FilterInputType<Discussion> {
        protected override void Configure(IFilterInputTypeDescriptor<Discussion> descriptor) {
            descriptor
                .Field(x => x.Id)
                .Type<IdOperationFilterInputType>();
        }
    }

    public class DiscussionType : ObjectType<Discussion> {
        protected override void Configure(IObjectTypeDescriptor<Discussion> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(d => d.Id)
                .ResolveNode((ctx, id) =>
                    ctx.DataLoader<DiscussionByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(d => d.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(d => d.Name)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(d => d.ClassroomId)
                .Type<NonNullType<IntType>>()
                .Ignore();

            descriptor
                .Field(d => d.CreatedById)
                .Type<NonNullType<IntType>>()
                .Ignore();

            descriptor
                .Field(d => d.StateId)
                .Type<NonNullType<IntType>>()
                .Ignore();

            descriptor
                .Field(d => d.CreatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(d => d.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(d => d.CreatedBy)
                .Type<NonNullType<UserType>>()
                .ResolveWith<DiscussionResolvers>(x =>
                    x.GetCreatedByAsync(default!, default!, default!))
                .Name("createdBy");

            descriptor
                .Field(d => d.Classroom)
                .Type<NonNullType<ClassroomType>>()
                .ResolveWith<DiscussionResolvers>(x =>
                    x.GetClassroomAsync(default!, default!, default!))
                .Name("classroom");

            descriptor
                .Field(d => d.Messages)
                .Type<NonNullType<ListType<NonNullType<MessageType>>>>()
                .UseDbContext<ApplicationDbContext>()
                .UsePaging<NonNullType<MessageType>>()
                .UseFiltering()
                .UseSorting()
                .ResolveWith<DiscussionResolvers>(x =>
                    x.GetMessagesAsync(default!, default!, default!, default!))
                .Name("messages");
        }

        private class DiscussionResolvers {
            public async Task<Classroom> GetClassroomAsync(
                [Parent] Discussion discussion,
                ClassroomByIdDataLoader classroomById,
                CancellationToken cancellationToken)
                => await classroomById.LoadAsync(discussion.ClassroomId, cancellationToken);

            public async Task<User> GetCreatedByAsync(
                [Parent] Discussion discussion,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken)
                => await userById.LoadAsync(discussion.CreatedById, cancellationToken);

            public async Task<Connection<Message>> GetMessagesAsync(
                [Parent] Discussion discussion,
                [ScopedService] ApplicationDbContext dbContext,
                IResolverContext resolverCtx,
                CancellationToken cancellationToken) {
                var query = dbContext.Discussions
                    .Where(d => d.Id == discussion.Id)
                    .Include(d => d.Messages)
                    .SelectMany(d => d.Messages
                        .Where(m => m.DeletedAt == null))
                    .AsQueryable();

                var connection = await query                
                    .Filter(resolverCtx)
                    .Sort(resolverCtx)
                    .ApplyCursorPaginationAsync(resolverCtx, cancellationToken: cancellationToken);

                return connection;
            }
        }
    }
}
