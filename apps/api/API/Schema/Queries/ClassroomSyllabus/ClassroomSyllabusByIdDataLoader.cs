using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using GreenDonut;
using Microsoft.EntityFrameworkCore;
using Entities = API.Data.Entities;

namespace API.Schema.Queries.ClassroomSyllabus {
    public class ClassroomSyllabusByIdDataLoader
        : BatchDataLoader<int, Entities.ClassroomSyllabus> {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public ClassroomSyllabusByIdDataLoader(
            IDbContextFactory<ApplicationDbContext> dbContextFactory,
            IBatchScheduler batchScheduler,
            DataLoaderOptions options)
            : base(batchScheduler, options) {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<int, Entities.ClassroomSyllabus>> LoadBatchAsync(
            IReadOnlyList<int> keys,
            CancellationToken cancellationToken) {
            await using ApplicationDbContext dbContext =
                _dbContextFactory.CreateDbContext();

            return await dbContext.ClassroomSyllabus
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
