using API.Schema.Types.Files;
using FluentValidation;

namespace API.Schema.Mutations.Files.Inputs {
    public record GenerateUploadSASInput(
        string FileName,
        long Size,
        string? MimeType);

    public class GenerateUploadSASInputValidator : AbstractValidator<GenerateUploadSASInput> {
        public GenerateUploadSASInputValidator() {
            // Max file size can only be 8MB.
            RuleFor(x => x.Size).GreaterThan(0).LessThanOrEqualTo((long)FileSize._8MB);
            RuleFor(x => x.FileName).NotEmpty().Length(1, 255);
        }
    }
}
