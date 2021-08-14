using Entity = API.Data.Entities;
using HotChocolate.Types;
using HotChocolate.Resolvers;

namespace API.Schema.Entities.Invite {
    public class InviteType : ObjectType<Entity.Invite> {
        protected override void Configure(IObjectTypeDescriptor<Entity.Invite> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(i => i.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<InviteByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));
        }
    }
}
