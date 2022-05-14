using System;
using System.Collections.Generic;

namespace API.Data.Entities {
    public class ClassroomInvite {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public int CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }
        public short TotalUses { get; set; }
        public string? Code { get; set; }
        public short? MaxUses { get; set; }
        public int? MaxAge { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ClassroomInviteLog> Logs { get; set; } = new List<ClassroomInviteLog>();
    }
}
