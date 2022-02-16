using System;

namespace API.Schema.Mutations.Discussions.Exceptions {
    public class DiscussionMessageNotFoundException : Exception {
        public DiscussionMessageNotFoundException() : base("Discussion message not found.") { }
    }
}
