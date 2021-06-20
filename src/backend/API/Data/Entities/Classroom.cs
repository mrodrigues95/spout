using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Classroom {
        public int Id { get; set; }
        [Required]
        public Guid Guid { get; set; } = Guid.NewGuid();
        [Required]
        public string? Name { get; set; }
        [Required]
        public int CreatedById { get; set; }
        [Required]
        public User? CreatedBy { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public bool IsActive { get; set; } = true;

        public ICollection<UserClassroom> UserClassrooms { get; set; } = new List<UserClassroom>();
        public ICollection<Discussion> Discussions { get; set; } = new List<Discussion>();
    }
}
