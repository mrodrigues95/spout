using API.Data;
using API.Extensions;
using API.Data.Entities;
using Enums = API.Common.Enums;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using API.Schema.Common;
using HotChocolate.AspNetCore.Authorization;
using API.Schema.Mutations.Sessions.Common;
using API.Common.Enums;
using API.Schema.Types.Users;

namespace API.Schema.Mutations.Auth {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class AuthMutations {
        [UseApplicationDbContext]
        public async Task<AuthPayload> SignUpAsync(
            SignUpInput input,
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
                ProfileColor = RandomEnum.Of<UserProfileColor>(),
                StateId = (int) Enums.State.Active
            };

            var createUser = await userManager.CreateAsync(user, input.Password);
            if (!createUser.Succeeded) return new AuthPayload(new UserError("Unable to create new user.", "INVALID_USER"));

            var loginUser = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
            if (!loginUser.Succeeded) return new AuthPayload(new UserError("Unable to sign in user.", "INVALID_USER"));

            var session = await SessionManagement.CreateSession(user.Id, context, cancellationToken);
            if (session is null) return new AuthPayload(new UserError("Unable to refresh session", "SESSION_PROBLEM"));

            return new AuthPayload(user, session.Session!, true);
        }

        [UseApplicationDbContext]
        public async Task<AuthPayload> LoginAsync(
            LoginInput input,
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

            var session = await SessionManagement.CreateSession(user.Id, context, cancellationToken);
            if (session is null) return new AuthPayload(new UserError("Unable to refresh session", "SESSION_PROBLEM"));

            return new AuthPayload(user, session.Session, true);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<AuthPayload> LogoutAsync(
            LogoutInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] SignInManager<User> signInManager,
            CancellationToken cancellationToken) {
            await SessionManagement.RemoveSession(input.SessionId, context, cancellationToken);
            await signInManager.SignOutAsync();
            return new AuthPayload(false);
        }
    }
}
