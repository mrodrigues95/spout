using API.Data.Entities;

namespace API.Schema.Mutations.Auth.Payloads {
    public class AuthPayload {
        public User? User { get; }
        public Session? Session { get; }
        public bool IsLoggedIn { get; }
        public bool RequiresTwoFactorLogin { get; } = false;

        public AuthPayload(User user, Session session, bool isLoggedIn) {
            User = user;
            Session = session;
            IsLoggedIn = isLoggedIn;
        }

        public AuthPayload(User user, bool isLoggedIn, bool requiresTwoFactorLogin) {
            User = user;
            IsLoggedIn = isLoggedIn;
            RequiresTwoFactorLogin = requiresTwoFactorLogin;
        }

        public AuthPayload(User user, bool isLoggedIn) {
            User = user;
            IsLoggedIn = isLoggedIn;
        }

        public AuthPayload(bool isLoggedIn) {
            IsLoggedIn = isLoggedIn;
        }
    }
}
