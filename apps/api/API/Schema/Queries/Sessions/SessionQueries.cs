using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace API.Schema.Queries.Sessions {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class SessionQueries {
        [Authorize]
        [UseApplicationDbContext]
        public IQueryable<Session> GetSessions(
            [ScopedService] ApplicationDbContext ctx)
            => ctx.Sessions;

        [Authorize]
        [UseApplicationDbContext]
        public Task<Session> GetSessionByIdAsync(
            [ID(nameof(Session))] Guid id,
            SessionByIdDataLoader sessionById,
            CancellationToken cancellationToken) =>
            sessionById.LoadAsync(id, cancellationToken);
    }
}
