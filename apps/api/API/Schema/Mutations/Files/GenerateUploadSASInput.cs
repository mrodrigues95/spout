using API.Schema.Types.Files;
using FluentValidation;

namespace API.Schema.Mutations.FileUploads {
    public record GenerateUploadSASInput(
        string FileName,
        long Size,
        string MimeType,
        FileExtension FileExtension);

    public class GenerateUploadSASInputValidator : AbstractValidator<GenerateUploadSASInput> {
        public GenerateUploadSASInputValidator() {
            RuleFor(x => x.FileName).NotEmpty().Length(1, 255);
            RuleFor(x => x.MimeType).NotEmpty();

            // Max file size can only be 8MB.
            RuleFor(x => x.Size).GreaterThan(0).LessThanOrEqualTo((long)FileSize._8MB);
        }
    }
}
