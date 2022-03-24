using FluentValidation;

namespace API.Schema.Mutations.Auth.Inputs {
    public record GenerateChangePhoneNumberTokenInput(
        string PhoneNumber,
        string CountryCode);

    public class GenerateChangePhoneNumberTokenInputValidator
        : AbstractValidator<GenerateChangePhoneNumberTokenInput> {
        public GenerateChangePhoneNumberTokenInputValidator() {
            RuleFor(x => x.PhoneNumber)
                .NotEmpty()
                .Matches(@"^\+?[1-9]\d{1,14}$");

            RuleFor(x => x.CountryCode)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(2);
        }
    }
}
