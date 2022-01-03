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
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Discussions;
using API.Schema.Queries.Users;

namespace API.Schema.Types.Classrooms {
    public class ClassroomType : ObjectType<Classroom> {
        protected override void Configure(IObjectTypeDescriptor<Classroom> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(c => c.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<ClassroomByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(c => c.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(c => c.Name)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(c => c.StateId)
                .Type<NonNullType<IntType>>()
                .Ignore();

           descriptor
                .Field(c => c.CreatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(c => c.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(c => c.Users)
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
            public async Task<IEnumerable<User>> GetUsersAsync(
                [Parent] Classroom classroom,
                [ScopedService] ApplicationDbContext dbContext,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) {
                var userIds = await dbContext.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.Users)
                    .SelectMany(c => c.Users.Select(u => u.UserId))
                    .ToArrayAsync(cancellationToken);

                return await userById.LoadAsync(userIds, cancellationToken);
            }

            public async Task<IEnumerable<Discussion>> GetDiscussionsAsync(
                [Parent] Classroom classroom,
                [ScopedService] ApplicationDbContext dbContext,
                DiscussionByIdDataLoader discussionById,
                CancellationToken cancellationToken) {
                var discussionIds = await dbContext.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.Discussions)
                    .SelectMany(c => c.Discussions.Select(d => d.Id))
                    .ToArrayAsync(cancellationToken);

                return await discussionById.LoadAsync(discussionIds, cancellationToken);
            }
        }
    }
}
