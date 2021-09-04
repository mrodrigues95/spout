using System;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Session {
        public Guid Id { get; set; }
        [Required] public int UserId { get; set; }
        public User? User { get; set; }
        [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime ExpiresAt { get; set; } = (DateTime.UtcNow).AddDays(14);
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
