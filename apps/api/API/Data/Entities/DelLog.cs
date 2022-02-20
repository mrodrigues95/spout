using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class DelLog {
        public int Id { get; set; }
        [Required] public int DeletedForId { get; set; }
        public DelLogType? DeletedFor { get; set; }
        [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Classroom> DeletedClassrooms { get; set; } = new List<Classroom>();
        public ICollection<Discussion> DeletedDiscussions { get; set; } = new List<Discussion>();
        public ICollection<Message> DeletedMessages { get; set; } = new List<Message>();
    }
}
