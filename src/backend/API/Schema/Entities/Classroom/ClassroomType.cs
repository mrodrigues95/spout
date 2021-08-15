using API.Data;
using Entity = API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Schema.Entities.User;
using API.Schema.Entities.Discussion;

namespace API.Schema.Entities.Classroom {
    public class ClassroomType : ObjectType<Entity.Classroom> {
        protected override void Configure(IObjectTypeDescriptor<Entity.Classroom> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(c => c.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<ClassroomByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(c => c.UserClassrooms)
                .ResolveWith<ClassroomResolvers>(x => x.GetUsersAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("users");

            descriptor
                .Field(c => c.Discussions)
                .ResolveWith<ClassroomResolvers>(x => x.GetDiscussionsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("discussions");
        }

        private class ClassroomResolvers {
            public async Task<IEnumerable<Entity.User>> GetUsersAsync(
                Entity.Classroom classroom,
                [ScopedService] ApplicationDbContext dbContext,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) {
                int[] userIds = await dbContext.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.UserClassrooms)
                    .SelectMany(c => c.UserClassrooms.Select(u => u.UserId))
                    .ToArrayAsync(cancellationToken);

                return await userById.LoadAsync(userIds, cancellationToken);
            }

            public async Task<IEnumerable<Entity.Discussion>> GetDiscussionsAsync(
                Entity.Classroom classroom,
                [ScopedService] ApplicationDbContext dbContext,
                DiscussionByIdDataLoader discussionById,
                CancellationToken cancellationToken) {
                int[] discussionIds = await dbContext.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.Discussions)
                    .SelectMany(c => c.Discussions.Select(d => d.Id))
                    .ToArrayAsync(cancellationToken);

                return await discussionById.LoadAsync(discussionIds, cancellationToken);
            }
        }
    }
}
