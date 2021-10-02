using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Sessions;
using API.Schema.Types.Classrooms;
using API.Schema.Types.Sessions;
using API.Schema.Queries.Users;

namespace API.Schema.Types.Users {
    public class UserType : ObjectType<User> {
        protected override void Configure(IObjectTypeDescriptor<User> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(x => x.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<UserByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(x => x.Classrooms)
                .Type<NonNullType<ListType<NonNullType<ClassroomType>>>>()
                .ResolveWith<UserResolvers>(x => x.GetClassroomsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("classrooms");

            descriptor
                .Field(x => x.Sessions)
                .Type<NonNullType<ListType<NonNullType<SessionType>>>>()
                .ResolveWith<UserResolvers>(x => x.GetSessionsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("sessions");
        }

        private class UserResolvers {
            public async Task<IEnumerable<Classroom>> GetClassroomsAsync(
                [Parent] User user,
                [ScopedService] ApplicationDbContext dbContext,
                ClassroomByIdDataLoader classroomById,
                CancellationToken cancellationToken) {
                int[] classroomIds = await dbContext.Users
                    .Where(u => u.Id == user.Id)
                    .Include(u => u.Classrooms)
                    .SelectMany(u => u.Classrooms.Select(uc => uc.ClassroomId))
                    .ToArrayAsync();

                return await classroomById.LoadAsync(classroomIds, cancellationToken);
            }

            public async Task<IEnumerable<Session>> GetSessionsAsync(
                [Parent] User user,
                [ScopedService] ApplicationDbContext dbContext,
                SessionByIdDataLoader sessionById,
                CancellationToken cancellationToken) {
                Guid[] sessionIds = await dbContext.Users
                    .Where(u => u.Id == user.Id)
                    .Include(u => u.Sessions)
                    .SelectMany(u => u.Sessions.Select(s => s.Id))
                    .ToArrayAsync();

                return await sessionById.LoadAsync(sessionIds, cancellationToken);
            }
        }
    }
}
