using Entity = API.Data.Entities;
using HotChocolate.Types;
using HotChocolate.Resolvers;
using System.Threading.Tasks;
using API.Schema.Entities.User;
using System.Threading;

namespace API.Schema.Entities.Message {
    public class MessageType : ObjectType<Entity.Message> {
        protected override void Configure(IObjectTypeDescriptor<Entity.Message> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(m => m.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<MessageByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(m => m.CreatedBy)
                .Type<NonNullType<UserType>>()
                .ResolveWith<MessageResolvers>(x => x.GetCreatedByAsync(default!, default!, default!))
                .Name("createdBy");
        }

        private class MessageResolvers {
            public async Task<Entity.User> GetCreatedByAsync(
            Entity.Message message,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken) =>
            await userById.LoadAsync(message.CreatedById, cancellationToken);
        }
    }
}
