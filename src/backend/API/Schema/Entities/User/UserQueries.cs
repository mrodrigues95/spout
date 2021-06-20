using API.Data;
using Entity = API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.AspNetCore.Authorization;

namespace API.Schema.Entities.User {
    [Authorize]
    [ExtendObjectType(OperationTypeNames.Query)]
    public class UserQueries {
        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.User>> GetUsersAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Users.ToListAsync(cancellationToken);

        [UseApplicationDbContext]
        public Task<Entity.User> GetUserByIdAsync(
            [ID(nameof(Entity.User))] int id,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken) =>
            userById.LoadAsync(id, cancellationToken);
    }
}
