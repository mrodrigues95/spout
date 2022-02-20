using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Sessions;
using API.Schema.Queries.Users;
using API.Schema.Types.Classrooms;
using API.Schema.Types.Sessions;
using HotChocolate;
using HotChocolate.Data.Filters;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace API.Schema.Types.Users {
    public enum UserProfileColor {
        SKY,
        PINK,
        GREEN,
        PURPLE,
        ROSE,
        GRAY,
        ORANGE
    }

    public class UserProfileColorType : EnumType<UserProfileColor> { }

    public class UserFilterInputType : FilterInputType<User> {
        protected override void Configure(IFilterInputTypeDescriptor<User> descriptor) {
            descriptor
                .Field(x => x.Id)
                .Type<IdOperationFilterInputType>();
        }
    }

    public class UserType : ObjectType<User> {
        protected override void Configure(IObjectTypeDescriptor<User> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(x => x.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<UserByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(u => u.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(u => u.StateId)
                .Type<NonNullType<IntType>>()
                .Ignore();

            descriptor
                .Field(u => u.Name)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(u => u.Email)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(u => u.ProfileColor)
                .Type<NonNullType<UserProfileColorType>>();

            descriptor
                .Field(u => u.CreatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(u => u.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

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
