using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class SessionNotFoundException : Exception {
        public SessionNotFoundException() : base("Session not found.") { }
    }
}
