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
                .Field(d => d.UserDiscussions)
                .Type<NonNullType<ListType<NonNullType<UserType>>>>()
                .ResolveWith<DiscussionResolvers>(x => x.GetUsersAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("users");
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

            public async Task<IEnumerable<Entity.User>> GetUsersAsync(
                Entity.Discussion discussion,
                [ScopedService] ApplicationDbContext dbContext,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) {
                int[] userIds = await dbContext.Discussions
                    .Where(d => d.Id == discussion.Id)
                    .Include(d => d.UserDiscussions)
                    .SelectMany(d => d.UserDiscussions.Select(ud => ud.UserId))
                    .ToArrayAsync();

                return await userById.LoadAsync(userIds, cancellationToken);
            }
                    
        }
    }
}
