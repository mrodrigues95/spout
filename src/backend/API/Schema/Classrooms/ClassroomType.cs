using API.Data;
using API.Data.Entities;
using API.Extensions;
using API.Schema.Users;
using HotChocolate;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.Classrooms {
    public class ClassroomType : ObjectType<Classroom> {
        protected override void Configure(IObjectTypeDescriptor<Classroom> descriptor) {
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
            public async Task<IEnumerable<User>> GetUsersAsync(
                Classroom classroom,
                [ScopedService] ApplicationDbContext dbContext,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) {
                int[] userIds = await dbContext.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.UserClassrooms)
                    .SelectMany(c => c.UserClassrooms.Select(cau => cau.UserId!))
                    .ToArrayAsync();

                return await userById.LoadAsync(userIds, cancellationToken);
            }
        }
    }
}
