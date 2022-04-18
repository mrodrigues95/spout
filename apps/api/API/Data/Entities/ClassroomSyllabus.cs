using System;

namespace API.Data.Entities {
    public class ClassroomSyllabus {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
