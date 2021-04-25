using FluentValidation;

namespace API.Common.Validators {
    public static class ValidatorExtensions {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder) {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Minimum 6 characters")
                .Matches("[A-Z]").WithMessage("An uppercase letter")
                .Matches("[a-z]").WithMessage("An lowercase letter")
                .Matches("[0-9]").WithMessage("A number")
                .Matches("[^a-zA-Z0-9]").WithMessage("A special character like '@, #, $, %'");

            return options;
        }
    }
}
