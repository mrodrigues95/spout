using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace API.Schema.Queries.Discussions {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class DiscussionQueries {
        [Authorize]
        public IQueryable<Discussion> GetDiscussions(
            ApplicationDbContext context)
            => context.Discussions.OrderBy(d => d.Id);

        [Authorize]
        public Task<Discussion> GetDiscussionByIdAsync(
            [ID(nameof(Discussion))] int id,
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken)
            => discussionById.LoadAsync(id, cancellationToken);

        [Authorize]
        public async Task<IEnumerable<Discussion>> GetDiscussionsByIdAsync(
            [ID(nameof(Discussion))] int[] ids,
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken)
            => await discussionById.LoadAsync(ids, cancellationToken);
    }
}
