using FluentValidation;

namespace API.Schema.Mutations.Users.Inputs {
    public record UpdateUserInput(string Name, string? Bio);

    public class UpdateUserInputValidator : AbstractValidator<UpdateUserInput> {
        public UpdateUserInputValidator() {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(70);
            RuleFor(x => x.Bio).MaximumLength(190);
        }
    }
}
