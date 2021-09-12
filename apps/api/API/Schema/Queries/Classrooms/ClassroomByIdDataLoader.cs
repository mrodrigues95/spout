using API.Data;
using API.Data.Entities;
using GreenDonut;
using HotChocolate.DataLoader;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.Queries.Classrooms {
    public class ClassroomByIdDataLoader : BatchDataLoader<int, Classroom> {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public ClassroomByIdDataLoader(
            IBatchScheduler batchScheduler,
            IDbContextFactory<ApplicationDbContext> dbContextFactory)
            : base(batchScheduler) {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<int, Classroom>> LoadBatchAsync(
            IReadOnlyList<int> keys,
            CancellationToken cancellationToken) {
            await using ApplicationDbContext dbContext =
                _dbContextFactory.CreateDbContext();

            return await dbContext.Classrooms
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
