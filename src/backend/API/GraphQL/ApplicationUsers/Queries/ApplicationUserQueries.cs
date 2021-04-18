using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace API.GraphQL.ApplicationUsers {
    [ExtendObjectType("Query")]
    public class ApplicationUserQueries {
        [UseApplicationDbContext]
        public Task<List<ApplicationUser>> GetApplicationUsers([ScopedService] ApplicationDbContext context) =>
            context.ApplicationUsers.ToListAsync();

        public Task<ApplicationUser> GetApplicationUserByIdAsync(
            [ID(nameof(ApplicationUser))] string id,
            ApplicationUserByIdDataLoader dataLoader,
            CancellationToken cancellationToken) =>
            dataLoader.LoadAsync(id, cancellationToken);
    }
}
