using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Users;
using API.Schema.Types.ClassroomAnnouncements;
using API.Schema.Types.ClassroomReminders;
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
                    x.GetSyllabusAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field("announcements")
                .Type<NonNullType<ListType<NonNullType<ClassroomAnnouncementType>>>>()
                .ResolveWith<ClassroomResolvers>(x =>
                    x.GetAnnouncementsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .UsePaging<NonNullType<ClassroomAnnouncementType>>()
                .UseFiltering()
                .UseSorting();

            descriptor
                .Field("reminders")
                .Type<NonNullType<ListType<NonNullType<ClassroomReminderType>>>>()
                .ResolveWith<ClassroomResolvers>(x =>
                    x.GetRemindersAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .UsePaging<NonNullType<ClassroomReminderType>>()
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

            public async Task<Entities.ClassroomSyllabus?> GetSyllabusAsync(
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

            public async Task<Connection<Entities.ClassroomAnnouncement>> GetAnnouncementsAsync(
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

            public async Task<Connection<Entities.ClassroomReminder>> GetRemindersAsync(
                [Parent] Entities.Classroom classroom,
                ApplicationDbContext dbCtx,
                IResolverContext resolverCtx,
                CancellationToken cancellationToken) {
                // TODO: This should be grouped once Hot Chocolate implements data aggregation.
                // Right now, we are grouping on the front-end instead.
                // See: https://github.com/ChilliCream/hotchocolate/discussions/2963.
                var query = dbCtx.Classrooms
                    .Where(c => c.Id == classroom.Id)
                    .Include(c => c.Reminders)
                    .SelectMany(c => c.Reminders)
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
