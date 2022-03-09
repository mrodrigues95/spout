using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Extensions;
using API.Schema.Mutations.Users.Inputs;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;

namespace API.Schema.Mutations.Users {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class UserMutations {
        [Authorize]
        [UseApplicationDbContext]
        public async Task<User> UpdateUserAsync(
        UpdateUserInput input,
        ClaimsPrincipal userClaim,
        [Service] UserManager<User> userManager,
        [ScopedService] ApplicationDbContext ctx,
        CancellationToken cancellationToken) {
            var user = await userManager.GetUserAsync(userClaim);

            user.Name = input.Name;
            user.Bio = input.Bio;
            user.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            return user;
        }
    }
}
