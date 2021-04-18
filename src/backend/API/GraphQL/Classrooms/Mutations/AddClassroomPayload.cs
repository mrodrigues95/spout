using API.Common;
using API.Data.Entities;

namespace API.GraphQL.Classrooms {
    public class AddClassroomPayload : Payload {
        public Classroom? Classroom { get; }

        public AddClassroomPayload(Classroom classroom) {
            Classroom = classroom;
        }
        public AddClassroomPayload(UserError error) : base(new[] { error }) { }
    }
}
