using Entity = API.Data.Entities;

namespace API.Schema.Entities.User {
    public class UserPayload {
        public Entity.User? User { get; }

        protected UserPayload(Entity.User user) {
            User = user;
        }
    }
}
