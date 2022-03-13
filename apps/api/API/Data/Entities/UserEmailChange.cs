using System;

namespace API.Data.Entities {
    public class UserEmailChange {
        public int Id { get; set; }
        public string? Token { get; set; }
        public string? TokenEncoded { get; set; }
        public string? NewEmail { get; set; }
        public User? User { get; set; }
        public int? UserId { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
