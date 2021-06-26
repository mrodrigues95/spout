using Entity = API.Data.Entities;
using HotChocolate.Types;
using HotChocolate.Resolvers;

namespace API.Schema.Entities.Message {
    public class MessageType : ObjectType<Entity.Message> {
        protected override void Configure(IObjectTypeDescriptor<Entity.Message> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(d => d.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<MessageByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));
        }
    }
}
