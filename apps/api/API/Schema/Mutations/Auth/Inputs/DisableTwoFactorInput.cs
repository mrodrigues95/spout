using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Auth.Inputs {
    public record DisableTwoFactorInput(
        [property: ID(nameof(Session))] int SessionId,
        string CurrentPassword);

    public class DisableTwoFactorInputValidator : AbstractValidator<DisableTwoFactorInput> {
        public DisableTwoFactorInputValidator() {
            RuleFor(x => x.CurrentPassword)
                .NotEmpty()
                .MinimumLength(6);
        }
    }
}
