using System.Collections.Generic;
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

namespace API.Schema.Queries.Discussions {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class DiscussionQueries {
        [Authorize]
        [UseApplicationDbContext]
        public IQueryable<Discussion> GetDiscussions(
            [Service] ApplicationDbContext context)
            => context.Discussions.OrderBy(d => d.Id);

        [Authorize]
        [UseApplicationDbContext]
        public Task<Discussion> GetDiscussionByIdAsync(
            [ID(nameof(Discussion))] int id,
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken)
            => discussionById.LoadAsync(id, cancellationToken);

        [Authorize]
        [UseApplicationDbContext]
        public async Task<IEnumerable<Discussion>> GetDiscussionsByIdAsync(
            [ID(nameof(Discussion))] int[] ids,
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken)
            => await discussionById.LoadAsync(ids, cancellationToken);
    }
}
