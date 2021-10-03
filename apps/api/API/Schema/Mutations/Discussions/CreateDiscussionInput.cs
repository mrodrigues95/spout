using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Discussions {
    public record CreateDiscussionInput(
        [property: ID(nameof(Classroom))] int ClassroomId,
        string Name);

    public class CreateDiscussionInputValidator : AbstractValidator<CreateDiscussionInput> {
        public CreateDiscussionInputValidator() {
            RuleFor(x => x.Name).NotEmpty().Length(1, 64);
        }
    }
}
