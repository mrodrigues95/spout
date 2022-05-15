using System;
using System.Collections.Generic;

namespace API.Data.Entities {
    public class ClassroomAnnouncement {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public int CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ClassroomTimelineEvent> ClassroomTimelineEvents { get; set; } = new List<ClassroomTimelineEvent>();
    }
}
