using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Auth.Inputs {
    public record ChangePasswordInput(
        [property: ID(nameof(Session))] int SessionId,
        string CurrentPassword,
        string NewPassword);

    public class ChangePasswordInputValidator : AbstractValidator<ChangePasswordInput> {
        public ChangePasswordInputValidator() {
            RuleFor(x => x.CurrentPassword)
                .NotEmpty()
                .MinimumLength(6);

            RuleFor(x => x.NewPassword)
                .NotEmpty()
                .MinimumLength(6);
        }
    }
}
