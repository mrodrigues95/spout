using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace API.Schema.Queries.Classrooms {
    public class ClassroomByIdDataLoader : BatchDataLoader<int, Classroom> {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public ClassroomByIdDataLoader(
            IDbContextFactory<ApplicationDbContext> dbContextFactory,
            IBatchScheduler batchScheduler,
            DataLoaderOptions options)
            : base(batchScheduler, options) {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<int, Classroom>> LoadBatchAsync(
            IReadOnlyList<int> keys,
            CancellationToken cancellationToken) {
            await using ApplicationDbContext dbContext =
                _dbContextFactory.CreateDbContext();

            return await dbContext.Classrooms
                .Where(x => keys.Contains(x.Id))
                .ToDictionaryAsync(x => x.Id, cancellationToken);
        }
    }
}
