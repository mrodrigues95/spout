using API.Data.Entities;
using HotChocolate.Types.Relay;
using System;

namespace API.Schema.Mutations.Auth {
    public record LogoutInput([property: ID(nameof(Session))] Guid SessionId);
}
