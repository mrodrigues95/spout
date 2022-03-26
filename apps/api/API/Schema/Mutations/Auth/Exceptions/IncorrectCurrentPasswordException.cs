using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class IncorrectCurrentPasswordException : Exception {
        public IncorrectCurrentPasswordException() : base("Incorrect current password.") { }
    }
}
