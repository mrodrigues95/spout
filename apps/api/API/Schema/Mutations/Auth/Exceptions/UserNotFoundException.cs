using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class UserNotFoundException : Exception {
        public UserNotFoundException() : base("User not found.") { }
    }
}
