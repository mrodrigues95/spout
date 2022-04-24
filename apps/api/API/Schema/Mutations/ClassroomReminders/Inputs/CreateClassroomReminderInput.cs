using System;
using API.Data.Entities;
using API.Schema.Types.ClassroomReminders;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.ClassroomReminders.Inputs {
    public record CreateClassroomReminderInput(
        [property: ID(nameof(Classroom))] int ClassroomId,
        string Title,
        string? Description,
        DateTime DueAt,
        ClassroomReminderImportance Importance);

    public class CreateClassroomReminderInputValidator
        : AbstractValidator<CreateClassroomReminderInput> {
        public CreateClassroomReminderInputValidator() {
            RuleFor(x => x.Title)
                .NotEmpty()
                .Length(1, 128);

            RuleFor(x => x.Description)
                .Length(1, 256)
                .When(x => !string.IsNullOrEmpty(x.Description));

            RuleFor(x => x.DueAt)
                .NotEmpty()
                .Must(GreaterThanOrEqualToUtc)
                .WithMessage("'DueAt' must be some time in the future.");
        }

        private bool GreaterThanOrEqualToUtc(DateTime dueAt)
            => dueAt.ToUniversalTime() >= DateTime.UtcNow;
    }
}
