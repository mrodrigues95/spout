using System;
using System.Collections.Generic;

namespace API.Data.Entities {
    public class Discussion {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public string? Topic { get; set; }
        public string? Description { get; set; }
        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }
        public int CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Message> Messages { get; set; } = new List<Message>();
        public ICollection<ClassroomTimelineEvent> ClassroomTimelineEvents { get; set; } = new List<ClassroomTimelineEvent>();
    }
}
