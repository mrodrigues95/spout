using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Discussions.Inputs {
    public record UpdateDiscussionDescriptionInput(
        [property: ID(nameof(Discussion))] int DiscussionId,
        string? Description);

    public class UpdateDiscussionDescriptionInputValidator : AbstractValidator<UpdateDiscussionDescriptionInput> {
        public UpdateDiscussionDescriptionInputValidator() {
            RuleFor(x => x.Description).Length(1, 250);
        }

    }
}
