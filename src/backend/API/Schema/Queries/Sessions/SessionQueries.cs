using API.Data.Entities;
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

namespace API.Schema.Queries.Sessions {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class SessionQueries {
        [Authorize]
        [UseApplicationDbContext]
        public async Task<IEnumerable<Session>> GetSessionsAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Sessions.ToListAsync(cancellationToken);

        [Authorize]
        [UseApplicationDbContext]
        public Task<Session> GetSessionByIdAsync(
            [ID(nameof(Session))] Guid id,
            SessionByIdDataLoader sessionById,
            CancellationToken cancellationToken) =>
            sessionById.LoadAsync(id, cancellationToken);
    }
}
