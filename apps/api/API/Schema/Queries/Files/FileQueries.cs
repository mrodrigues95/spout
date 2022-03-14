using System.Linq;
using API.Data;
using API.Data.Entities;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using HotChocolate.Types;

namespace API.Schema.Queries.Files {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class FileQueries {
        [Authorize]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public IQueryable<File> GetFiles(ApplicationDbContext ctx) => ctx.Files;
    }
}
