using System;

namespace API.Data.Entities {
    public class ClassroomInviteLog {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public int ClassroomInviteId { get; set; }
        public ClassroomInvite? ClassroomInvite { get; set; }
        public int UsedById { get; set; }
        public User? UsedBy { get; set; }
        public DateTime UsedAt { get; set; } = DateTime.UtcNow;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
