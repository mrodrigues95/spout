using System;

namespace API.Schema.Mutations.Discussions.Exceptions {
    public class DiscussionNotFoundException : Exception {
        public DiscussionNotFoundException() : base("Discussion not found.") { }
    }
}
