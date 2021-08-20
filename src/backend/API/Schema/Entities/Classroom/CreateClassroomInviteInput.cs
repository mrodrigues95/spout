using Entity = API.Data.Entities;
using System;
using HotChocolate.Types.Relay;

namespace API.Schema.Entities.Classroom {
    public record CreateClassroomInviteInput(
        [ID(nameof(Entity.Classroom))] int ClassroomId,
        DateTime? ExpiresAt,
        string? Code,
        short? MaxUses);
}
