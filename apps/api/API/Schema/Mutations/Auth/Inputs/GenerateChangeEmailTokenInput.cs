using FluentValidation;

namespace API.Schema.Mutations.Auth.Inputs {
    public record GenerateChangeEmailTokenInput(string NewEmail, string Password);

    public class GenerateChangeEmailTokenInputValidator
        : AbstractValidator<GenerateChangeEmailTokenInput> {
        public GenerateChangeEmailTokenInputValidator() {
            RuleFor(x => x.NewEmail).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        }
    }
}
