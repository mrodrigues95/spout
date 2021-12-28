using API.Extensions;
using API.Data.Entities;
using HotChocolate.Types;
using HotChocolate;
using API.Data;
using System.Linq;
using HotChocolate.AspNetCore.Authorization;

namespace API.Schema.Queries.Files {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class FileQueries {
        [Authorize]
        [UseApplicationDbContext]
        public IQueryable<File> GetFiles(
            [ScopedService] ApplicationDbContext context)
            => context.Files;
    }
}
