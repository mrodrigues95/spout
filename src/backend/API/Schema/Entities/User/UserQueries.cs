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
        public Task<List<Entity.User>> GetUsers([ScopedService] ApplicationDbContext context) =>
            context.Users.ToListAsync();

        [UseApplicationDbContext]
        public Task<Entity.User> GetUserByIdAsync(
            [ID(nameof(Entity.User))] int id,
            UserByIdDataLoader dataLoader,
            CancellationToken cancellationToken) =>
            dataLoader.LoadAsync(id, cancellationToken);
    }
}
