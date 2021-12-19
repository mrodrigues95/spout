using API.Schema.Types.Users;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class User : IdentityUser<int> {
        [Required] public Guid Guid { get; set; } = Guid.NewGuid();
        [Required] public string? Name { get; set; }
        [Required] public override string? Email { get; set; }
        [Required] public UserProfileColor ProfileColor { get; set; }
        public string? AvatarUrl { get; set; }
        [Required] public int StateId { get; set; }
        public State? State { get; set; }
        [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Session> Sessions { get; set; } = new List<Session>();
        public ICollection<Message> Messages { get; set; } = new List<Message>();
        public ICollection<ClassroomUser> Classrooms { get; set; } = new List<ClassroomUser>();
        public ICollection<ClassroomInvite> Invites { get; set; } = new List<ClassroomInvite>();
        public ICollection<FileUpload> FileUploads { get; set; } = new List<FileUpload>();
    }
}
