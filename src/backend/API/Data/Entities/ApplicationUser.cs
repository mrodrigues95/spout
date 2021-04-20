using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class ApplicationUser : IdentityUser<int> {
        [Required]
        public Guid? GUID { get; set; } 
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public override string? Email { get; set; }

        public ICollection<ApplicationUserClassroom> ApplicationUserClassrooms { get; set; } = new List<ApplicationUserClassroom>();
    }
}
