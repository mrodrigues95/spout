using System;
using API.Schema.Types.ClassroomTimelineEvents;

namespace API.Data.Entities {
    public class ClassroomTimelineEvent {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public int TriggeredById { get; set; }
        public User? TriggeredBy { get; set; }
        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }
        public int? DiscussionId { get; set; }
        public Discussion? Discussion { get; set; }
        public int? ClassroomSyllabusId { get; set; }
        public ClassroomSyllabus? ClassroomSyllabus { get; set; }
        public int? ClassroomAnnouncementId { get; set; }
        public ClassroomAnnouncement? ClassroomAnnouncement { get; set; }
        public int? ClassroomReminderId { get; set; }
        public ClassroomReminder? ClassroomReminder { get; set; }
        public ClassroomTimelineEventItem Event { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
