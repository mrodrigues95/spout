using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Schema.Queries.ClassroomAnnouncements;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Users;
using API.Schema.Types.Classrooms;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.Types;

namespace API.Schema.Types.ClassroomAnnouncements {
    public class ClassroomAnnouncementType : ObjectType<ClassroomAnnouncement> {
        protected override void Configure(IObjectTypeDescriptor<ClassroomAnnouncement> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(c => c.Id)
                .ResolveNode((ctx, id)
                    => ctx.DataLoader<ClassroomAnnouncementByIdDataLoader>().LoadAsync(
                    id, ctx.RequestAborted)!);

            descriptor
                .Field(ca => ca.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(ca => ca.Content)
                .Type<NonNullType<StringType>>();

            descriptor
                 .Field(ca => ca.CreatedAt)
                 .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(ca => ca.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field("createdBy")
                .Type<NonNullType<UserType>>()
                .ResolveWith<ClassroomAnnouncementResolvers>(ca =>
                    ca.GetCreatedByAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(ca => ca.Classroom)
                .Type<NonNullType<ClassroomType>>()
                .ResolveWith<ClassroomAnnouncementResolvers>(ca =>
                    ca.GetClassroomAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(ca => ca.ClassroomId)
                .Ignore();

            descriptor
                .Field(ca => ca.CreatedById)
                .Ignore();
        }

        private class ClassroomAnnouncementResolvers {
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
