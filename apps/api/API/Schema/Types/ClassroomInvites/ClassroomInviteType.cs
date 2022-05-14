using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Schema.Queries.ClassroomInvites;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Users;
using API.Schema.Types.Classrooms;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.Types;

namespace API.Schema.Types.ClassroomInvites {
    public class ClassroomInviteType : ObjectType<ClassroomInvite> {
        protected override void Configure(IObjectTypeDescriptor<ClassroomInvite> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(ci => ci.Id)
                .ResolveNode((ctx, id)
                    => ctx.DataLoader<ClassroomInviteByIdDataLoader>().LoadAsync(
                    id, ctx.RequestAborted)!);

            descriptor
                .Field(ci => ci.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(ci => ci.Code)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(ci => ci.TotalUses)
                .Type<NonNullType<ShortType>>();

            descriptor
                .Field(ci => ci.MaxUses)
                .Type<ShortType>();

            descriptor
                .Field(ci => ci.MaxAge)
                .Type<IntType>();

            descriptor
                 .Field(ci => ci.ExpiresAt)
                 .Type<DateTimeType>();

            descriptor
                 .Field(ci => ci.CreatedAt)
                 .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(ci => ci.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(ca => ca.CreatedBy)
                .Type<NonNullType<UserType>>()
                .ResolveWith<ClassroomInviteResolvers>(ca =>
                    ca.GetCreatedByAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(ca => ca.Classroom)
                .Type<NonNullType<ClassroomType>>()
                .ResolveWith<ClassroomInviteResolvers>(ca =>
                    ca.GetClassroomAsync(default!, default!, default!))
                .UseDbContext<ApplicationDbContext>();

            descriptor
                .Field(ci => ci.ClassroomId)
                .Ignore();

            descriptor
                .Field(ci => ci.CreatedById)
                .Ignore();

            descriptor
                .Field(ci => ci.Logs)
                .Ignore();
        }

        private class ClassroomInviteResolvers {
            public async Task<User> GetCreatedByAsync(
            [Parent] ClassroomInvite classroomInvite,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken)
            => await userById.LoadAsync(classroomInvite.CreatedById, cancellationToken);

            public async Task<Classroom> GetClassroomAsync(
            [Parent] ClassroomInvite classroomInvite,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken)
            => await classroomById.LoadAsync(classroomInvite.ClassroomId, cancellationToken);
        }
    }
}
