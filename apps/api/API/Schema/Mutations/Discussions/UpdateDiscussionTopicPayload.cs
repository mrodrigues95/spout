using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.Discussions {
    public class UpdateDiscussionTopicPayload : Payload {
        public Discussion? Discussion { get; }

        public UpdateDiscussionTopicPayload(Discussion discussion) {
            Discussion = discussion;
        }

        public UpdateDiscussionTopicPayload(UserError error) : base(new[] { error }) { }
    }
}
