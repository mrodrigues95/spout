using System;

namespace API.Schema.Mutations.Discussions.Exceptions {
    public class ClassroomNotFoundException : Exception {
        public ClassroomNotFoundException() : base("Classroom not found.") { }
    }
}
