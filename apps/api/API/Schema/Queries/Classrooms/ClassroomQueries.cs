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
using static Microsoft.AspNetCore.Authorization.AuthorizationServiceExtensions;
using AspNetCoreAuth = Microsoft.AspNetCore.Authorization;

namespace API.Schema.Queries.Classrooms {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class ClassroomQueries {
        [Authorize]
        public IQueryable<Classroom> GetClassroomsAsync(ApplicationDbContext ctx)
            => ctx.Classrooms;

        [Authorize]
        public async Task<Classroom?> GetClassroomByIdAsync(
            [ID(nameof(Classroom))] int id,
            ClaimsPrincipal userClaim,
            ClassroomByIdDataLoader classroomById,
            AspNetCoreAuth.IAuthorizationService authorizationService,
            CancellationToken cancellationToken) {
            var classroom = await classroomById.LoadAsync(id, cancellationToken);
            if (classroom is null) return null;

            var result = await authorizationService.AuthorizeAsync(
                userClaim,
                classroom,
                ClassroomOperations.Read);
            return result.Succeeded ? classroom : null;
        }

    }
}
