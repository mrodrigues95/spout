using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Classroom {
        public int Id { get; set; }
        [Required]
        public Guid? GUID { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public ApplicationUser? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

        public ICollection<ApplicationUserClassroom> ApplicationUserClassrooms { get; set; } = new List<ApplicationUserClassroom>();
    }
}
