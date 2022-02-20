using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class State {
        public int Id { get; set; }
        [Required] public string? Status { get; set; }
        [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Classroom> Classrooms { get; set; } = new List<Classroom>();
        public ICollection<Discussion> Discussions { get; set; } = new List<Discussion>();
    }
}
