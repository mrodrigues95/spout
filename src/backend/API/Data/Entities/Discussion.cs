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
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public int ClassroomId { get; set; }
        [Required]
        public Classroom? Classroom { get; set; }
        [Required]
        public int CreatedById { get; set; }
        [Required]
        public User? CreatedBy { get; set; }

        public ICollection<UserDiscussion> UserDiscussions { get; set; } = new List<UserDiscussion>();
        public ICollection<Message> Messages = new List<Message>();
    }
}
