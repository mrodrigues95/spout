using API.Schema.Common;
using API.Data.Entities;

namespace API.Schema.Mutations.Classrooms {
    public class CreateClassroomPayload : Payload {
        public Classroom? Classroom { get; }

        public CreateClassroomPayload(Classroom classroom) {
            Classroom = classroom;
        }

        public CreateClassroomPayload(UserError error) : base(new[] { error }) { }
    }
}
