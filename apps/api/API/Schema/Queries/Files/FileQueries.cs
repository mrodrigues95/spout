using API.Extensions;
using API.Data.Entities;
using HotChocolate.Types;
using HotChocolate;
using API.Data;
using System.Linq;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;

namespace API.Schema.Queries.Files {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class FileQueries {
        [Authorize]
        [UseApplicationDbContext]
        [UsePaging(MaxPageSize = 50)]
        [UseFiltering]
        public IQueryable<File> GetFiles(
            [ScopedService] ApplicationDbContext ctx)
            => ctx.Files.OrderBy(f => f.Id);
    }
}
