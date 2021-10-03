using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Discussions {
    public record SendDiscussionMessageInput([property: ID(nameof(Discussion))] int DiscussionId, string Content);
}
