using System.Threading;
using System.Threading.Tasks;
using API.Attributes;
using API.Data;
using API.Data.Entities;
using API.Infrastructure;
using API.Schema.Mutations.ClassroomReminders.Inputs;
using API.Schema.Mutations.Classrooms.Exceptions;
using API.Schema.Types.ClassroomTimelineEvents;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;

namespace API.Schema.Mutations.ClassroomReminders {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ClassroomReminderMutations {
        [Authorize]
        [Error(typeof(ClassroomNotFoundException))]
        public async Task<ClassroomReminder> CreateClassroomReminderAsync(
        [GlobalUserId] int userId,
        IClassroomTimelineManager timelineManager,
        CreateClassroomReminderInput input,
        ApplicationDbContext ctx,
        CancellationToken cancellationToken) {
            var classroom = await ctx.Classrooms.FindAsync(
                new object[] { input.ClassroomId },
                cancellationToken);
            if (classroom is null) throw new ClassroomNotFoundException();

            var reminder = new ClassroomReminder {
                Title = input.Title,
                Description = input.Description,
                DueAt = input.DueAt,
                Importance = input.Importance,
                CreatedById = userId
            };
            classroom.Reminders.Add(reminder);
            await ctx.SaveChangesAsync(cancellationToken);

            await timelineManager.CreateTimelineEvent(
                classroom,
                new ClassroomTimelineEvent {
                    TriggeredById = userId,
                    ClassroomId = classroom.Id,
                    Event = ClassroomTimelineEventItem.REMINDER_CREATED,
                    ClassroomReminderId = reminder.Id,
                });

            return reminder;
        }
    }
}
