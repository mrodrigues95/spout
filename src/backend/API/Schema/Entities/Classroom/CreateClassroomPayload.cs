using API.Schema.Common;
using Entity = API.Data.Entities;

namespace API.Schema.Entities.Classroom {
    public class CreateClassroomPayload : Payload {
        public Entity.Classroom? Classroom { get; }

        public CreateClassroomPayload(Entity.Classroom classroom) {
            Classroom = classroom;
        }

        public CreateClassroomPayload(UserError error) : base(new[] { error }) { }
    }
}
