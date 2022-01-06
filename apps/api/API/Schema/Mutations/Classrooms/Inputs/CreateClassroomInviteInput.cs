using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Classrooms.Inputs {
    public record CreateClassroomInviteInput(
        [property: ID(nameof(Classroom))] int ClassroomId,
        string? Code,
        int? MaxAge,
        short? MaxUses);
}
