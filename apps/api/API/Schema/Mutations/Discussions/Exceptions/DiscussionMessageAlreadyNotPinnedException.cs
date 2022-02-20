using System;

namespace API.Schema.Mutations.Discussions.Exceptions {
    public class DiscussionMessageAlreadyNotPinnedException : Exception {
        public DiscussionMessageAlreadyNotPinnedException() :
            base("Discussion message is already not pinned.") { }
    }
}
