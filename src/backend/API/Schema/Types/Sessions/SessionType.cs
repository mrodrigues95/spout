using API.Data.Entities;
using HotChocolate.Types;
using HotChocolate.Resolvers;
using System.Threading.Tasks;
using System.Threading;
using API.Schema.Queries.Users;
using API.Schema.Queries.Sessions;

namespace API.Schema.Types.Sessions {
    public class SessionType : ObjectType<Session> {
        protected override void Configure(IObjectTypeDescriptor<Session> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(x => x.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<SessionByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(x => x.User)
                .ResolveWith<SessionResolvers>(x => x.GetUserAsync(default!, default!, default!))
                .Name("user");
        }

        private class SessionResolvers {
            public async Task<User?> GetUserAsync(
                Session session,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) =>
                await userById.LoadAsync(session.UserId, cancellationToken);
        }
    }
}
