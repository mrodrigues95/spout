using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.ClassroomAnnouncements.Inputs {
    public record CreateClassroomAnnouncementInput(
        [property: ID(nameof(Classroom))] int ClassroomId,
        string Content);

    public class CreateClassroomAnnouncementInputValidator
        : AbstractValidator<CreateClassroomAnnouncementInput> {
        public CreateClassroomAnnouncementInputValidator() {
            RuleFor(x => x.Content)
                .NotEmpty()
                .Length(1, 120000);
        }
    }
}
