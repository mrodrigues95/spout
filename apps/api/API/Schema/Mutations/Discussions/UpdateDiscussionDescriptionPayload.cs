using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.Discussions {
    public class UpdateDiscussionDescriptionPayload : Payload {
        public Discussion? Discussion { get; }

        public UpdateDiscussionDescriptionPayload(Discussion discussion) {
            Discussion = discussion;
        }

        public UpdateDiscussionDescriptionPayload(UserError error) : base(new[] { error }) { }
    }
}
