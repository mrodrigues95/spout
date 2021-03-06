using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Discussions.Inputs {
    public record SendDiscussionMessageInput(
        [property: ID(nameof(Discussion))] int DiscussionId,
        [property: ID(nameof(File))] int[] FileIds,
        string Content);

    public class SendDiscussionMessageInputValidator : AbstractValidator<SendDiscussionMessageInput> {
        public SendDiscussionMessageInputValidator() {
            RuleFor(x => x.Content).NotEmpty().Length(1, 2000);

            RuleFor(x => x.FileIds)
                .Must(x => x.Length <= 10)
                .WithMessage("File limit exceeded - cannot upload more than 10 files per message.");
        }
    }
}
