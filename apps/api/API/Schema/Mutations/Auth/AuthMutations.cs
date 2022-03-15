using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using API.Attributes;
using API.Common.Enums;
using API.Data;
using API.Data.Entities;
using API.Infrastructure;
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
    // TODO: Create Postmark email templates for some of the resolvers below.
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class AuthMutations {
        private readonly ILogger<AuthMutations> _logger;
        private readonly string _appUrl;

        public AuthMutations(ILogger<AuthMutations> logger) {
            _logger = logger;
            _appUrl = Environment.GetEnvironmentVariable("APP_URL") ??
                throw new ArgumentNullException(nameof(Environment));
        }

        [Error(typeof(SignUpNewUserException))]
        public async Task<AuthPayload> SignUpAsync(
            SignUpInput input,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            ISessionManager sessionManager,
            IEmailSender emailSender,
            CancellationToken cancellationToken) {
            var emailAlreadyExists = await userManager.FindByEmailAsync(input.Email);
            if (emailAlreadyExists is not null) throw new SignUpNewUserException();

            var user = new User {
                Name = input.Name,
                Email = input.Email,
                ProfileColor = RandomEnum.Of<UserProfileColor>(),
                StateId = (int)Enums.State.Active
            };

            var createUser = await userManager.CreateAsync(user, input.Password);
            if (!createUser.Succeeded) {
                _logger.LogError("Unable to create new user for {user}. Result: {result}",
                    user, createUser);
                throw new SignUpNewUserException();
            }

            var loginUser = await signInManager.PasswordSignInAsync(user,
                input.Password, true, false);
            if (!loginUser.Succeeded) {
                _logger.LogError("Unable to sign in user for {user}. Result: {result}",
                    user, loginUser);
                throw new SignUpNewUserException();
            }

            var session = await sessionManager.CreateAsync(user, cancellationToken);
            if (session is null) {
                _logger.LogError("Unable to refresh session.", user);
                throw new SignUpNewUserException();
            }

            //var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            //await emailSender.SendEmailAsync(
            //    toEmail: user.Email!,
            //    subject: "Verify Email Address for Spout",
            //    message: $"There's one quick step you need to complete in order to verify " +
            //        "your email address. Click this link to continue: " +
            //        $"{_appUrl}/auth/verify?token={HttpUtility.UrlEncode(token)}",
            //    tag: "Email Verification");

            return new AuthPayload(user, session, true);
        }

        [Error(typeof(LoginUserException))]
        public async Task<AuthPayload> LoginAsync(
            LoginInput input,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            ISessionManager sessionManager,
            IEmailSender emailSender,
            CancellationToken cancellationToken) {
            var user = await userManager.FindByEmailAsync(input.Email);
            if (user is null) throw new LoginUserException();


            var loginUser = await signInManager.PasswordSignInAsync(user,
                input.Password, true, false);
            if (!loginUser.Succeeded) throw new LoginUserException();

            var session = await sessionManager.CreateAsync(user, cancellationToken);
            if (session is null) {
                _logger.LogError("Unable to refresh session.", user);
                throw new LoginUserException();
            }

            var isVerifiedUser = await userManager.IsEmailConfirmedAsync(user);
            if (!isVerifiedUser) {
                //var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                //await emailSender.SendEmailAsync(
                //    toEmail: user.Email!,
                //    subject: "Verify Email Address for Spout",
                //    message: $"There's one quick step you need to complete in order to verify " +
                //        "your email address. Click this link to continue: " +
                //        $"{_appUrl}/auth/verify?token={HttpUtility.UrlEncode(token)}",
                //    tag: "Email Verification");
            }

            return new AuthPayload(user, session, true);
        }

        [Authorize]
        public async Task<AuthPayload> LogoutAsync(
            LogoutInput input,
            ApplicationDbContext ctx,
            SignInManager<User> signInManager,
            CancellationToken cancellationToken) {
            await signInManager.SignOutAsync();

            var session = new Session { Id = input.SessionId };
            ctx.Sessions.Remove(session);
            await ctx.SaveChangesAsync(cancellationToken);

            return new AuthPayload(false);
        }

        [Authorize]
        [Error(typeof(UserNotFoundException))]
        [Error(typeof(IncorrectCurrentPasswordException))]
        [Error(typeof(SessionExpiredException))]
        public async Task<AuthPayload> ChangePasswordAsync(
            ChangePasswordInput input,
            ClaimsPrincipal userClaim,
            UserManager<User> userManager,
            ISessionManager sessionManager,
            IEmailSender emailSender,
            CancellationToken cancellationToken) {
            var user = await userManager.GetUserAsync(userClaim);
            if (user is null) throw new UserNotFoundException();

            var session = await sessionManager.ValidateAsync(input.SessionId,
                user, cancellationToken);
            if (session is null) throw new SessionExpiredException();

            var result = await userManager.ChangePasswordAsync(
                user, input.CurrentPassword, input.NewPassword);
            if (!result.Succeeded) throw new IncorrectCurrentPasswordException();

            await sessionManager.InvalidateExceptForAsync(session.Id, cancellationToken);

            user.UpdatedAt = DateTime.UtcNow;
            await userManager.UpdateAsync(user);

            //await emailSender.SendEmailAsync(
            //    toEmail: user.Email!,
            //    subject: "Spout Password Changed",
            //    message: "We noticed the password for your Spout account was recently changed. " +
            //        "If this was you, then you can safely disregard this email. Otherwise, " +
            //        "your account may be compromised. " +
            //        "Please follow this link to reset your password: __",
            //    tag: "Email Changes");

            return new AuthPayload(user, session, true);
        }

        [Authorize]
        [Error(typeof(UserNotFoundException))]
        [Error(typeof(EmailAlreadyVerifiedException))]
        public async Task<AuthPayload> GenerateEmailVerificationTokenAsync(
            [GlobalUserEmail] string userEmail,
            UserManager<User> userManager,
            IEmailSender emailSender) {
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user is null) throw new UserNotFoundException();

            var isAlreadyVerified = await userManager.IsEmailConfirmedAsync(user);
            if (isAlreadyVerified) throw new EmailAlreadyVerifiedException(user.Email!);

            //var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            //await emailSender.SendEmailAsync(
            //    toEmail: user.Email!,
            //    subject: "Verify Email Address for Spout",
            //    message: $"There's one quick step you need to complete in order to verify " +
            //        "your email address. Click this link to continue: " +
            //        $"{_appUrl}/auth/verify?token={HttpUtility.UrlEncode(token)}",
            //    tag: "Email Verification");

            return new AuthPayload(user, true);
        }

        [Authorize]
        [Error(typeof(UserNotFoundException))]
        [Error(typeof(EmailAlreadyVerifiedException))]
        [Error(typeof(InvalidTokenException))]
        public async Task<AuthPayload> VerifyEmailAsync(
            [GlobalUserEmail] string userEmail,
            VerifyEmailInput input,
            UserManager<User> userManager,
            IEmailSender emailSender) {
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user is null) throw new UserNotFoundException();

            var isAlreadyVerified = await userManager.IsEmailConfirmedAsync(user);
            if (isAlreadyVerified) throw new EmailAlreadyVerifiedException(user.Email!);

            var result = await userManager.ConfirmEmailAsync(user, input.Token);
            if (!result.Succeeded) throw new InvalidTokenException(input.Token);

            //await emailSender.SendEmailAsync(
            //    toEmail: user.Email!,
            //    subject: "Spout Account Verified!",
            //    message: "Your Spout account has successfully been verified.",
            //    tag: "Email Verification");

            return new AuthPayload(user, true);
        }

        [Authorize]
        [Error(typeof(UserNotFoundException))]
        [Error(typeof(IncorrectCurrentPasswordException))]
        [Error(typeof(EmailAlreadyRegisteredException))]
        [Error(typeof(EmailNotVerifiedException))]
        public async Task<AuthPayload> GenerateChangeEmailTokenAsync(
            [GlobalUserEmail] string userEmail,
            GenerateChangeEmailTokenInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken,
            UserManager<User> userManager,
            IEmailSender emailSender) {
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user is null) throw new UserNotFoundException();

            var isVerifiedEmail = await userManager.IsEmailConfirmedAsync(user);
            if (!isVerifiedEmail) throw new EmailNotVerifiedException(userEmail);

            var emailAlreadyRegistered = await userManager.FindByEmailAsync(input.NewEmail);
            if (emailAlreadyRegistered != null) {
                throw new EmailAlreadyRegisteredException(input.NewEmail);
            }

            var isValidPassword = await userManager.CheckPasswordAsync(user, input.Password);
            if (!isValidPassword) throw new IncorrectCurrentPasswordException();

            var token = await userManager.GenerateChangeEmailTokenAsync(user, input.NewEmail);

            // The expiry date is primarily tracked by Identity but we also keep it in the
            // database for logging.
            var emailChange = new UserEmailChange {
                UserId = user.Id,
                Token = token,
                TokenEncoded = HttpUtility.UrlEncode(token),
                NewEmail = input.NewEmail,
                ExpiresAt = DateTime.UtcNow.AddDays(1)
            };
            ctx.UserEmailChanges.Add(emailChange);
            await ctx.SaveChangesAsync(cancellationToken);

            //await emailSender.SendEmailAsync(
            //    toEmail: input.NewEmail,
            //    subject: "Change Email Address for Spout",
            //    message: $"There's one quick step you need to complete in order to change " +
            //        "your email address. Click this link to continue: " +
            //        $"{_appUrl}/auth/change-email?token={HttpUtility.UrlEncode(token)}",
            //    tag: "Email Changes");

            return new AuthPayload(user, true);
        }

        [Authorize]
        [Error(typeof(UserNotFoundException))]
        [Error(typeof(InvalidTokenException))]
        [Error(typeof(SessionExpiredException))]
        public async Task<AuthPayload> ChangeEmailAsync(
            [GlobalUserEmail] string userEmail,
            ChangeEmailInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IEmailSender emailSender,
            ISessionManager sessionManager) {
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user is null) throw new UserNotFoundException();

            var session = await sessionManager.ValidateAsync(input.SessionId,
                user, cancellationToken);
            if (session is null) throw new SessionExpiredException();

            var emailChange = await ctx.UserEmailChanges.SingleOrDefaultAsync(x =>
                x.Token == input.Token
                && x.UserId == user.Id, cancellationToken);
            if (emailChange is null) throw new InvalidTokenException(input.Token);

            var currentEmail = user.Email;
            var result = await userManager.ChangeEmailAsync(user,
                emailChange.NewEmail, emailChange.Token);

            // This means the token is expired or the email is already registered.
            if (!result.Succeeded) {
                ctx.UserEmailChanges.Remove(emailChange);
                await ctx.SaveChangesAsync(cancellationToken);
                throw new InvalidTokenException(input.Token);
            }

            // Send an email to the old email address notifying of an email change.
            //await emailSender.SendEmailAsync(
            //    toEmail: currentEmail!,
            //    subject: "Spout Email Address Changed",
            //    message: "Your email address has successfully been changed. " +                    
            //       "If this wasn't you, please contact __ immediately.",
            //    tag: "Email Changes");

            await sessionManager.InvalidateExceptForAsync(session.Id, cancellationToken);

            ctx.UserEmailChanges.Remove(emailChange);
            user.UpdatedAt = DateTime.UtcNow;
            user.UserName = emailChange.NewEmail;
            await userManager.UpdateAsync(user);
            await userManager.UpdateNormalizedUserNameAsync(user);
            await ctx.SaveChangesAsync(cancellationToken);

            // The application cookie needs to be refreshed so that the user claims contain
            // the new email.
            await signInManager.RefreshSignInAsync(user);

            return new AuthPayload(user, session, true);
        }

        [Authorize]
        [Error(typeof(SessionNotFoundException))]
        public async Task<AuthPayload> RefreshSessionAsync(
            RefreshSessionInput input,
            ClaimsPrincipal userClaim,
            UserManager<User> userManager,
            ISessionManager sessionManager,
            CancellationToken cancellationToken) {
            var session = await sessionManager.RefreshAsync(input.SessionId, cancellationToken);
            if (session is null) throw new SessionNotFoundException();

            var user = await userManager.GetUserAsync(userClaim);
            return new AuthPayload(user, session, true);
        }
    }
}
