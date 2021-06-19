using HotChocolate.Types.Relay;
using System;

namespace API.Schema.Entities.Session {
    public record RefreshSessionInput([ID(nameof(Session))] Guid SessionId);
}
