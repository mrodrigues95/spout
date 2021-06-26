using Entity = API.Data.Entities;
using HotChocolate.Types.Relay;
using System.Threading.Tasks;
using System.Threading;
using API.Schema.Entities.Message;

namespace API.Schema.Entities.Discussion.Subscriptions {
    public class DiscussionMessageSubscriptionPayload {
        [ID(nameof(Entity.Discussion))]
        public int DiscussionId { get; }

        [ID(nameof(Entity.Message))]
        public int MessageId { get; }

        public DiscussionMessageSubscriptionPayload(int discussionId, int messageId) {
            DiscussionId = discussionId;
            MessageId = messageId;
        }

        public Task<Entity.Discussion> GetDiscussionAsync(
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken) =>
            discussionById.LoadAsync(DiscussionId, cancellationToken);

        public Task<Entity.Message> GetMessageAsync(
            MessageByIdDataLoader messageById,
            CancellationToken cancellationToken) =>
            messageById.LoadAsync(MessageId, cancellationToken);
    }
}
