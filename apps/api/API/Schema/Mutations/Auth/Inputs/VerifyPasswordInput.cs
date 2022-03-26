using FluentValidation;

namespace API.Schema.Mutations.Auth.Inputs {
    public record VerifyPasswordInput(string CurrentPassword);

    public class VerifyCurrentPasswordInputValidator
        : AbstractValidator<VerifyPasswordInput> {
        public VerifyCurrentPasswordInputValidator() {
            RuleFor(x => x.CurrentPassword)
                .NotEmpty()
                .MinimumLength(6);
        }
    }
}
