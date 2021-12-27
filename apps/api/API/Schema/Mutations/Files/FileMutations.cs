using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using API.Data;
using API.Data.Entities;
using API.Extensions;
using API.Infrastructure;
using API.Schema.Common;
using API.Schema.Mutations.FileUploads;
using API.Schema.Types.Files;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.Extensions.Options;

namespace API.Schema.Mutations.Files {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class FileMutations {
        private readonly string _containerName;
        private readonly IDictionary<FileExtension, string> _acceptedMimeTypes =
            new Dictionary<FileExtension, string>() {
           { FileExtension.GIF, "image/gif" },
           { FileExtension.JPEG, "image/jpeg" },
           { FileExtension.JPG, "image/jpeg" },
           { FileExtension.PNG, "image/png" },
           { FileExtension.BMP, "image/bmp" },
           { FileExtension.DWG, "image/x-dwg" },
           { FileExtension.DXF, "image/x-dxf" },
           { FileExtension.TIFF, "image/tiff" },
           { FileExtension.TIF, "image/tiff" },
           { FileExtension.AVI, "video/avi" },
           { FileExtension.MOV, "video/quicktime" },
           { FileExtension.WMV, "video/x-ms-wmv" },
           { FileExtension.MPEG, "video/mpeg" },
           { FileExtension.MP4, "video/mp4" },
           { FileExtension.MP3, "audio/x-mpeg" },
           { FileExtension.WAV, "audio/wav" },
           { FileExtension.AAC, "audio/aac" },
           { FileExtension.TXT, "text/plain" },
           { FileExtension.TEXT, "text/plain" },
           { FileExtension.CSV, "text/csv" },
           { FileExtension.PDF, "application/pdf" },
           { FileExtension.ZIP, "application/zip" },
           { FileExtension.RTF, "application/rtf" },
           { FileExtension.DOT, "application/msword" },
           { FileExtension.DOTX, "application/vnd.openxmlformats-officedocument.wordprocessingml.template" },
           { FileExtension.DOC, "application/msword" },
           { FileExtension.DOCX, "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
           { FileExtension.PPT, "application/vnd.ms-powerpoint" },
           { FileExtension.PPTX, "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
           { FileExtension.XLS, "application/vnd.ms-excel" },
           { FileExtension.XLSX, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
           { FileExtension.DWF, "drawing/x-dwf" },
        };

        public FileMutations(IOptions<AzureStorageConfig> config) {
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
        [UseApplicationDbContext]
        public async Task<GenerateUploadSASPayload> GenerateUploadSASAsync(
            GenerateUploadSASInput input,
            [GlobalState] int userId,
            [Service] IBlobService blob,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            string? mimeType;
            if (!_acceptedMimeTypes.TryGetValue(input.FileExtension, out mimeType)) {
                return new GenerateUploadSASPayload(new UserError("Unsupported MIME type.",
                    "UNSUPPORTED_MIME_TYPE"));
            }

            if (input.MimeType != mimeType) {
                return new GenerateUploadSASPayload(new UserError("Invalid MIME type.",
                    "Invalid_MIME_TYPE"));
            }

            var blobName = Guid.NewGuid().ToString();
            var sas = await blob.GetBlobSasUri(blobName);
            if (sas is null) {
                // TODO: Improve error handling here.
                return new GenerateUploadSASPayload(
                    new UserError("Unable to generate signature.", "INVALID_SAS"));
            }

            var signature = ParseSignatureFromUri(sas);
            if (signature is null) {
                return new GenerateUploadSASPayload(
                new UserError("Unable to parse signature.", "INVALID_SIGNATURE"));
            }

            var file = new File {
                UploadedById = userId,
                ContentLength = input.Size,
                MimeType = input.MimeType,
                Extension = input.FileExtension,
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

            return new GenerateUploadSASPayload(sas, file);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<CompleteUploadPayload> CompleteUploadAsync(
            CompleteUploadInput input,
            [Service] IBlobService blob,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var file = await ctx.Files.FindAsync(
                new object[] { input.FileId },
                cancellationToken);

            if (file is null) {
                return new CompleteUploadPayload(new UserError("File not found", "FILE_NOT_FOUND"));
            }

            var blobClient = await blob.GetBlobClient(file.BlobName!);
            if (blobClient is null) {
                file.UploadStatus = FileUploadStatus.ERROR;
                file.UpdatedAt = DateTime.UtcNow;
                await ctx.SaveChangesAsync(cancellationToken);
                return new CompleteUploadPayload(
                    new UserError("Blob not found.", "BLOB_NOT_FOUND"));
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

                return new CompleteUploadPayload(file);
            } catch (Exception) {
                file.UploadStatus = FileUploadStatus.ERROR;
                file.UpdatedAt = DateTime.UtcNow;
                await ctx.SaveChangesAsync(cancellationToken);
                return new CompleteUploadPayload(
                    new UserError("Unable to retrieve blob properties.", "BLOB_ERROR"));
            }
        }

        //[Authorize]
        //[UseApplicationDbContext]
        //public async Task<> DeleteFileAsync() {
        // Mark IsDeleted = 1,
        // Maybe set Location = null?
        // Call azure to delete blob: https://stackoverflow.com/questions/36497399/how-to-delete-files-from-blob-container
        //}

        private class Signature {
            public string? Encoded { get; set; }
            public string? Decoded { get; set; }
        }
    }
}
