using System.Threading;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using HotChocolate.Types;
using Microsoft.Extensions.Options;

namespace API.Infrastructure {
    public class FileManager : IFileManager {
        private readonly Cloudinary _cloudinary;

        public FileManager(IOptions<CloudinarySettings> config) {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<FileUploadResult?> UploadFile(
            IFile file,
            CancellationToken cancellationToken) {
            if (file.Length > 0) {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams {
                    File = new FileDescription(file.Name, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams, cancellationToken);

                if (uploadResult.Error != null) {
                    return new FileUploadResult {
                        Error = uploadResult.Error.Message,
                        HasError = true
                    };
                }

                return new FileUploadResult {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString(),
                    HasError = false
                };
            }

            return null;
        }
    }

    public class CloudinarySettings {
        public string? CloudName { get; set; }
        public string? ApiKey { get; set; }
        public string? ApiSecret { get; set; }
    }

    public class FileUploadResult {
        public string? PublicId { get; set; }
        public string? Url { get; set; }
        public string? Error { get; set; }
        public bool HasError { get; set; }
    }
}
