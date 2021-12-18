using API.Data.Entities;
using HotChocolate.Types.Relay;
using System.Threading.Tasks;
using System.Threading;
using API.Schema.Queries.Discussions;
using API.Schema.Queries.Messages;

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
