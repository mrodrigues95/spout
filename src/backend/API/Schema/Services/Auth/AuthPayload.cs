using API.Data.Entities;

namespace API.Schema.Services.Auth {
    public class AuthPayload {
        public User? User { get; }
        public bool IsLoggedIn { get; }

        public AuthPayload(User? user, bool isLoggedIn) {
            User = user;
            IsLoggedIn = isLoggedIn;
        }
    }
}
