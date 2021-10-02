using API.Data;
using API.Data.Entities;
using GreenDonut;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.Queries.Discussions {
    public class DiscussionByIdDataLoader : BatchDataLoader<int, Discussion> {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public DiscussionByIdDataLoader(
            IDbContextFactory<ApplicationDbContext> dbContextFactory,
            IBatchScheduler batchScheduler,
            DataLoaderOptions options)
            : base(batchScheduler, options) {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<int, Discussion>> LoadBatchAsync(
            IReadOnlyList<int> keys,
            CancellationToken cancellationToken) {
            await using ApplicationDbContext dbContext =
                _dbContextFactory.CreateDbContext();

            return await dbContext.Discussions
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
