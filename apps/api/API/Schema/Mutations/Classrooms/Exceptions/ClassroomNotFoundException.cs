using System;

namespace API.Schema.Mutations.Classrooms.Exceptions {
    public class ClassroomNotFoundException : Exception {
        public ClassroomNotFoundException() : base("Classroom not found.") { }
    }
}
