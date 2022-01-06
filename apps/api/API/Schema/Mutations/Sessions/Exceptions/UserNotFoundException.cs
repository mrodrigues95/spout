using System;

namespace API.Schema.Mutations.Sessions.Exceptions {
    public class UserNotFoundException : Exception {
        public UserNotFoundException() : base("User not found.") { }
    }
}
