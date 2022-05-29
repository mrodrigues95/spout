using System;
using System.Collections.Generic;
using API.Schema.Types.Messages;

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
        public int? ParentMessageId { get; set; }
        public Message? ParentMessage { get; set; }
        public bool IsEvent { get; set; }
        public MessageEvent? MessageEvent { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? PinnedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public ICollection<MessageFile> MessageFiles { get; set; } = new List<MessageFile>();
        public ICollection<Message> MessageLinks { get; set; } = new List<Message>();
    }
}
