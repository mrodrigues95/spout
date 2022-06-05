using System.Threading;
using System.Threading.Tasks;
using API.Data.Entities;
using API.Schema.Queries.Files;
using API.Schema.Queries.Users;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.Types;

namespace API.Schema.Types.Files {
    /// <summary>
    /// Common file sizes in bytes.
    /// </summary>
    public enum FileSize {
        _8MB = 8388608,
    }

    /// <summary>
    /// The current status of the file upload.
    /// </summary>
    public enum FileUploadStatus {
        QUEUED,
        COMPLETED,
        ERROR,
        IGNORED
    }

    public class FileUploadStatusType : EnumType<FileUploadStatus> { }

    public class FileSizeType : EnumType<FileSize> { }


    public class FileType : ObjectType<File> {
        protected override void Configure(IObjectTypeDescriptor<File> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(f => f.Id)
                .ResolveNode((ctx, id) =>
                    ctx.DataLoader<FileByIdDataLoader>().LoadAsync(id, ctx.RequestAborted)!);

            descriptor
                .Field(f => f.UploadedById)
                .Type<NonNullType<IntType>>()
                .Ignore();

            descriptor
                .Field(f => f.UploadedBy)
                .Type<NonNullType<UserType>>()
                .ResolveWith<FileResolvers>(x =>
                    x.GetUploadedByAsync(default!, default!, default!));

            descriptor
                .Field(f => f.ContentLength)
                .Type<NonNullType<LongType>>();

            descriptor
                .Field(f => f.UploadStatus)
                .Type<NonNullType<FileUploadStatusType>>();

            descriptor
                .Field(f => f.Sas)
                .Type<NonNullType<UrlType>>();

            descriptor
                .Field(f => f.SignatureEncoded)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(f => f.SignatureDecoded)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(f => f.ContainerName)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(f => f.BlobName)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(f => f.Name)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(f => f.IsDeleted)
                .Type<NonNullType<BooleanType>>();

            descriptor
                .Field(f => f.CreatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(f => f.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();
        }

        private class FileResolvers {
            public async Task<User> GetUploadedByAsync(
            [Parent] File file,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken)
            => await userById.LoadAsync(file.UploadedById, cancellationToken);
        }
    }
}
