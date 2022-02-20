using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Extensions;
using API.Schema.Mutations.Auth.Payloads;
using API.Schema.Mutations.Sessions.Common;
using API.Schema.Mutations.Sessions.Exceptions;
using API.Schema.Mutations.Sessions.Inputs;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;

namespace API.Schema.Mutations.Sessions {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class SessionMutations {
        [Authorize]
        [UseApplicationDbContext]
        [Error(typeof(UserNotFoundException))]
        [Error(typeof(SessionNotFoundException))]
        public async Task<AuthPayload> RefreshSessionAsync(
            RefreshSessionInput input,
            [GlobalState] int? userId,
            [ScopedService] ApplicationDbContext context,
            [Service] IHttpContextAccessor httpContextAccessor,
            CancellationToken cancellationToken) {
            if (userId is null) {
                httpContextAccessor.HttpContext?.Response.Cookies.Delete("SP_IDENTITY");
                throw new UserNotFoundException();
            }

            var session = await SessionManagement.RefreshSession(input.SessionId, context, cancellationToken);
            if (session is null) {
                throw new SessionNotFoundException();
            }

            return new AuthPayload(session.User, session.Session, true);
        }
    }
}
