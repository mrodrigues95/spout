using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class SessionExpiredException : Exception {
        public SessionExpiredException() : base("This session has expired.") { }
    }
}
