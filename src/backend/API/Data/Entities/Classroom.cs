using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Classroom {
        public int Id { get; set; }
        [Required] public Guid Guid { get; set; } = Guid.NewGuid();
        [Required] public string? Name { get; set; }
        [Required] public int StateId { get; set; }
        [Required] public State? State { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? DelLogId { get; set; }
        public DelLog? DelLog { get; set; }
        [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Discussion> Discussions { get; set; } = new List<Discussion>();
        public ICollection<ClassroomUser> Users { get; set; } = new List<ClassroomUser>();
        public ICollection<ClassroomInvite> Invites { get; set; } = new List<ClassroomInvite>();
    }
}
