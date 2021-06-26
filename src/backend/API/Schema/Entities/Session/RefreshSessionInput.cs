using Entity = API.Data.Entities;
using HotChocolate.Types.Relay;
using System;

namespace API.Schema.Entities.Session {
    public record RefreshSessionInput([ID(nameof(Entity.Session))] Guid SessionId);
}
