using Entity = API.Data.Entities;
using HotChocolate.Types;
using HotChocolate.Resolvers;
using System.Threading.Tasks;
using System.Threading;
using API.Schema.Entities.User;

namespace API.Schema.Entities.Session {
    public class SessionType : ObjectType<Entity.Session> {
        protected override void Configure(IObjectTypeDescriptor<Entity.Session> descriptor) {
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
            public async Task<Entity.User?> GetUserAsync(
                Entity.Session session,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) {
                return await userById.LoadAsync(session.UserId, cancellationToken);
            }
        }
    }
}
