using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace API.Schema.Queries.ClassroomInvites {
    public class ClassroomInviteByIdDataLoader
        : BatchDataLoader<int, ClassroomInvite> {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public ClassroomInviteByIdDataLoader(
            IDbContextFactory<ApplicationDbContext> dbContextFactory,
            IBatchScheduler batchScheduler,
            DataLoaderOptions options)
            : base(batchScheduler, options) {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<int, ClassroomInvite>> LoadBatchAsync(
            IReadOnlyList<int> keys,
            CancellationToken cancellationToken) {
            await using ApplicationDbContext dbContext =
                _dbContextFactory.CreateDbContext();

            return await dbContext.ClassroomInvites
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
