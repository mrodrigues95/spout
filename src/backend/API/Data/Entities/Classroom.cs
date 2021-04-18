using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Classroom {
        public Guid Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool ActiveInd { get; set; } = true;
        [Required]
        public ApplicationUser? CreatedBy { get; set; }

        public ICollection<ClassroomApplicationUser> ClassroomApplicationUsers { get; set; }
            = new List<ClassroomApplicationUser>();
    }
}
