using API.Extensions;
using Entity = API.Data.Entities;
using HotChocolate.Types;
using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate;
using API.Data;
using System.Threading;
using HotChocolate.Types.Relay;
using System.Linq;
using HotChocolate.AspNetCore.Authorization;

namespace API.Schema.Entities.Discussion {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class DiscussionQueries {
        [Authorize]
        [UseApplicationDbContext]
        [UsePaging]
        public IQueryable<Entity.Discussion> GetDiscussions(
            [ScopedService] ApplicationDbContext context) =>
            context.Discussions.OrderBy(d => d.Id);

        [Authorize]
        [UseApplicationDbContext]
        public Task<Entity.Discussion> GetDiscussionByIdAsync(
            [ID(nameof(Entity.Discussion))] int id,
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken) =>
            discussionById.LoadAsync(id, cancellationToken);

        [Authorize]
        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.Discussion>> GetDiscussionsByIdAsync(
            [ID(nameof(Entity.Discussion))] int[] ids,
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken) =>
            await discussionById.LoadAsync(ids, cancellationToken);
    }
}
