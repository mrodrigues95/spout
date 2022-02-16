using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Discussions.Inputs {
    public record UpdateDiscussionMessageInput(
        [property: ID(nameof(Message))] int MessageId,
        string Content);

    public class UpdateDiscussionMessageInputValidator :
        AbstractValidator<UpdateDiscussionMessageInput> {
        public UpdateDiscussionMessageInputValidator() {
            RuleFor(x => x.Content).NotEmpty().Length(1, 2000);
        }
    }
}
