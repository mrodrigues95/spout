using API.Data.Entities;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace API.Schema.Services.Auth {
    [Authorize]
    [ExtendObjectType(OperationTypeNames.Query)]
    public class AuthQueries {
        public async Task<User?> GetMeAsync(
            [Service] UserManager<User> userManager,
            [Service] IHttpContextAccessor httpContextAccessor) =>
            await userManager.GetUserAsync(httpContextAccessor.HttpContext?.User);
    }
}
