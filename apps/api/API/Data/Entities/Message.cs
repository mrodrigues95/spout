using System;
using System.ComponentModel.DataAnnotations;
using API.Schema.Types.Discussions;

namespace API.Data.Entities {

    // TODO: Use TPC inheritance once messages are implemented in multiple places
    // besides discussions.
    // See: https://www.dotnettricks.com/learn/entityframework/understanding-inheritance-in-entity-framework.
    public class Message {
        public int Id { get; set; }
        [Required] public string? Content { get; set; }
        [Required] public int DiscussionId { get; set; }
        public Discussion? Discussion { get; set; }
        [Required] public int CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        [Required] public bool IsDiscussionEvent { get; set; }
        public DiscussionEvent? DiscussionEvent { get; set; }
        public int? DelLogId { get; set; }
        public DelLog? DelLog { get; set; }
        [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; }
    }
}
