using API.Data.Entities;
using HotChocolate.Types;
using System;
using System.Threading.Tasks;
using API.Extensions;
using HotChocolate;
using API.Data;
using System.Threading;
using HotChocolate.Types.Relay;
using HotChocolate.AspNetCore.Authorization;
using System.Linq;

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
