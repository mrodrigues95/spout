﻿using FluentValidation;

namespace API.Schema.Mutations.Classrooms {
    public record JoinClassroomInput(string Code);

    public class JoinClassroomInputValidator : AbstractValidator<JoinClassroomInput> {
        public JoinClassroomInputValidator() {
            RuleFor(x => x.Code).NotEmpty().Length(22);
        }
    }
}
