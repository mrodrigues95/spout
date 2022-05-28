using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.ClassroomSyllabus.Inputs {
    public record UpsertClassroomSyllabusInput(
        [property: ID(nameof(Classroom))] int ClassroomId,
        [property: ID(nameof(File))] int[] FileIds,
        string? Content);

    public class UpsertClassroomSyllabusInputValidator
        : AbstractValidator<UpsertClassroomSyllabusInput> {
        public UpsertClassroomSyllabusInputValidator() {
            RuleFor(x => x.Content)
                .Length(1, 120000)
                .When(x => !string.IsNullOrEmpty(x.Content));
        }
    }
}
