using API.Data.Entities;
using API.Schema.Types.Users;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Auth.Inputs {
    public record EnableTwoFactorInput(
        [property: ID(nameof(Session))] int SessionId,
        UserPreferredProvider Provider);
}
