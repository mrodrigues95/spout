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
using System.Linq;
using HotChocolate.AspNetCore.Authorization;

namespace API.Schema.Queries.Users {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class UserQueries {
        [UseApplicationDbContext]
        public async Task<User?> GetMeAsync(
            [GlobalState] int? userId,
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) {
            if (userId is null) return null;
            return await context.Users.Where(x => x.Id == userId).SingleOrDefaultAsync(cancellationToken);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<IEnumerable<User>> GetUsersAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Users.ToListAsync(cancellationToken);

        [Authorize]
        public Task<User> GetUserByIdAsync(
            [ID(nameof(User))] int id,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken) =>
            userById.LoadAsync(id, cancellationToken);
    }
}
