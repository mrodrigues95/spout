using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class User : IdentityUser<int> {
        public Guid GUID { get; set; } = Guid.NewGuid();
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public override string? Email { get; set; }

        public ICollection<UserClassroom> UserClassrooms { get; set; } = new List<UserClassroom>();
    }
}
