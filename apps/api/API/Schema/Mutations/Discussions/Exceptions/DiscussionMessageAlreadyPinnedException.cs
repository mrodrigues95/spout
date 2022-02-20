using System;

namespace API.Schema.Mutations.Discussions.Exceptions {
    public class DiscussionMessageAlreadyPinnedException : Exception {
        public DiscussionMessageAlreadyPinnedException() : base("Discussion message is already pinned.") { }
    }
}
