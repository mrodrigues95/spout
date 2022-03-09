using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using API.Common.Enums;
using API.Data;
using API.Data.Entities;
using API.Extensions;
using API.Schema.Mutations.Auth.Exceptions;
using API.Schema.Mutations.Auth.Inputs;
using API.Schema.Mutations.Auth.Payloads;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
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
            [ScopedService] ApplicationDbContext ctx,
            [Service] UserManager<User> userManager,
            [Service] SignInManager<User> signInManager,
            CancellationToken cancellationToken) {
            if (await ctx.Users.AnyAsync(x =>
                x.Email == input.Email || x.UserName == input.Email)) {
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

            var loginUser = await signInManager.PasswordSignInAsync(user,
                input.Password, true, false);
            if (!loginUser.Succeeded) {
                _logger.LogError("Unable to sign in user.", loginUser, user);
                throw new SignUpNewUserException();
            }

            var session = await CreateSessionAsync(user, ctx, cancellationToken);
            if (session is null) {
                _logger.LogError("Unable to refresh session.", user);
                throw new SignUpNewUserException();
            }

            return new AuthPayload(user, session, true);
        }

        [UseApplicationDbContext]
        [Error(typeof(LoginUserException))]
        public async Task<AuthPayload> LoginAsync(
            LoginInput input,
            [ScopedService] ApplicationDbContext ctx,
            [Service] UserManager<User> userManager,
            [Service] SignInManager<User> signInManager,
            CancellationToken cancellationToken) {
            var user = await userManager.FindByEmailAsync(input.Email);
            if (user is null) {
                throw new LoginUserException();
            }

            var loginUser = await signInManager.PasswordSignInAsync(user,
                input.Password, true, false);
            if (!loginUser.Succeeded) {
                throw new LoginUserException();
            }

            var session = await CreateSessionAsync(user, ctx, cancellationToken);
            if (session is null) {
                _logger.LogError("Unable to refresh session.", user);
                throw new LoginUserException();
            }

            return new AuthPayload(user, session, true);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<AuthPayload> LogoutAsync(
            LogoutInput input,
            [ScopedService] ApplicationDbContext ctx,
            [Service] SignInManager<User> signInManager,
            CancellationToken cancellationToken) {
            await signInManager.SignOutAsync();

            var session = new Session { Id = input.SessionId };
            ctx.Sessions.Remove(session);
            await ctx.SaveChangesAsync(cancellationToken);

            return new AuthPayload(false);
        }

        [Authorize]
        [UseApplicationDbContext]
        [Error(typeof(UserNotFoundException))]
        [Error(typeof(IncorrectCurrentPasswordException))]
        [Error(typeof(SessionExpiredException))]
        [Error(typeof(SessionNotFoundException))]
        public async Task<AuthPayload> ChangePasswordAsync(
            ChangePasswordInput input,
            ClaimsPrincipal userClaim,
            [ScopedService] ApplicationDbContext ctx,
            [Service] UserManager<User> userManager,
            CancellationToken cancellationToken) {
            var user = await userManager.GetUserAsync(userClaim);
            if (user is null) throw new UserNotFoundException();

            var session = await ctx.Sessions.SingleOrDefaultAsync(x =>
                x.Id == input.SessionId
                && x.UserId == user.Id, cancellationToken);
            if (session is null) throw new SessionNotFoundException();
            if (session.ExpiresAt < DateTime.UtcNow) throw new SessionExpiredException();

            var result = await userManager.ChangePasswordAsync(
                user, input.CurrentPassword, input.NewPassword);
            if (!result.Succeeded) throw new IncorrectCurrentPasswordException();

            // Invalidate all other sessions.
            ctx.Sessions.RemoveRange(ctx.Sessions.Where(x => x.Id != session.Id));
            user.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            // TODO: Send an email.
            return new AuthPayload(user, session, true);
        }

        [Authorize]
        [UseApplicationDbContext]
        [Error(typeof(SessionNotFoundException))]
        public async Task<AuthPayload> RefreshSessionAsync(
            RefreshSessionInput input,
            ClaimsPrincipal userClaim,
            [ScopedService] ApplicationDbContext ctx,
            [Service] UserManager<User> userManager,
            CancellationToken cancellationToken) {
            var session = await ctx.Sessions.FindAsync(
                new object[] { input.SessionId },
                cancellationToken);
            if (session is null) throw new SessionNotFoundException();

            session.ExpiresAt = DateTime.UtcNow.AddDays(7);
            session.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            var user = await userManager.GetUserAsync(userClaim);
            return new AuthPayload(user, session, true);
        }

        private async Task<Session> CreateSessionAsync(
            User user,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var session = new Session {
                UpdatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                UserId = user.Id
            };

            ctx.Sessions.Add(session);
            await ctx.SaveChangesAsync(cancellationToken);

            return session;
        }
    }
}
