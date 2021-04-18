using Microsoft.AspNetCore.Identity;

namespace API.Data.Entities {
    public class ApplicationUser : IdentityUser {
        public string Name { get; set; }
    }
}
