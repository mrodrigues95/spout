using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Discussions {
    public record UpdateDiscussionDescriptionInput(
        [property: ID(nameof(Discussion))] int DiscussionId,
        string Description);

    public class UpdateDiscussionDescriptionInputValidator : AbstractValidator<UpdateDiscussionDescriptionInput> {
        public UpdateDiscussionDescriptionInputValidator() {
            RuleFor(x => x.Description).NotEmpty().Length(1, 250);
        }

    }
}
