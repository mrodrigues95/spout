using System;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Message {
        public int Id { get; set; }
        [Required] public string? Content { get; set; }
        [Required] public int DiscussionId { get; set; }
         public Discussion? Discussion { get; set; }
        [Required] public int CreatedById { get; set; }
         public User? CreatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? DelLogId { get; set; }
        public DelLog? DelLog { get; set; }
        [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
