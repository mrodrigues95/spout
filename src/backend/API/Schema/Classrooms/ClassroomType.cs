using API.Data;
using API.Data.Entities;
using API.Extensions;
using API.Schema.ApplicationUsers;
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
                .Field(x => x.ApplicationUserClassrooms)
                .ResolveWith<ClassroomResolvers>(x => x.GetApplicationUsersAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("applicationUsers");
        }

        private class ClassroomResolvers {
            public async Task<IEnumerable<ApplicationUser>> GetApplicationUsersAsync(
                Classroom classroom,
                [ScopedService] ApplicationDbContext dbContext,
                ApplicationUserByIdDataLoader applicationUserById,
                CancellationToken cancellationToken) {
                int[] userIds = await dbContext.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.ApplicationUserClassrooms)
                    .SelectMany(c => c.ApplicationUserClassrooms.Select(cau => cau.ApplicationUserId!))
                    .ToArrayAsync();

                return await applicationUserById.LoadAsync(userIds, cancellationToken);
            }
        }
    }
}
