using Entity = API.Data.Entities;
using HotChocolate;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.Entities.Discussion.Subscriptions {
    [ExtendObjectType(OperationTypeNames.Subscription)]
    public class DiscussionSubscriptions {
        [Subscribe(With = nameof(SubscribeToOnDiscussionMessageReceived))]
        public DiscussionMessageSubscriptionPayload OnDiscussionMessageReceived(
            [ID(nameof(Entity.Discussion))] int discussionId,
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
