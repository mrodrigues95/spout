using System;

namespace API.Schema.Mutations.Classrooms.Exceptions {
    public class UserAlreadyInClassroomException : Exception {
        public UserAlreadyInClassroomException(string classroomName)
            : base($"This user is already in {classroomName}.") { }
    }
}
