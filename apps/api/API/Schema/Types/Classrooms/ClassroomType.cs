using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Users;
using API.Schema.Types.ClassroomAnnouncements;
using API.Schema.Types.ClassroomSyllabus;
using API.Schema.Types.Discussions;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Data.Sorting.Expressions;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using HotChocolate.Types.Pagination;
using HotChocolate.Types.Pagination.Extensions;
using Microsoft.EntityFrameworkCore;
using Entities = API.Data.Entities;

namespace API.Schema.Types.Classrooms {
    public class ClassroomType : ObjectType<Entities.Classroom> {
        protected override void Configure(IObjectTypeDescriptor<Entities.Classroom> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(c => c.Id)
                .ResolveNode((ctx, id) =>
                    ctx.DataLoader<ClassroomByIdDataLoader>().LoadAsync(id, ctx.RequestAborted)!);

            descriptor
                .Field(c => c.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(c => c.Name)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(c => c.StateId)
                .Ignore();

            descriptor
                .Field(c => c.SyllabusId)
                .Ignore();

            descriptor
                 .Field(c => c.CreatedAt)
                 .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(c => c.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field("createdBy")
                .Type<NonNullType<UserType>>()
                .ResolveWith<ClassroomResolvers>(x =>
                    x.GetCreatedByAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field("syllabus")
                .Type<ClassroomSyllabusType>()
                .ResolveWith<ClassroomResolvers>(x =>
                    x.GetClassroomSyllabusAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field("announcements")
                .Type<NonNullType<ListType<NonNullType<ClassroomAnnouncementType>>>>()
                .ResolveWith<ClassroomResolvers>(x =>
                    x.GetClassroomAnnouncementsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .UsePaging<NonNullType<ClassroomAnnouncementType>>()
                .UseFiltering()
                .UseSorting();

            descriptor
                .Field(c => c.Users)
                .Type<NonNullType<ListType<NonNullType<UserType>>>>()
                .ResolveWith<ClassroomResolvers>(x =>
                    x.GetUsersAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .UsePaging<NonNullType<UserType>>()
                .UseFiltering()
                .UseSorting()
                .Name("users");

            descriptor
                .Field(c => c.Discussions)
                .Type<NonNullType<ListType<NonNullType<DiscussionType>>>>()
                .ResolveWith<ClassroomResolvers>(x =>
                    x.GetDiscussionsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .UsePaging<NonNullType<DiscussionType>>()
                .UseFiltering()
                .UseSorting()
                .Name("discussions");
        }

        private class ClassroomResolvers {
            public async Task<Entities.User> GetCreatedByAsync(
                [Parent] Entities.Classroom classroom,
                ApplicationDbContext ctx,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) {
                var id = await ctx.ClassroomUsers
                    .Where(cu => cu.ClassroomId == classroom.Id &&
                        cu.IsCreator == true)
                    .Select(cu => cu.UserId)
                    .SingleOrDefaultAsync();

                return await userById.LoadAsync(id, cancellationToken);
            }

            public async Task<Entities.ClassroomSyllabus?> GetClassroomSyllabusAsync(
                [Parent] Entities.Classroom classroom,
                ApplicationDbContext ctx,
                CancellationToken cancellationToken)
                => await ctx.ClassroomSyllabus
                    .Where(cs => cs.ClassroomId == classroom.Id)
                    .SingleOrDefaultAsync(cancellationToken);

            public async Task<Connection<Entities.User?>> GetUsersAsync(
                [Parent] Entities.Classroom classroom,
                ApplicationDbContext dbCtx,
                IResolverContext resolverCtx,
                CancellationToken cancellationToken) {
                var query = dbCtx.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.Users)
                    .SelectMany(c => c.Users.Select(u => u.User))
                    .AsQueryable();

                var connection = await query
                    .Filter(resolverCtx)
                    .Sort(resolverCtx)
                    .ApplyCursorPaginationAsync(resolverCtx, cancellationToken: cancellationToken);

                return connection;
            }

            public async Task<Connection<Entities.ClassroomAnnouncement>> GetClassroomAnnouncementsAsync(
                [Parent] Entities.Classroom classroom,
                ApplicationDbContext dbCtx,
                IResolverContext resolverCtx,
                CancellationToken cancellationToken) {
                var query = dbCtx.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.Announcements)
                    .SelectMany(c => c.Announcements)
                    .AsQueryable();

                var connection = await query
                    .Filter(resolverCtx)
                    .Sort(resolverCtx)
                    .ApplyCursorPaginationAsync(resolverCtx, cancellationToken: cancellationToken);

                return connection;
            }

            public async Task<Connection<Entities.Discussion>> GetDiscussionsAsync(
                [Parent] Entities.Classroom classroom,
                ApplicationDbContext dbCtx,
                IResolverContext resolverCtx,
                CancellationToken cancellationToken) {
                var query = dbCtx.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.Discussions)
                    .SelectMany(c => c.Discussions)
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
