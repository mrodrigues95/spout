using API.Data.Entities;
using API.Schema.Queries.Files;
using HotChocolate.Types;

namespace API.Schema.Types.Files {
    /// <summary>
    /// Common file sizes in bytes.
    /// </summary>
    public enum FileSize {
        _8MB = 8388608,
    }

    /// <summary>
    /// Accepted file extensions.
    /// </summary>
    public enum FileExtension {
        AAC,
        CSV,
        PDF,
        XLS,
        XLSX,
        PPT,
        PPTX,
        BMP,
        GIF,
        JPEG,
        JPG,
        JPE,
        PNG,
        TIFF,
        TIF,
        TXT,
        TEXT,
        RTF,
        DOC,
        DOCX,
        DOT,
        DOTX,
        DWG,
        DWF,
        DXF,
        MP3,
        MP4,
        WAV,
        AVI,
        MOV,
        MPEG,
        WMV,
        ZIP
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

    public class FileExtensionType : EnumType<FileExtension> { }
    public class FileUploadStatusType : EnumType<FileUploadStatus> { }
    public class FileSizeType : EnumType<FileSize> { }

    public class FileType : ObjectType<File> {
        protected override void Configure(IObjectTypeDescriptor<File> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(f => f.Id)
                .ResolveNode((ctx, id) =>
                    ctx.DataLoader<FileByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));
        }
    }
}
