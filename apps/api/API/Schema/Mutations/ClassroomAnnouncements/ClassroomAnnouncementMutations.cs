using System;
using System.Threading;
using System.Threading.Tasks;
using API.Attributes;
using API.Data;
using API.Data.Entities;
using API.Infrastructure;
using API.Schema.Mutations.ClassroomAnnouncements.Exceptions;
using API.Schema.Mutations.ClassroomAnnouncements.Inputs;
using API.Schema.Mutations.Classrooms.Exceptions;
using API.Schema.Types.ClassroomTimelineEvents;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace API.Schema.Mutations.ClassroomAnnouncements {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ClassroomAnnouncementMutations {
        [Authorize]
        [Error(typeof(ClassroomNotFoundException))]
        public async Task<ClassroomAnnouncement> CreateClassroomAnnouncementAsync(
            [GlobalUserId] int userId,
            IClassroomTimelineManager timelineManager,
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

            await timelineManager.CreateTimelineEvent(
                classroom,
                new ClassroomTimelineEvent {
                    TriggeredById = userId,
                    ClassroomId = classroom.Id,
                    Event = ClassroomTimelineEventItem.ANNOUNCEMENT_CREATED,
                    ClassroomAnnouncementId = announcement.Id,
                });

            return announcement;
        }

        [Authorize]
        [Error(typeof(ClassroomAnnouncementNotFoundException))]
        public async Task<ClassroomAnnouncement> UpdateClassroomAnnouncementAsync(
            [GlobalUserId] int userId,
            IClassroomTimelineManager timelineManager,
            UpdateClassroomAnnouncementInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var announcement = await ctx.ClassroomAnnouncements
                .Include(ca => ca.Classroom)
                .SingleOrDefaultAsync(ca => ca.Id == input.ClassroomAnnouncementId,
                    cancellationToken);
            if (announcement is null) throw new ClassroomAnnouncementNotFoundException();

            announcement.Content = input.Content;
            announcement.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            await timelineManager.CreateTimelineEvent(
                announcement.Classroom!,
                new ClassroomTimelineEvent {
                    TriggeredById = userId,
                    ClassroomId = announcement.Classroom!.Id,
                    Event = ClassroomTimelineEventItem.ANNOUNCEMENT_UPDATED,
                    ClassroomAnnouncementId = announcement.Id,
                });

            return announcement;
        }

        [Authorize]
        [Error(typeof(ClassroomAnnouncementNotFoundException))]
        public async Task<ClassroomAnnouncement> DeleteClassroomAnnouncementAsync(
            DeleteClassroomAnnouncementInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var announcement = await ctx.ClassroomAnnouncements
                .Include(ca => ca.Classroom)
                .SingleOrDefaultAsync(ca => ca.Id == input.ClassroomAnnouncementId,
                    cancellationToken);
            if (announcement is null) throw new ClassroomAnnouncementNotFoundException();

            announcement.IsDeleted = true;
            announcement.UpdatedAt = DateTime.UtcNow;
            announcement.DeletedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            return announcement;
        }
    }
}
