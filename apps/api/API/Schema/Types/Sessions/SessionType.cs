using System.Threading;
using System.Threading.Tasks;
using API.Data.Entities;
using API.Schema.Queries.Sessions;
using API.Schema.Queries.Users;
using HotChocolate;
using HotChocolate.Data.Filters;
using HotChocolate.Types;

namespace API.Schema.Types.Sessions {
    public class SessionFilterType : FilterInputType<Session> {
        protected override void Configure(
            IFilterInputTypeDescriptor<Session> descriptor) {
            descriptor.BindFieldsImplicitly();
            descriptor.Field(s => s.Id).Type<IdOperationFilterInputType>();
        }
    }

    public class SessionType : ObjectType<Session> {
        protected override void Configure(IObjectTypeDescriptor<Session> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(s => s.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<SessionByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(s => s.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(s => s.UserId)
                .Type<NonNullType<IntType>>()
                .Ignore();

            descriptor
                .Field(s => s.User)
                .ResolveWith<SessionResolvers>(x => x.GetUserAsync(default!, default!, default!))
                .Name("user");

            descriptor
                .Field(s => s.CreatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(s => s.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(s => s.ExpiresAt)
                .Type<NonNullType<DateTimeType>>();
        }

        private class SessionResolvers {
            public async Task<User?> GetUserAsync(
                [Parent] Session session,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) =>
                await userById.LoadAsync(session.UserId, cancellationToken);
        }
    }
}
