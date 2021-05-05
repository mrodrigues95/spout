using API.Data.Entities;
using FluentValidation;
using HotChocolate.Types.Relay;
using System;

namespace API.Schema.Services.Auth {
    public record LogoutInput([ID(nameof(Session))] Guid SessionId);

    public class LogoutInputValidator : AbstractValidator<LogoutInput> {
        public LogoutInputValidator() {
            RuleFor(x => x.SessionId).NotEmpty();
        }
    }
}
