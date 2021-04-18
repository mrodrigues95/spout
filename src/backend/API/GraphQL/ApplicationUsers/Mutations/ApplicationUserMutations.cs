using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace API.GraphQL.ApplicationUsers {
    [ExtendObjectType("Mutation")]
    public class ApplicationUserMutations {
        [UseApplicationDbContext]
        public async Task<AddApplicationUserPayload> AddApplicationUserAsync(
            AddApplicationUserInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] UserManager<ApplicationUser> userManager,
            CancellationToken cancellationToken) {
            var user = new ApplicationUser {
                Name = input.Name,
                UserName = input.Email,
                Email = input.Email,
            };

            await userManager.CreateAsync(user, input.Password);

            context.ApplicationUsers.Add(user);
            await context.SaveChangesAsync(cancellationToken);

            return new AddApplicationUserPayload(user);
        }
    }
}
