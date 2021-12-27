using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Schema.Types.Files;

namespace API.Data.Entities {
    public class File {
        public int Id { get; set; }
        [Required] public int UploadedById { get; set; }
        [Required] public User? UploadedBy { get; set; }
        [Required] public long ContentLength { get; set; }
        [Required] public string? MimeType { get; set; }
        [Required] public FileExtension Extension { get; set; }
        [Required] public FileUploadStatus UploadStatus { get; set; }
        [Required] public Uri? Sas { get; set; }
        [Required] public string? SignatureEncoded { get; set; }
        [Required] public string? SignatureDecoded { get; set; }
        [Required] public string? ContainerName { get; set; }
        [Required] public string? BlobName { get; set; }
        [Required] public string? Name { get; set; }
        public Uri? Location { get; set; }
        public string? ETag { get; set; }
        public string? MD5 { get; set; }
        [Required] public bool IsDeleted { get; set; }
        [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; }

        public ICollection<MessageFile> MessageFiles { get; set; } = new List<MessageFile>();
    }
}
