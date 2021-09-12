﻿using API.Data.Entities;
using HotChocolate.Types.Relay;
using System;

namespace API.Schema.Mutations.Sessions {
    public record RefreshSessionInput([ID(nameof(Session))] Guid SessionId);
}