using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Invite {
        public int Id { get; set; }
        [Required] public string? Code { get; set; }
        [Required] public short Uses { get; set; }
        public short? MaxUses { get; set; }
        public DateTime? ExpiresAt { get; set; } = (DateTime.UtcNow).AddDays(7);
        [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ClassroomInvite> Logs { get; set; } = new List<ClassroomInvite>();
    }
}
