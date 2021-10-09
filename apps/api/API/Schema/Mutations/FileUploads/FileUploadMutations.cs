using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Extensions;
using API.Infrastructure;
using API.Schema.Common;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;

namespace API.Schema.Mutations.FileUploads {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class FileUploadMutations {
        [Authorize]
        [UseApplicationDbContext]
        public async Task<FileUploadPayload> UploadAsync(
        FileUploadInput input,
        [GlobalState] int userId,
        [Service] IFileManager fmgr,
        [ScopedService] ApplicationDbContext ctx,
        CancellationToken cancellationToken) {
            var result = await fmgr.UploadFile(input.File, cancellationToken);

            if (result is null) {
                return new FileUploadPayload(
                    new UserError("Invalid file length.", "INVALID_FILE_LENGTH"));
            } else if (result.HasError) {
                return new FileUploadPayload(
                    new UserError(result.Error!, "CLOUDINARY_ERROR"));
            }

            var upload = new FileUpload {
                UploadedById = userId,
                Url = result.Url,
                Location = "TODO"
            };

            ctx.FileUploads.Add(upload);
            await ctx.SaveChangesAsync(cancellationToken);

            return new FileUploadPayload(upload);
        }
    }
}
