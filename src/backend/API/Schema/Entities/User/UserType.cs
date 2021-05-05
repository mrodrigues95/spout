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
using API.Schema.Entities.Classroom;
using System;
using API.Schema.Entities.Session;

namespace API.Schema.Entities.User {
    public class UserType : ObjectType<Entity.User> {
        protected override void Configure(IObjectTypeDescriptor<Entity.User> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(x => x.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<UserByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(x => x.UserClassrooms)
                .ResolveWith<UserResolvers>(x => x.GetClassroomsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("classrooms");

            descriptor
                .Field(x => x.Sessions)
                .ResolveWith<UserResolvers>(x => x.GetSessionsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("sessions");
        }

        private class UserResolvers {
            public async Task<IEnumerable<Entity.Classroom>> GetClassroomsAsync(
                Entity.User user,
                [ScopedService] ApplicationDbContext dbContext,
                ClassroomByIdDataLoader classroomById,
                CancellationToken cancellationToken) {
                int[] classroomIds = await dbContext.Users
                    .Where(u => u.Id == user.Id)
                    .Include(u => u.UserClassrooms)
                    .SelectMany(u => u.UserClassrooms.Select(uc => uc.ClassroomId))
                    .ToArrayAsync();

                return await classroomById.LoadAsync(classroomIds, cancellationToken);
            }

            public async Task<IEnumerable<Entity.Session>> GetSessionsAsync(
                Entity.User user,
                [ScopedService] ApplicationDbContext dbContext,
                SessionByIdDataLoader sessionById,
                CancellationToken cancellationToken) {
                Guid[] sessionIds = await dbContext.Users
                    .Where(u => u.Id == user.Id)
                    .Include(u => u.Sessions)
                    .SelectMany(u => u.Sessions.Select(us => us.Id))
                    .ToArrayAsync();

                return await sessionById.LoadAsync(sessionIds, cancellationToken);
            }
        }
    }
}
