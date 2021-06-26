using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class User : IdentityUser<int> {
        [Required]
        public Guid Guid { get; set; } = Guid.NewGuid();
        [Required]
        public string? Name { get; set; }
        [Required]
        public override string? Email { get; set; }
        [Required]
        public int StateId { get; set; }
        [Required]
        public State? State { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<UserClassroom> UserClassrooms { get; set; } = new List<UserClassroom>();
        public ICollection<UserDiscussion> UserDiscussions { get; set; } = new List<UserDiscussion>();
        public ICollection<Session> Sessions { get; set; } = new List<Session>();
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
