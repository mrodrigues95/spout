using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using API.Data;
using API.Data.Entities;
using API.Infrastructure;
using API.Schema.Mutations.Files.Exceptions;
using API.Schema.Mutations.Files.Inputs;
using API.Schema.Mutations.Files.Payloads;
using API.Schema.Types.Files;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace API.Schema.Mutations.Files {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class FileMutations {
        private readonly string _containerName;
        private readonly ILogger<FileMutations> _logger;

        public FileMutations(IOptions<AzureStorageConfig> config, ILogger<FileMutations> logger) {
            _logger = logger;
            _containerName = config.Value.ContainerName ??
                throw new ArgumentNullException(nameof(config));
        }

        private Signature? ParseSignatureFromUri(Uri uri) {
            var query = uri.Query;

            if (string.IsNullOrEmpty(query)) {
                return null;
            }

            var arguments = query
              .Substring(1) // Remove '?'.
              .Split('&')
              .Select(q => q.Split('='))
              .ToDictionary(
                q => q.FirstOrDefault() ?? default!,
                q => q.Skip(1).FirstOrDefault() ?? default!);

            string? signature;
            if (arguments.TryGetValue("sig", out signature)) {
                return new Signature {
                    Encoded = signature,
                    Decoded = HttpUtility.UrlDecode(signature)
                };
            } else {
                return null;
            }
        }

        [Authorize]
        [Error(typeof(GenerateSignatureException))]
        [Error(typeof(ParseSignatureException))]
        public async Task<GenerateSASPayload> GenerateUploadSASAsync(
            [GlobalState] int userId,
            GenerateUploadSASInput input,
            IBlobService blob,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var blobName = Guid.NewGuid().ToString();
            var sas = await blob.GetBlobSasUri(blobName,
                BlobSasPermissions.Write | BlobSasPermissions.Create);
            if (sas is null) {
                throw new GenerateSignatureException();
            }

            var signature = ParseSignatureFromUri(sas);
            if (signature is null) {
                throw new ParseSignatureException();
            }

            var mimeType = input.MimeType;
            if (string.IsNullOrEmpty(mimeType)) {
                mimeType = "application/octet-stream";
            }

            var file = new File {
                UploadedById = userId,
                ContentLength = input.Size,
                MimeType = mimeType,
                FileExtension = input.FileExtension,
                Name = input.FileName,
                UploadStatus = FileUploadStatus.QUEUED,
                Sas = sas,
                SignatureEncoded = signature.Encoded,
                SignatureDecoded = signature.Decoded,
                ContainerName = _containerName,
                BlobName = blobName,
                IsDeleted = false,
            };

            ctx.Files.Add(file);
            await ctx.SaveChangesAsync(cancellationToken);

            return new GenerateSASPayload(file, sas);
        }

        [Authorize]
        [Error(typeof(FileNotFoundException))]
        [Error(typeof(GenerateSignatureException))]
        public async Task<GenerateSASPayload> GenerateDownloadSASAsync(
            GenerateDownloadSASInput input,
            IBlobService blob,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var file = await ctx.Files.FindAsync(
                new object[] { input.FileId },
                cancellationToken);

            if (file is null) {
                throw new FileNotFoundException();
            }

            var sas = await blob.GetBlobSasUri(file.BlobName!, BlobSasPermissions.Read);
            if (sas is null) {
                throw new GenerateSignatureException();
            }

            return new GenerateSASPayload(file, sas);
        }

        [Authorize]
        [Error(typeof(BlobNotFoundException))]
        [Error(typeof(BlobPropertiesException))]
        [Error(typeof(FileNotFoundException))]
        public async Task<File?> CompleteUploadAsync(
            CompleteUploadInput input,
            IBlobService blob,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var file = await ctx.Files.FindAsync(
                new object[] { input.FileId },
                cancellationToken);

            if (file is null) {
                throw new FileNotFoundException();
            }

            var blobClient = await blob.GetBlobClient(file.BlobName!);
            if (blobClient is null) {
                file.UploadStatus = FileUploadStatus.ERROR;
                file.UpdatedAt = DateTime.UtcNow;
                await ctx.SaveChangesAsync(cancellationToken);
                throw new BlobNotFoundException();
            }

            try {
                var properties = await blobClient.GetPropertiesAsync();
                file.ETag = properties.Value.ETag.ToString();
                file.MD5 = null; // TODO: Figure out how to get this value.
                file.Location = blobClient.Uri;
                file.ContentLength = properties.Value.ContentLength;
                file.UploadStatus = FileUploadStatus.COMPLETED;
                file.UpdatedAt = DateTime.UtcNow;
                await ctx.SaveChangesAsync(cancellationToken);

                return file;
            } catch (Exception ex) {
                _logger.LogError(ex, "Error getting blob properties.");
                file.UploadStatus = FileUploadStatus.ERROR;
                file.UpdatedAt = DateTime.UtcNow;
                await ctx.SaveChangesAsync(cancellationToken);
                throw new BlobPropertiesException();
            }
        }

        [Authorize]
        [Error(typeof(FileNotFoundException))]
        [Error(typeof(BlobNotFoundException))]
        [Error(typeof(BlobDeletionException))]
        public async Task<File?> DeleteFileAsync(
            DeleteFileInput input,
            IBlobService blob,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var file = await ctx.Files.FindAsync(
                new object[] { input.FileId },
                cancellationToken);

            if (file is null) {
                throw new FileNotFoundException();
            }

            var blobClient = await blob.GetBlobClient(file.BlobName!);
            if (blobClient is null) {
                file.UploadStatus = FileUploadStatus.IGNORED;
                file.UpdatedAt = DateTime.UtcNow;
                await ctx.SaveChangesAsync(cancellationToken);
                throw new BlobNotFoundException();
            }

            bool success;
            try {
                success = await blobClient.DeleteIfExistsAsync(
                    DeleteSnapshotsOption.IncludeSnapshots);
            } catch (Exception ex) {
                _logger.LogError(ex,
                    $"Error deleting blob for `FileId: ${file.Id}` - `Blob name: {file.BlobName}.`",
                    file);
                file.UploadStatus = FileUploadStatus.IGNORED;
                file.UpdatedAt = DateTime.UtcNow;
                await ctx.SaveChangesAsync(cancellationToken);
                throw new BlobDeletionException();
            }

            if (!success) {
                file.UploadStatus = FileUploadStatus.IGNORED;
                file.UpdatedAt = DateTime.UtcNow;
                await ctx.SaveChangesAsync(cancellationToken);
                _logger.LogWarning("Unsuccessful blob deletion.", file);
                throw new BlobDeletionException();
            }

            file.IsDeleted = true;
            file.Location = null;
            file.UpdatedAt = DateTime.UtcNow;
            file.DeletedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);
            return file;
        }

        private class Signature {
            public string? Encoded { get; set; }
            public string? Decoded { get; set; }
        }
    }
}
