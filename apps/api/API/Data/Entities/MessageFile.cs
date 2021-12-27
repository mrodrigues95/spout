using System;

namespace API.Data.Entities {
    public class MessageFile {
        public int MessageId { get; set; }
        public Message? Message { get; set; }

        public int FileId { get; set; }
        public File? File { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
