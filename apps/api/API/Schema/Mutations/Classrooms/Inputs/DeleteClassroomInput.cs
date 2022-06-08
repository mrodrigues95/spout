using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Classrooms.Inputs {
    public record DeleteClassroomInput([property: ID(nameof(Classroom))] int ClassroomId);
}
