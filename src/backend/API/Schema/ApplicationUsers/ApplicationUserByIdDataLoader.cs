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

namespace API.Schema.ApplicationUsers {
    public class ApplicationUserByIdDataLoader : BatchDataLoader<int, ApplicationUser> {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public ApplicationUserByIdDataLoader(
            IBatchScheduler batchScheduler,
            IDbContextFactory<ApplicationDbContext> dbContextFactory)
            : base(batchScheduler) {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<int, ApplicationUser>> LoadBatchAsync(
            IReadOnlyList<int> keys,
            CancellationToken cancellationToken) {
            await using ApplicationDbContext dbContext =
                _dbContextFactory.CreateDbContext();

            return await dbContext.ApplicationUsers
                .Where(au => keys.Contains(au.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
