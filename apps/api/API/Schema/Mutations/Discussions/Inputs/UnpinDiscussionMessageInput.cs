using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Discussions.Inputs {
    public record UnpinDiscussionMessageInput(
        [property: ID(nameof(Message))] int MessageId);
}
