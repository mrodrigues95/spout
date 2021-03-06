using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Security.Policy;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using static Microsoft.AspNetCore.Authorization.AuthorizationServiceExtensions;
using AspNetCoreAuth = Microsoft.AspNetCore.Authorization;

namespace API.Schema.Queries.Discussions {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class DiscussionQueries {
        [Authorize]
        public IQueryable<Discussion> GetDiscussions(ApplicationDbContext ctx)
            => ctx.Discussions.OrderBy(d => d.Id);

        [Authorize]
        public async Task<Discussion?> GetDiscussionByIdAsync(
            [ID(nameof(Discussion))] int id,
            ClaimsPrincipal userClaim,
            ApplicationDbContext ctx,
            AspNetCoreAuth.IAuthorizationService authorizationService,
            CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions
                .Include(x => x.Classroom)
                .Where(x => x.Id == id && x.Classroom!.IsDeleted == false)
                .SingleOrDefaultAsync(cancellationToken);
            if (discussion is null) return null;

            var result = await authorizationService.AuthorizeAsync(
                userClaim,
                discussion.Classroom,
                ClassroomOperations.Read);
            return result.Succeeded ? discussion : null;
        }
    }
}
