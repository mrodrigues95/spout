using Entity = API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Entities.Discussion.Subscriptions {
    public record SendDiscussionMessageInput([ID(nameof(Entity.Discussion))] int DiscussionId, string Content);
}
