using System;
using System.Collections.Generic;
using API.Schema.Types.Users;
using Microsoft.AspNetCore.Identity;

namespace API.Data.Entities {
    public class User : IdentityUser<int> {
        public Guid Guid { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public override string? Email { get; set; }
        public UserProfileColor ProfileColor { get; set; }
        public string? AvatarUrl { get; set; }
        public int StateId { get; set; }
        public State? State { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Session> Sessions { get; set; } = new List<Session>();
        public ICollection<Message> Messages { get; set; } = new List<Message>();
        public ICollection<Message> PinnedMessages { get; set; } = new List<Message>();
        public ICollection<ClassroomUser> Classrooms { get; set; } = new List<ClassroomUser>();
        public ICollection<ClassroomInvite> Invites { get; set; } = new List<ClassroomInvite>();
        public ICollection<File> FileUploads { get; set; } = new List<File>();
    }
}
