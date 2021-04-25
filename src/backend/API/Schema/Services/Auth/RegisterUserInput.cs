using FluentValidation;

namespace API.Schema.Services.Auth {
    public record RegisterUserInput(
        string FirstName,
        string LastName,
        string Email,
        string Password);

    public class RegisterUserInputValidator : AbstractValidator<RegisterUserInput> {
        public RegisterUserInputValidator() {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("BAD FIRST NAME");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("BAD FIRST NAME");
        }
    }
}
