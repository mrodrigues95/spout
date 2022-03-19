using FluentValidation;

namespace API.Schema.Mutations.Auth.Inputs {
    public record GeneratePasswordResetTokenInput(string Email);

    public class GeneratePasswordResetTokenInputValidator
        : AbstractValidator<GeneratePasswordResetTokenInput> {
        public GeneratePasswordResetTokenInputValidator() {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
        }
    }
}
