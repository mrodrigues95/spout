using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Schema.Queries.ClassroomReminders;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Users;
using API.Schema.Types.Classrooms;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.Types;

namespace API.Schema.Types.ClassroomReminders {
    public enum ClassroomReminderImportance {
        LOW,
        MEDIUM,
        HIGH
    }

    public class ClassroomReminderImportanceType : EnumType<ClassroomReminderImportance> { }

    public class ClassroomReminderType : ObjectType<ClassroomReminder> {
        protected override void Configure(IObjectTypeDescriptor<ClassroomReminder> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(cr => cr.Id)
                .ResolveNode((ctx, id)
                    => ctx.DataLoader<ClassroomReminderByIdDataLoader>().LoadAsync(
                    id, ctx.RequestAborted)!);

            descriptor
                .Field(cr => cr.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(cr => cr.Title)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(cr => cr.Description)
                .Type<StringType>();

            descriptor
                .Field(cr => cr.IsDeleted)
                .Type<NonNullType<BooleanType>>();

            descriptor
                 .Field(cr => cr.DueAt)
                 .Type<NonNullType<DateTimeType>>();

            descriptor
                 .Field(cr => cr.CreatedAt)
                 .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(cr => cr.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(cr => cr.DeletedAt)
                .Type<DateTimeType>();

            descriptor
                .Field(cr => cr.CreatedBy)
                .Type<NonNullType<UserType>>()
                .ResolveWith<ClassroomReminderResolvers>(cr =>
                    cr.GetCreatedByAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(cr => cr.Classroom)
                .Type<NonNullType<ClassroomType>>()
                .ResolveWith<ClassroomReminderResolvers>(cr =>
                    cr.GetClassroomAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(cr => cr.ClassroomId)
                .Ignore();

            descriptor
                .Field(cr => cr.CreatedById)
                .Ignore();
        }

        private class ClassroomReminderResolvers {
            public async Task<User> GetCreatedByAsync(
            [Parent] ClassroomAnnouncement classroomAnnouncement,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken)
            => await userById.LoadAsync(classroomAnnouncement.CreatedById, cancellationToken);

            public async Task<Classroom> GetClassroomAsync(
            [Parent] ClassroomAnnouncement classroomAnnouncement,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken)
            => await classroomById.LoadAsync(classroomAnnouncement.ClassroomId, cancellationToken);
        }
    }
}
