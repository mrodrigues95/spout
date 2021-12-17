using API.Schema.Common;
using API.Data.Entities;

namespace API.Schema.Mutations.Discussions {
    public class SendDiscussionMessagePayload : Payload {
        public Message? Message { get; }

        public SendDiscussionMessagePayload(Message message) {
            Message = message;
        }

        public SendDiscussionMessagePayload(UserError error) : base(new[] { error }) { }
    }
}
