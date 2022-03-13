using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class EmailNotVerifiedException : Exception {
        public EmailNotVerifiedException(string email) : base($"{email} is not verified.") { }
    }
}
