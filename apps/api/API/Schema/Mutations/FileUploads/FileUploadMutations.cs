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
    // TODO: Move uploading files to a REST api.
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class FileUploadMutations {
        [Authorize]
        [UseApplicationDbContext]
        public async Task<UploadPayload> UploadAsync(
            UploadInput input,
            [GlobalState] int userId,
            [Service] IFileManager fmgr,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var result = await UploadToCloudindaryAndSaveChangesAsync(
                input.File,
                userId,
                ctx,
                fmgr,
                cancellationToken);

            if (result.UserError != null) {
                return new UploadPayload(result.UserError);
            }           

            return new UploadPayload(result.FileUpload!);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<UpdateAvatarPayload> UpdateAvatarAsync(
            UpdateAvatarInput input,
            [GlobalState] int userId,
            [Service] IFileManager fmgr,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var user = await ctx.Users.FindAsync(
                new object[] { userId },
                cancellationToken);

            // TODO: We should also remove the previous avatar from Cloudinary
            // using the `PublicId`.
            var result = await UploadToCloudindaryAndSaveChangesAsync(
                input.File,
                userId,
                ctx,
                fmgr,
                cancellationToken);

            if (result.UserError != null) {
                return new UpdateAvatarPayload(result.UserError);
            }

            user.AvatarUrl = result.FileUpload!.Url;
            await ctx.SaveChangesAsync(cancellationToken);

            return new UpdateAvatarPayload(user);
        }

        private async Task<Result> UploadToCloudindaryAndSaveChangesAsync(
            IFile file,
            int userId,
            ApplicationDbContext ctx,
            IFileManager fmgr,
            CancellationToken cancellationToken) {
            var result = await fmgr.UploadFile(file, cancellationToken);

            if (result.HasError) {
                return new Result {
                    UserError = new UserError(
                        result.Error!.Message, "ERROR_UPLOADING_FILE")
                };
            }

            var upload = new FileUpload {
                UploadedById = userId,
                Url = result.Url,
                Location = "TODO"
            };

            ctx.FileUploads.Add(upload);
            await ctx.SaveChangesAsync(cancellationToken);

            return new Result { FileUpload = upload };
        }

        private class Result {
            public FileUpload? FileUpload { get; set; }
            public UserError? UserError { get; set; }
        }
    }
}
