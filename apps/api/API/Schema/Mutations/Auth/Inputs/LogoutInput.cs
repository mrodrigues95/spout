using System;
using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Auth.Inputs {
    public record LogoutInput([property: ID(nameof(Session))] Guid SessionId);
}
