using System;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Entities {
    public class FileUpload {
        private string? _url;
        private string? _location;

        public int Id { get; set; }
        [Required] public int UploadedById { get; set; }
        [Required] public User? UploadedBy { get; set; }
        [Required] public string? Url {
            get => _url;
            set { _url = value?.Trim(); }
        }
        [Required] public string? Location {
            get => _location;
            set { _location = value?.Trim(); }
        }
        [Required] public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
        [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // TODO: Probably will need to implement this at some point.
        //[Required] public string? Status { get; set; }
    }
}
