using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class SignUpNewUserException : Exception {
        public SignUpNewUserException() : base("There was a problem registering your account.") { }
    }
}
