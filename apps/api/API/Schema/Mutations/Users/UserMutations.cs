using System;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data.Entities;
using API.Schema.Mutations.Users.Inputs;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;

namespace API.Schema.Mutations.Users {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class UserMutations {
        [Authorize]
        public async Task<User> UpdateUserAsync(
        UpdateUserInput input,
        ClaimsPrincipal userClaim,
        UserManager<User> userManager) {
            var user = await userManager.GetUserAsync(userClaim);

            user.Name = input.Name;
            user.Bio = input.Bio;
            user.UpdatedAt = DateTime.UtcNow;
            await userManager.UpdateAsync(user);

            return user;
        }
    }
}
