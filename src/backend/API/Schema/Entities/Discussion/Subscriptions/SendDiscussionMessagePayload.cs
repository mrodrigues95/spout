using API.Schema.Common;
using Entity = API.Data.Entities;

namespace API.Schema.Entities.Discussion.Subscriptions {
    public class SendDiscussionMessagePayload : Payload {
        public Entity.Message? Message { get; }

        public SendDiscussionMessagePayload(Entity.Message message) {
            Message = message;
        }

        public SendDiscussionMessagePayload(UserError error) : base(new[] { error }) { }
    }
}
