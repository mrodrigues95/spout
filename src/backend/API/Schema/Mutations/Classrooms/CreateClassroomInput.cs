﻿using FluentValidation;

namespace API.Schema.Mutations.Classrooms {
    public record CreateClassroomInput(string Name);

    public class CreateClassroomInputValidator : AbstractValidator<CreateClassroomInput> {
        public CreateClassroomInputValidator() {
            RuleFor(x => x.Name).NotEmpty().Length(1, 64);
        }
    }
}
