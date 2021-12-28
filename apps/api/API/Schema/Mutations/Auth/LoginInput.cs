using FluentValidation;

namespace API.Schema.Mutations.Auth {
    public record LoginInput(string Email, string Password);

    public class LoginInputValidator : AbstractValidator<LoginInput> {
        public LoginInputValidator() {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
