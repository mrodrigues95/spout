using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Schema.Queries.ClassroomAnnouncements;
using API.Schema.Queries.ClassroomReminders;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.ClassroomSyllabus;
using API.Schema.Queries.ClassroomTimelineEvents;
using API.Schema.Queries.Discussions;
using API.Schema.Queries.Users;
using API.Schema.Types.ClassroomAnnouncements;
using API.Schema.Types.ClassroomReminders;
using API.Schema.Types.Classrooms;
using API.Schema.Types.ClassroomSyllabus;
using API.Schema.Types.Discussions;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.Types;
using Entities = API.Data.Entities;

namespace API.Schema.Types.ClassroomTimelineEvents {
    // TODO: Should we track delete operations?
    public enum ClassroomTimelineEventItem {
        CLASSROOM_CREATED,
        DISCUSSION_CREATED,
        SYLLABUS_CREATED,
        SYLLABUS_UPDATED,
        ANNOUNCEMENT_CREATED,
        ANNOUNCEMENT_UPDATED,
        REMINDER_CREATED,
        USER_JOINED_CLASSROOM
    }

    public class ClassroomTimelineEventItemType : EnumType<ClassroomTimelineEventItem> { }

    public class ClassroomTimelineEventType : ObjectType<Entities.ClassroomTimelineEvent> {
        protected override void Configure(IObjectTypeDescriptor<Entities.ClassroomTimelineEvent> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(x => x.Id)
                .ResolveNode((ctx, id) =>
                    ctx.DataLoader<ClassroomTimelineEventByIdDataLoader>().LoadAsync(id, ctx.RequestAborted)!);

            descriptor
                .Field(x => x.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(x => x.Event)
                .Type<NonNullType<ClassroomTimelineEventItemType>>();

            descriptor
                 .Field(x => x.CreatedAt)
                 .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(x => x.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(x => x.TriggeredBy)
                .Type<NonNullType<UserType>>()
                .ResolveWith<ClassroomTimelineEventResolvers>(x =>
                    x.GetTriggeredByAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(x => x.Classroom)
                .Type<NonNullType<ClassroomType>>()
                .ResolveWith<ClassroomTimelineEventResolvers>(x =>
                    x.GetClassroomAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(x => x.Discussion)
                .Type<DiscussionType>()
                .ResolveWith<ClassroomTimelineEventResolvers>(x =>
                    x.GetDiscussionAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(x => x.ClassroomSyllabus)
                .Name("syllabus")
                .Type<ClassroomSyllabusType>()
                .ResolveWith<ClassroomTimelineEventResolvers>(x =>
                    x.GetClassroomSyllabusAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(x => x.ClassroomAnnouncement)
                .Name("announcement")
                .Type<ClassroomAnnouncementType>()
                .ResolveWith<ClassroomTimelineEventResolvers>(x =>
                    x.GetClassroomAnnouncementAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(x => x.ClassroomReminder)
                .Name("reminder")
                .Type<ClassroomReminderType>()
                .ResolveWith<ClassroomTimelineEventResolvers>(x =>
                    x.GetClassroomReminderAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(x => x.ClassroomId)
                .Ignore();

            descriptor
                .Field(x => x.TriggeredById)
                .Ignore();

            descriptor
                .Field(x => x.DiscussionId)
                .Ignore();

            descriptor
                .Field(x => x.ClassroomAnnouncementId)
                .Ignore();

            descriptor
                .Field(x => x.ClassroomReminderId)
                .Ignore();

            descriptor
                .Field(x => x.ClassroomSyllabusId)
                .Ignore();
        }

        private class ClassroomTimelineEventResolvers {
            public async Task<Entities.User> GetTriggeredByAsync(
            [Parent] Entities.ClassroomTimelineEvent classroomTimelineEvent,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken)
            => await userById.LoadAsync(
                classroomTimelineEvent.TriggeredById, cancellationToken);

            public async Task<Entities.Classroom> GetClassroomAsync(
            [Parent] Entities.ClassroomTimelineEvent classroomTimelineEvent,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken)
            => await classroomById.LoadAsync(
                classroomTimelineEvent.ClassroomId, cancellationToken);

            public async Task<Entities.Discussion?> GetDiscussionAsync(
            [Parent] Entities.ClassroomTimelineEvent classroomTimelineEvent,
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken)
            => classroomTimelineEvent.DiscussionId.HasValue
                ? await discussionById.LoadAsync(
                    classroomTimelineEvent.DiscussionId.Value, cancellationToken)
                : null;

            public async Task<Entities.ClassroomSyllabus?> GetClassroomSyllabusAsync(
            [Parent] Entities.ClassroomTimelineEvent classroomTimelineEvent,
            ClassroomSyllabusByIdDataLoader syllabusById,
            CancellationToken cancellationToken)
            => classroomTimelineEvent.ClassroomSyllabusId.HasValue
                ? await syllabusById.LoadAsync(
                    classroomTimelineEvent.ClassroomSyllabusId.Value, cancellationToken)
                : null;

            public async Task<Entities.ClassroomAnnouncement?> GetClassroomAnnouncementAsync(
            [Parent] Entities.ClassroomTimelineEvent classroomTimelineEvent,
            ClassroomAnnouncementByIdDataLoader announcementById,
            CancellationToken cancellationToken)
            => classroomTimelineEvent.ClassroomAnnouncementId.HasValue
                ? await announcementById.LoadAsync(
                    classroomTimelineEvent.ClassroomAnnouncementId.Value, cancellationToken)
                : null;

            public async Task<Entities.ClassroomReminder?> GetClassroomReminderAsync(
            [Parent] Entities.ClassroomTimelineEvent classroomTimelineEvent,
            ClassroomReminderByIdDataLoader reminderById,
            CancellationToken cancellationToken)
            => classroomTimelineEvent.ClassroomReminderId.HasValue
                ? await reminderById.LoadAsync(
                    classroomTimelineEvent.ClassroomReminderId.Value, cancellationToken)
                : null;
        }
    }
}
