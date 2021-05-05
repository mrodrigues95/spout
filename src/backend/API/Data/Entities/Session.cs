using System;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Session {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime ExpiresAt { get; set; } = DateTime.UtcNow;
        [Required]
        public DateTime? UpdatedAt { get; set; }
        [Required]
        public User? User { get; set; }
        [Required]
        public int? UserId { get; set; }
    }
}
