using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Subscriptions.Discussions {
    public record SendDiscussionMessageInput([ID(nameof(Discussion))] int DiscussionId, string Content);
}
