using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.ClassroomAnnouncements.Inputs {
    public record UpdateClassroomAnnouncementInput(
        [property: ID(nameof(ClassroomAnnouncement))] int ClassroomAnnouncementId,
        string Content);

    public class UpdateClassroomAnnouncementInputValidator
        : AbstractValidator<UpdateClassroomAnnouncementInput> {
        public UpdateClassroomAnnouncementInputValidator() {
            RuleFor(x => x.Content)
                .NotEmpty()
                .Length(1, 120000);
        }
    }
}
