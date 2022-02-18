using System;
using System.Collections.Generic;
using API.Schema.Types.Discussions;

namespace API.Data.Entities {

    // TODO: Use TPC inheritance once messages are implemented in multiple places
    // besides discussions.
    // See: https://www.dotnettricks.com/learn/entityframework/understanding-inheritance-in-entity-framework.
    public class Message {
        public int Id { get; set; }
        public string? Content { get; set; }
        public int DiscussionId { get; set; }
        public Discussion? Discussion { get; set; }
        public int CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public int? PinnedById { get; set; }
        public User? PinnedBy { get; set; }
        public bool IsDiscussionEvent { get; set; }
        public DiscussionEvent? DiscussionEvent { get; set; }
        public int? DelLogId { get; set; }
        public DelLog? DelLog { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; }

        public ICollection<MessageFile> MessageFiles { get; set; } = new List<MessageFile>();
    }
}
