using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.FileUploads {
    public class UpdateAvatarPayload : Payload {
        public User? User { get; }

        public UpdateAvatarPayload(User user) {
            User = user;
        }

        public UpdateAvatarPayload(UserError error) : base(new[] { error }) { }
    }
}
