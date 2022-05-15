using System;
using System.Collections.Generic;
using API.Schema.Types.ClassroomReminders;

namespace API.Data.Entities {
    public class ClassroomReminder {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public int CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public ClassroomReminderImportance Importance { get; set; }
        public DateTime DueAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ClassroomTimelineEvent> ClassroomTimelineEvents { get; set; } = new List<ClassroomTimelineEvent>();
    }
}
