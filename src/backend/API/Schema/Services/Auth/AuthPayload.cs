using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Services.Auth {
    public class AuthPayload : Payload {
        public User? User { get; }
        public Session? Session { get; }
        public bool IsLoggedIn { get; }

        public AuthPayload(User user, Session session, bool isLoggedIn) {
            User = user;
            Session = session;
            IsLoggedIn = isLoggedIn;
        }

        public AuthPayload(bool isLoggedIn) {
            IsLoggedIn = isLoggedIn;
        }

        public AuthPayload(UserError error) : base(new[] { error }) { }
    }
}
