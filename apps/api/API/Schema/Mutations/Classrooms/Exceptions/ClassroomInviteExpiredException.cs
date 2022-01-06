using System;

namespace API.Schema.Mutations.Classrooms.Exceptions {
    public class ClassroomInviteExpiredException : Exception {
        public ClassroomInviteExpiredException() : base("This invite has expired.") { }
    }
}
