using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Discussions.Inputs {
    public record UpdateDiscussionTopicInput(
        [property: ID(nameof(Discussion))] int DiscussionId,
        string? Topic);

    public class UpdateDiscussionTopicInputValidator : AbstractValidator<UpdateDiscussionTopicInput> {
        public UpdateDiscussionTopicInputValidator() {
            RuleFor(x => x.Topic).MaximumLength(250);
        }
    }
}
