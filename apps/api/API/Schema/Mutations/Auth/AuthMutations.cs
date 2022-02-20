using System.Threading;
using System.Threading.Tasks;
using API.Common.Enums;
using API.Data;
using API.Data.Entities;
using API.Extensions;
using API.Schema.Mutations.Auth.Exceptions;
using API.Schema.Mutations.Auth.Inputs;
using API.Schema.Mutations.Auth.Payloads;
using API.Schema.Mutations.Sessions.Common;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Enums = API.Common.Enums;

namespace API.Schema.Mutations.Auth {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class AuthMutations {
        private readonly ILogger<AuthMutations> _logger;

        public AuthMutations(ILogger<AuthMutations> logger) {
            _logger = logger;
        }

        [UseApplicationDbContext]
        [Error(typeof(SignUpNewUserException))]
        public async Task<AuthPayload> SignUpAsync(
            SignUpInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] UserManager<User> userManager,
            [Service] SignInManager<User> signInManager,
            CancellationToken cancellationToken) {
            if (await context.Users.AnyAsync(x => x.Email == input.Email || x.UserName == input.Email)) {
                _logger.LogWarning("Email already exists.", input.Email);
                throw new SignUpNewUserException();
            }

            var user = new User {
                Name = input.Name,
                UserName = input.Email,
                Email = input.Email,
                ProfileColor = RandomEnum.Of<UserProfileColor>(),
                StateId = (int)Enums.State.Active
            };

            var createUser = await userManager.CreateAsync(user, input.Password);
            if (!createUser.Succeeded) {
                _logger.LogError("Unable to create new user.", createUser, user);
                throw new SignUpNewUserException();
            }

            var loginUser = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
            if (!loginUser.Succeeded) {
                _logger.LogError("Unable to sign in user.", loginUser, user);
                throw new SignUpNewUserException();
            }

            var session = await SessionManagement.CreateSession(user.Id, context, cancellationToken);
            if (session is null) {
                _logger.LogError("Unable to refresh session.", user);
                throw new SignUpNewUserException();
            }

            return new AuthPayload(user, session.Session!, true);
        }

        [UseApplicationDbContext]
        [Error(typeof(LoginUserException))]
        public async Task<AuthPayload> LoginAsync(
            LoginInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] UserManager<User> userManager,
            [Service] SignInManager<User> signInManager,
            [Service] IHttpContextAccessor httpContextAccessor,
            CancellationToken cancellationToken) {
            if (signInManager.IsSignedIn(httpContextAccessor.HttpContext?.User)) {
                _logger.LogWarning("User is already signed in.",
                    httpContextAccessor.HttpContext?.User);
                throw new LoginUserException();
            }

            var user = await userManager.FindByEmailAsync(input.Email);
            if (user is null) {
                throw new LoginUserException();
            }

            var loginUser = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
            if (!loginUser.Succeeded) {
                throw new LoginUserException();
            }

            var session = await SessionManagement.CreateSession(user.Id, context, cancellationToken);
            if (session is null) {
                _logger.LogError("Unable to refresh session.", user);
                throw new LoginUserException();
            }

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
