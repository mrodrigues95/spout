using System;

namespace API.Schema.Mutations.Sessions.Exceptions {
    public class SessionNotFoundException : Exception {
        public SessionNotFoundException() : base("Unable to refresh session.") { }
    }
}
