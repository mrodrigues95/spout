using API.Data.Entities;
using HotChocolate.Types;
using HotChocolate.Resolvers;
using System.Threading.Tasks;
using System.Threading;
using API.Schema.Queries.Messages;
using API.Schema.Queries.Users;
using API.Schema.Types.Users;

namespace API.Schema.Types.Messages {
    public class MessageType : ObjectType<Message> {
        protected override void Configure(IObjectTypeDescriptor<Message> descriptor) {
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
            public async Task<User> GetCreatedByAsync(
            Message message,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken) =>
            await userById.LoadAsync(message.CreatedById, cancellationToken);
        }
    }
}
