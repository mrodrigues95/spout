using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Attributes;
using API.Data;
using API.Data.Entities;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;

namespace API.Schema.Queries.Users {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class UserQueries {
        public async Task<User?> GetMeAsync(
            [GlobalUserId] int? userId,
            ApplicationDbContext context,
            CancellationToken cancellationToken) {
            if (userId is null) return null;

            return await context.Users.Where(
                x => x.Id == userId).SingleOrDefaultAsync(cancellationToken);
        }

        [Authorize]
        public async Task<IEnumerable<User>> GetUsersAsync(
            ApplicationDbContext context,
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
