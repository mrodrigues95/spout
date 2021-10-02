using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using GreenDonut;
using System.Threading;

namespace API.Schema.Queries.Sessions {
    public class SessionByIdDataLoader : BatchDataLoader<Guid, Session> {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public SessionByIdDataLoader(
            IDbContextFactory<ApplicationDbContext> dbContextFactory,
            IBatchScheduler batchScheduler,
            DataLoaderOptions options)
            : base(batchScheduler, options) {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<Guid, Session>> LoadBatchAsync(
            IReadOnlyList<Guid> keys,
            CancellationToken cancellationToken) {
            await using ApplicationDbContext dbContext =
                _dbContextFactory.CreateDbContext();

            return await dbContext.Sessions
                .Where(au => keys.Contains(au.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
