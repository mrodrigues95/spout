using Entity = API.Data.Entities;

namespace API.Schema.Entities.Classroom {
    public class CreateClassroomPayload {
        public Entity.Classroom Classroom { get; }

        public CreateClassroomPayload(Entity.Classroom classroom) {
            Classroom = classroom;
        }
    }
}
