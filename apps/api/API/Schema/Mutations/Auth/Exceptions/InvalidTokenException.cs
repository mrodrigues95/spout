using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class InvalidTokenException : Exception {
        public InvalidTokenException(string token) : base($"{token} is no longer valid.") { }
    }
}
