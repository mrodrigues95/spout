using API.Data.Entities;

namespace API.Schema.Services.Auth {
    public class AuthPayload {
        public User? User { get; }
        public bool IsSignedIn { get; }

        public AuthPayload(User? user, bool isSignedIn) {
            User = user;
            IsSignedIn = isSignedIn;
        }
    }
}
