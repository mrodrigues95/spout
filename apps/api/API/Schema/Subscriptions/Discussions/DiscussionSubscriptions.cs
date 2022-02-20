using System.Threading;
using System.Threading.Tasks;
using API.Data.Entities;
using HotChocolate;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace API.Schema.Subscriptions.Discussions {
    [ExtendObjectType(OperationTypeNames.Subscription)]
    public class DiscussionSubscriptions {
        [Subscribe(With = nameof(SubscribeToOnDiscussionMessageReceived))]
        public DiscussionMessageSubscriptionPayload OnDiscussionMessageReceived(
            [ID(nameof(Discussion))] int discussionId,
            [EventMessage] int messageId) =>
            new DiscussionMessageSubscriptionPayload(discussionId, messageId);

        public async ValueTask<ISourceStream<int>> SubscribeToOnDiscussionMessageReceived(
            int discussionId,
            [Service] ITopicEventReceiver receiver,
            CancellationToken cancellationToken) =>
            await receiver.SubscribeAsync<string, int>(
                "OnDiscussionMessageReceived_" + discussionId, cancellationToken);
    }
}
