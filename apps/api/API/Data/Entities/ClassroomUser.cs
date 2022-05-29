using System;

namespace API.Data.Entities {
    public class ClassroomUser {
        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public bool IsCreator { get; set; } = false;
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
