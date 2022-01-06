using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class LoginUserException : Exception {
        public LoginUserException() : base("There was a problem signing in to your account.") { }
    }
}
