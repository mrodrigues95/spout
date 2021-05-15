using API.Data;
using API.Extensions;
using API.Data.Entities;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AppAny.HotChocolate.FluentValidation;
using Microsoft.AspNetCore.Http;
using HotChocolate.AspNetCore.Authorization;
using System;
using API.Schema.Services.Auth.Sessions;
using API.Schema.Common;

namespace API.Schema.Services.Auth {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class AuthMutations {
        [UseApplicationDbContext]
        public async Task<AuthPayload> SignUpAsync(
            [UseFluentValidation, UseValidator(typeof(SignUpInputValidator))] SignUpInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] UserManager<User> userManager,
            [Service] SignInManager<User> signInManager,
            CancellationToken cancellationToken) {
            if (await context.Users.AnyAsync(x => x.Email == input.Email || x.UserName == input.Email)) {
                return new AuthPayload(new UserError("Email already exists.", "EMAIL_ALREADY_EXISTS"));
            }

            var user = new User {
                Name = input.Name,
                UserName = input.Email,
                Email = input.Email,
                UpdatedAt = DateTime.UtcNow
            };

            var createUser = await userManager.CreateAsync(user, input.Password);
            if (!createUser.Succeeded) return new AuthPayload(new UserError("Unable to create new user.", "INVALID_USER"));

            var loginUser = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
            if (!loginUser.Succeeded) return new AuthPayload(new UserError("Unable to sign in user.", "INVALID_USER"));

            var session = await SessionManagement.CreateSession(user.Email, context, cancellationToken);

            return new AuthPayload(user, session.Session, true);
        }

        [UseApplicationDbContext]
        public async Task<AuthPayload> LoginAsync(
            [UseFluentValidation, UseValidator(typeof(LoginInputValidator))] LoginInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] UserManager<User> userManager,
            [Service] SignInManager<User> signInManager,
            [Service] IHttpContextAccessor httpContextAccessor,
            CancellationToken cancellationToken) {
            if (signInManager.IsSignedIn(httpContextAccessor.HttpContext?.User)) {
                return new AuthPayload(new UserError("User is already signed in.", "SESSION_EXISTS"));
            }

            var user = await userManager.FindByEmailAsync(input.Email);
            if (user is null) return new AuthPayload(new UserError("Unable to find user.", "USER_NOT_FOUND"));

            var loginUser = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
            if (!loginUser.Succeeded) return new AuthPayload(new UserError("Invalid email address or password.", "BAD_USER_INPUT"));

            var session = await SessionManagement.CreateSession(user.Email!, context, cancellationToken);

            return new AuthPayload(user, session.Session, true);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<AuthPayload> LogoutAsync(
            [UseFluentValidation, UseValidator(typeof(LogoutInputValidator))] LogoutInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] SignInManager<User> signInManager,
            CancellationToken cancellationToken) {
            await SessionManagement.RemoveSession(input.SessionId, context, cancellationToken);
            await signInManager.SignOutAsync();
            return new AuthPayload(false);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<AuthPayload> RefreshSessionAsync(
            [ScopedService] ApplicationDbContext context,
            [Service] IHttpContextAccessor httpContextAccessor,
            CancellationToken cancellationToken) {
            var email = httpContextAccessor.HttpContext?.User.Identity?.Name;
            if (string.IsNullOrEmpty(email)) {
                httpContextAccessor.HttpContext?.Response.Cookies.Delete("SP_IDENTITY");
                return new AuthPayload(new UserError("Unable to find user.", "USER_NOT_FOUND"));
            }

            var session = await SessionManagement.CreateSession(email, context, cancellationToken);

            return new AuthPayload(session.User, session.Session, true);
        }
    }
}
