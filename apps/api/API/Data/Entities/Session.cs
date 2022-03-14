using System;

namespace API.Data.Entities {
    public class Session {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime ExpiresAt { get; set; } = (DateTime.UtcNow).AddDays(7);
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
