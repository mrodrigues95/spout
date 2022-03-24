using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Auth.Inputs {
    public record ChangePhoneNumberInput(
        [property: ID(nameof(Session))] int SessionId,
        string Token);
}
