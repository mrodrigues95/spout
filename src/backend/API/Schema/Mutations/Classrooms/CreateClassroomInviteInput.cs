using API.Data.Entities;
using System;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Classrooms {
    public record CreateClassroomInviteInput(
        [ID(nameof(Classroom))] int ClassroomId,
        DateTime? ExpiresAt,
        string? Code,
        short? MaxUses);
}
