using System;
using System.Collections.Generic;

namespace API.Data.Entities {
    public class Classroom {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public int? SyllabusId { get; set; }
        public ClassroomSyllabus? Syllabus { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Discussion> Discussions { get; set; } = new List<Discussion>();
        public ICollection<ClassroomUser> Users { get; set; } = new List<ClassroomUser>();
        public ICollection<ClassroomInvite> Invites { get; set; } = new List<ClassroomInvite>();
        public ICollection<ClassroomAnnouncement> Announcements { get; set; } = new List<ClassroomAnnouncement>();
        public ICollection<ClassroomReminder> Reminders { get; set; } = new List<ClassroomReminder>();
        public ICollection<ClassroomTimelineEvent> Timeline { get; set; } = new List<ClassroomTimelineEvent>();
    }
}
