using System.Linq;
using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using HotChocolate.Types;

namespace API.Schema.Queries.Files {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class FileQueries {
        [Authorize]
        [UseApplicationDbContext]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public IQueryable<File> GetFiles(
            [ScopedService] ApplicationDbContext ctx)
            => ctx.Files;
    }
}
