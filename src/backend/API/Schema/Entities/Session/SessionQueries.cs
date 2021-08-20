using Entity = API.Data.Entities;
using HotChocolate.Types;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Extensions;
using HotChocolate;
using API.Data;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using HotChocolate.Types.Relay;
using HotChocolate.AspNetCore.Authorization;

namespace API.Schema.Entities.Session {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class SessionQueries {
        [Authorize]
        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.Session>> GetSessionsAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Sessions.ToListAsync(cancellationToken);

        [Authorize]
        [UseApplicationDbContext]
        public Task<Entity.Session> GetSessionByIdAsync(
            [ID(nameof(Entity.Session))] Guid id,
            SessionByIdDataLoader sessionById,
            CancellationToken cancellationToken) =>
            sessionById.LoadAsync(id, cancellationToken);
    }
}
