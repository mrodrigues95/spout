using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class UnverifiedUserException : Exception {
        public UnverifiedUserException()
            : base("This users email and phone number is unverified. " +
                  "They must have at least one verified before enabling two-factor " +
                  "authentication.") { }
    }
}
