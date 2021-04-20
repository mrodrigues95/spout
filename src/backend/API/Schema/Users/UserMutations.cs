using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.Users {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class UserMutations {
        [UseApplicationDbContext]
        public async Task<CreateUserPayload> CreateUserAsync(
            CreateUserInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] UserManager<User> userManager,
            CancellationToken cancellationToken) {
            var user = new User {
                FirstName = input.FirstName,
                LastName = input.LastName,
                UserName = input.Email,
                Email = input.Email,
            };

            await userManager.CreateAsync(user, input.Password);

            await context.SaveChangesAsync(cancellationToken);

            return new CreateUserPayload(user);
        }
    }
}
