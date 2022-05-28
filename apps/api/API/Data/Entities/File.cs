using System;
using System.Collections.Generic;
using API.Schema.Types.Files;

namespace API.Data.Entities {
    public class File {
        public int Id { get; set; }
        public int UploadedById { get; set; }
        public User? UploadedBy { get; set; }
        public long ContentLength { get; set; }
        public string? MimeType { get; set; }
        public FileUploadStatus UploadStatus { get; set; }
        public Uri? Sas { get; set; }
        public string? SignatureEncoded { get; set; }
        public string? SignatureDecoded { get; set; }
        public string? ContainerName { get; set; }
        public string? BlobName { get; set; }
        public string? Name { get; set; }
        public Uri? Location { get; set; }
        public string? ETag { get; set; }
        public string? MD5 { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; }

        public ICollection<MessageFile> MessageFiles { get; set; } = new List<MessageFile>();
        public ICollection<ClassroomSyllabusFile> ClassroomSyllabusFiles { get; set; } = new List<ClassroomSyllabusFile>();
    }
}
