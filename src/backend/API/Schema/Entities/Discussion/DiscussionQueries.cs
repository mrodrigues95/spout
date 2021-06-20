using API.Extensions;
using Entity = API.Data.Entities;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate;
using API.Data;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using HotChocolate.Types.Relay;

namespace API.Schema.Entities.Discussion {
    [Authorize]
    [ExtendObjectType(OperationTypeNames.Query)]
    public class DiscussionQueries {
        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.Discussion>> GetDiscussionsAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Discussions.ToListAsync(cancellationToken);

        [UseApplicationDbContext]
        public Task<Entity.Discussion> GetDiscussionByIdAsync(
            [ID(nameof(Entity.Discussion))] int id,
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken) =>
            discussionById.LoadAsync(id, cancellationToken);

        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.Discussion>> GetDiscussionsByIdAsync(
            [ID(nameof(Entity.Discussion))] int[] ids,
            DiscussionByIdDataLoader discussionById,
            CancellationToken cancellationToken) =>
            await discussionById.LoadAsync(ids, cancellationToken);
    }
}
