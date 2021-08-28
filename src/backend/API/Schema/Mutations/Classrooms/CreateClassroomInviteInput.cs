﻿using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Classrooms {
    public record CreateClassroomInviteInput(
        [ID(nameof(Classroom))] int ClassroomId,
        string? Code,
        int? MaxAge,
        short? MaxUses);
}
