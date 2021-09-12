using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class DelLogType {
        [Required] public int Id { get; set; }
        [Required] public string? Type { get; set; }

        public ICollection<DelLog> DelLogs { get; set; } = new List<DelLog>();
    }
}
