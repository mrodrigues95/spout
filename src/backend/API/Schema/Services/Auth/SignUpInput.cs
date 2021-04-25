using API.Common.Validators;
using FluentValidation;

namespace API.Schema.Services.Auth {
    public record SignUpInput(
        string FirstName,
        string LastName,
        string Email,
        string Password);

    public class SignUpInputValidator : AbstractValidator<SignUpInput> {
        public SignUpInputValidator() {
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(35);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(35);
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).Password();
        }
    }
}
