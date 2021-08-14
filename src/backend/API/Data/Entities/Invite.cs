using API.Common.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class Invite {
        public int Id { get; set; }
        [Required]
        public int InviterId { get; set; }
        [Required]
        public User? Inviter { get; set; }
        [Required]
        public int ClassroomId { get; set; }
        [Required]
        public Classroom? Classroom { get; set; }
        [Required]
        public string? Code { get; set; }
        [Required]
        public short Uses { get; set; }
        [Required]
        public short? MaxUses { get; set; }
        [Required]
        public DateTime? ExpiresAt { get; set; } = (DateTime.UtcNow).AddDays(7);
        [Required]
        public ExpiresAfter ExpiresAfter { get; set; } = ExpiresAfter.SevenDays;
        [Required]
        public bool? IsValid { get; set; } = true;
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
