using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class EmailAlreadyVerifiedException : Exception {
        public EmailAlreadyVerifiedException(string email)
            : base($"{email} is already verified.") { }
    }
}
