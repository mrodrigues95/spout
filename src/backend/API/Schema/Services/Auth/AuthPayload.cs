using API.Data.Entities;

namespace API.Schema.Services.Auth {
    public class AuthPayload {
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
    }
}
