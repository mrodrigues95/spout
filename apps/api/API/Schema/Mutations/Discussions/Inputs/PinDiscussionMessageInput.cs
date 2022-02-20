using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Discussions.Inputs {
    public record PinDiscussionMessageInput(
        [property: ID(nameof(Message))] int MessageId);
}
