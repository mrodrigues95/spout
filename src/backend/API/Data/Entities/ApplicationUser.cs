using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class ApplicationUser : IdentityUser {
        [Required]
        public string? Name { get; set; }
        [Required]
        public override string? Email { get; set; }

        public ICollection<ClassroomApplicationUser> ClassroomApplicationUsers { get; set; } 
            = new List<ClassroomApplicationUser>();
    }
}
