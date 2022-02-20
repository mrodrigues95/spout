using System.Threading;
using System.Threading.Tasks;
using API.Data.Entities;
using API.Schema.Queries.Discussions;
using API.Schema.Queries.Messages;
using HotChocolate.Types.Relay;

namespace API.Schema.Subscriptions.Discussions {
    public class DiscussionMessageSubscriptionPayload {
        [ID(nameof(Discussion))]
        public int DiscussionId { get; }

        [ID(nameof(Message))]
        public int MessageId { get; }

        public DiscussionMessageSubscriptionPayload(int discussionId, int messageId) {
            DiscussionId = discussionId;
            MessageId = messageId;
        }

        public Task<Discussion> GetDiscussionAsync(
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken) =>
            discussionById.LoadAsync(DiscussionId, cancellationToken);

        public Task<Message> GetMessageAsync(
            MessageByIdDataLoader messageById,
            CancellationToken cancellationToken) =>
            messageById.LoadAsync(MessageId, cancellationToken);
    }
}
