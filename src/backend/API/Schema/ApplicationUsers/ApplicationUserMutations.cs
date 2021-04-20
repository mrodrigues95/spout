using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.ApplicationUsers {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ApplicationUserMutations {
        [UseApplicationDbContext]
        public async Task<AddApplicationUserPayload> AddApplicationUserAsync(
            AddApplicationUserInput input,
            [ScopedService] ApplicationDbContext context,
            [Service] UserManager<ApplicationUser> userManager,
            CancellationToken cancellationToken) {
            var user = new ApplicationUser {
                GUID = Guid.NewGuid(),
                FirstName = input.FirstName,
                LastName = input.LastName,
                UserName = input.Email,
                Email = input.Email,
            };

            await userManager.CreateAsync(user, input.Password);

            await context.SaveChangesAsync(cancellationToken);

            return new AddApplicationUserPayload(user);
        }
    }
}
