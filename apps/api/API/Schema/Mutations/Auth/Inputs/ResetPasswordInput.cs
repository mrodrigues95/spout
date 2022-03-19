using FluentValidation;

namespace API.Schema.Mutations.Auth.Inputs {
    public record ResetPasswordInput(
        string Token,
        string NewPassword,
        string ConfirmNewPassword);

    public class ResetPasswordInputValidator : AbstractValidator<ResetPasswordInput> {
        public ResetPasswordInputValidator() {
            RuleFor(x => x.Token)
                .NotEmpty();

            RuleFor(x => x.NewPassword)
                .NotEmpty()
                .MinimumLength(6);

            RuleFor(x => x.ConfirmNewPassword)
                .NotEmpty()
                .MinimumLength(6)
                .Equal(x => x.NewPassword);
        }
    }
}
