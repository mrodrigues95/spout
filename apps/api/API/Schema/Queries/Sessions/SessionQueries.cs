using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace API.Schema.Queries.Sessions {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class SessionQueries {
        [Authorize]
        [UseFiltering]
        public IQueryable<Session> GetSessions(
            ApplicationDbContext ctx)
            => ctx.Sessions;

        [Authorize]
        public Task<Session> GetSessionByIdAsync(
            [ID(nameof(Session))] int id,
            SessionByIdDataLoader sessionById,
            CancellationToken cancellationToken)
            => sessionById.LoadAsync(id, cancellationToken);
    }
}
