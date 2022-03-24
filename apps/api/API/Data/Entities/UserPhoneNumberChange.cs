using System;

namespace API.Data.Entities {
    public class UserPhoneNumberChange {
        public int Id { get; set; }
        public string? Token { get; set; }
        public string? NewPhoneNumber { get; set; }
        public User? User { get; set; }
        public int? UserId { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
