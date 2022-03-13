using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class EmailAlreadyRegisteredException : Exception {
        public EmailAlreadyRegisteredException(string email)
            : base($"{email} is already registered.") { }
    }
}
