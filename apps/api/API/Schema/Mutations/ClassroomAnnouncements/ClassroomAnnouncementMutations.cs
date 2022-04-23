using System;
using System.Threading;
using System.Threading.Tasks;
using API.Attributes;
using API.Data;
using API.Data.Entities;
using API.Schema.Mutations.ClassroomAnnouncements.Exceptions;
using API.Schema.Mutations.ClassroomAnnouncements.Inputs;
using API.Schema.Mutations.Classrooms.Exceptions;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;

namespace API.Schema.Mutations.ClassroomAnnouncements {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ClassroomAnnouncementMutations {
        [Authorize]
        [Error(typeof(ClassroomNotFoundException))]
        public async Task<ClassroomAnnouncement> CreateClassroomAnnouncementAsync(
            [GlobalUserId] int userId,
            CreateClassroomAnnouncementInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var classroom = await ctx.Classrooms.FindAsync(
                new object[] { input.ClassroomId },
                cancellationToken);
            if (classroom is null) throw new ClassroomNotFoundException();

            var announcement = new ClassroomAnnouncement {
                Content = input.Content,
                CreatedById = userId
            };
            classroom.Announcements.Add(announcement);
            await ctx.SaveChangesAsync(cancellationToken);

            return announcement;
        }

        [Authorize]
        [Error(typeof(ClassroomAnnouncementNotFoundException))]
        public async Task<ClassroomAnnouncement> UpdateClassroomAnnouncementAsync(
            UpdateClassroomAnnouncementInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var announcement = await ctx.ClassroomAnnouncements.FindAsync(
                new object[] { input.ClassroomAnnouncementId },
                cancellationToken);
            if (announcement is null) throw new ClassroomAnnouncementNotFoundException();

            announcement.Content = input.Content;
            announcement.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            return announcement;
        }

        [Authorize]
        [Error(typeof(ClassroomAnnouncementNotFoundException))]
        public async Task<ClassroomAnnouncement> DeleteClassroomAnnouncementAsync(
            DeleteClassroomAnnouncementInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var announcement = await ctx.ClassroomAnnouncements.FindAsync(
                new object[] { input.ClassroomAnnouncementId },
                cancellationToken);
            if (announcement is null) throw new ClassroomAnnouncementNotFoundException();

            ctx.ClassroomAnnouncements.Remove(announcement);
            await ctx.SaveChangesAsync(cancellationToken);

            return announcement;
        }
    }
}
