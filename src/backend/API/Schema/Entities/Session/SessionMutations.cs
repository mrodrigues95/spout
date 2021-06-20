using API.Data;
using API.Extensions;
using API.Schema.Common;
using API.Schema.Entities.Session.Helpers;
using API.Schema.Services.Auth;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.Entities.Session {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class SessionMutations {
        [Authorize]
        [UseApplicationDbContext]
        public async Task<AuthPayload> RefreshSessionAsync(
            RefreshSessionInput input,
            [GlobalState] int? userId,
            [ScopedService] ApplicationDbContext context,
            [Service] IHttpContextAccessor httpContextAccessor,
            CancellationToken cancellationToken) {
            if (userId is null) {
                httpContextAccessor.HttpContext?.Response.Cookies.Delete("SP_IDENTITY");
                return new AuthPayload(new UserError("Unable to find user.", "USER_NOT_FOUND"));
            }

            var session = await SessionManagement.RefreshSession(input.SessionId, context, cancellationToken);
            if (session is null) return new AuthPayload(new UserError("Unable to refresh session", "SESSION_PROBLEM"));

            return new AuthPayload(session.User, session.Session, true);
        }
    }
}
