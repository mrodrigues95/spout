using System;
using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Sessions.Inputs {
    public record RefreshSessionInput([property: ID(nameof(Session))] Guid SessionId);
}
