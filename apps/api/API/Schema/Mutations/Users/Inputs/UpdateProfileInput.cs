using FluentValidation;

namespace API.Schema.Mutations.Users.Inputs {
    public record UpdateProfileInput(string Name, string? Bio);

    public class UpdateProfileInputValidator : AbstractValidator<UpdateProfileInput> {
        public UpdateProfileInputValidator() {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(70);

            RuleFor(x => x.Bio)
                .MaximumLength(190);
        }
    }
}
