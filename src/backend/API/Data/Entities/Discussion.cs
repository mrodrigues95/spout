using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Discussion {
        public int Id { get; set; }
        [Required]
        public Guid Guid { get; set; } = Guid.NewGuid();
        [Required]
        public string? Name { get; set; }
        [Required]
        public int ClassroomId { get; set; }
        [Required]
        public Classroom? Classroom { get; set; }
        [Required]
        public int CreatedById { get; set; }
        [Required]
        public User? CreatedBy { get; set; }
        [Required]
        public int StateId { get; set; }
        [Required]
        public State? State { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? DelLogId { get; set; }
        public DelLog? DelLog { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<UserDiscussion> UserDiscussions { get; set; } = new List<UserDiscussion>();
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
