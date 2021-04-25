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

namespace API.Schema.Entities.Classroom {
    public class ClassroomType : ObjectType<Entity.Classroom> {
        protected override void Configure(IObjectTypeDescriptor<Entity.Classroom> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(x => x.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<ClassroomByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(x => x.UserClassrooms)
                .ResolveWith<ClassroomResolvers>(x => x.GetUsersAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("users");
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
                    .SelectMany(c => c.UserClassrooms.Select(uc => uc.UserId!))
                    .ToArrayAsync();

                return await userById.LoadAsync(userIds, cancellationToken);
            }
        }
    }
}
