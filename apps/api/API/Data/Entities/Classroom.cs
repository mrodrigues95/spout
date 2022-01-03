using System;
using System.Collections.Generic;

namespace API.Data.Entities {
    public class Classroom {
        private string? _name;

        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public string? Name {
            get => _name;
            set { _name = value?.Trim(); }
        }
        public int StateId { get; set; }
        public State? State { get; set; }
        public int? DelLogId { get; set; }
        public DelLog? DelLog { get; set; }
        public DateTime? DeletedAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Discussion> Discussions { get; set; } = new List<Discussion>();
        public ICollection<ClassroomUser> Users { get; set; } = new List<ClassroomUser>();
        public ICollection<ClassroomInvite> Invites { get; set; } = new List<ClassroomInvite>();
    }
}
