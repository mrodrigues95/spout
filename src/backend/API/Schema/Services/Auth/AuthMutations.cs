using API.Data;
using API.Extensions;
using API.Data.Entities;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HotChocolate.Execution;
using AppAny.HotChocolate.FluentValidation;
using FairyBread;

namespace API.Schema.Services.Auth {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class AuthMutations {
        [UseApplicationDbContext]
        public async Task<AuthPayload> RegisterUserAsync(
            [Validate] RegisterUserInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] UserManager<User> userManager,
            [Service] SignInManager<User> signInManager,
            CancellationToken cancellationToken) {
            if (await context.Users.AnyAsync(x => x.Email == input.Email || x.UserName == input.Email)) {
                throw new QueryException("Email already exists.");
            }

            var user = new User {
                FirstName = input.FirstName,
                LastName = input.LastName,
                UserName = input.Email,
                Email = input.Email,
            };

            var createUser = await userManager.CreateAsync(user, input.Password);
            if (!createUser.Succeeded) throw new QueryException("Unable to create new user.");

            await context.SaveChangesAsync(cancellationToken);

            var loginUser = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
            if (!loginUser.Succeeded) throw new QueryException("Unable to sign in user.");

            return new AuthPayload(user, true);
        }

        public async Task<AuthPayload> LoginUserAsync(
            LoginUserInput input,
            [Service] UserManager<User> userManager,
            [Service] SignInManager<User> signInManager) {
            var user = await userManager.FindByEmailAsync(input.Email);
            if (user is null) throw new QueryException("Unable to find user.");

            var loginUser = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
            if (!loginUser.Succeeded) throw new QueryException("Unable to sign in user.");

            return new AuthPayload(user, true);
        }

        public async Task<AuthPayload> LogoutUserAsync(
            [Service] SignInManager<User> signInManager) {
            await signInManager.SignOutAsync();
            return new AuthPayload(null, false);
        }
    }
}
