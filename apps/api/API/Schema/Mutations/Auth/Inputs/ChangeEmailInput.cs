using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Auth.Inputs {
    public record ChangeEmailInput(
        [property: ID(nameof(Session))] int SessionId, string Token);
}
