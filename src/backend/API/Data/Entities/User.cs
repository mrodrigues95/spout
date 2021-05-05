using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class User : IdentityUser<int> {
        public Guid Guid { get; set; } = Guid.NewGuid();
        [Required]
        public string? Name { get; set; }
        [Required]
        public override string? Email { get; set; }
        [Required]
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public DateTime? UpdatedAt { get; set; }

        public ICollection<UserClassroom> UserClassrooms { get; set; } = new List<UserClassroom>();
        public ICollection<Session> Sessions { get; set; } = new List<Session>();
    }
}
