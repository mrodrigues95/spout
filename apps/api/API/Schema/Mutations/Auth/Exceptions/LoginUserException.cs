using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class LoginUserException : Exception {
        public LoginUserException() : base("Invalid email or password.") { }
    }
}
