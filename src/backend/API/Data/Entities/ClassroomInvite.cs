using System;

namespace API.Data.Entities {
    public class ClassroomInvite {
        // TODO: Double check these are unique
        public int InviteId { get; set; }
        public Invite? Invite { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }

        public bool IsInviter { get; set; }
        public bool IsInvitee { get; set; }
        public DateTime? UsedAt { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
