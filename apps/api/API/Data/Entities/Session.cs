using System;

namespace API.Data.Entities {
    public class Session {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime ExpiresAt { get; set; } = (DateTime.UtcNow).AddDays(14);
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
