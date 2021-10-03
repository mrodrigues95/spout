using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.Discussions {
    public class CreateDiscussionPayload : Payload {
        public Discussion? Discussion { get; }

        public CreateDiscussionPayload(Discussion discussion) {
            Discussion = discussion;
        }

        public CreateDiscussionPayload(UserError error) : base(new[] { error }) { }
    }
}
