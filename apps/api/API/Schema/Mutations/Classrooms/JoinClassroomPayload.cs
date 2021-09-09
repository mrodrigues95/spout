using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.Classrooms {
    public class JoinClassroomPayload : Payload {
        public Classroom? Classroom { get; }

        public JoinClassroomPayload(Classroom classroom) {
            Classroom = classroom;
        }

        public JoinClassroomPayload(UserError error) : base(new[] { error }) { }

        public JoinClassroomPayload(Classroom classroom, UserError error) : base(new[] { error }) {
            Classroom = classroom;
        }
    }
}
