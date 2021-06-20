using Entity = API.Data.Entities;
using HotChocolate.DataLoader;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using GreenDonut;
using System.Threading;

namespace API.Schema.Entities.Session {
    public class SessionByIdDataLoader : BatchDataLoader<Guid, Entity.Session> {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public SessionByIdDataLoader(
            IBatchScheduler batchScheduler,
            IDbContextFactory<ApplicationDbContext> dbContextFactory)
            : base(batchScheduler) {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<Guid, Entity.Session>> LoadBatchAsync(
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
