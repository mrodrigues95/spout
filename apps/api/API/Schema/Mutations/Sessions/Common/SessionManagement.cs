using System;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Schema.Mutations.Sessions.Common {
    public class SessionPayload {
        public User User { get; set; } = default!;
        public Session Session { get; set; } = default!;
    }

    public static class SessionManagement {
        public async static Task<SessionPayload?> CreateSession(
            int userId,
            ApplicationDbContext context,
            CancellationToken cancellationToken) {
            var user = await context.Users.SingleOrDefaultAsync(x => x.Id == userId, cancellationToken);
            if (user is null) return null;

            var session = new Session {
                UpdatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                User = user,
                UserId = user.Id
            };

            context.Sessions.Add(session);
            await context.SaveChangesAsync(cancellationToken);

            return new SessionPayload { User = user, Session = session };
        }

        public async static Task<SessionPayload?> RefreshSession(
            Guid sessionId,
            ApplicationDbContext context,
            CancellationToken cancellationToken) {
            var session = await context.Sessions.SingleOrDefaultAsync(x => x.Id == sessionId, cancellationToken);
            if (session is null) return null;

            session.ExpiresAt = DateTime.UtcNow.AddDays(7);
            session.UpdatedAt = DateTime.UtcNow;
            await context.SaveChangesAsync(cancellationToken);

            return new SessionPayload { User = session.User!, Session = session };
        }

        public async static Task RemoveSession(
            Guid sessionId,
            ApplicationDbContext context,
            CancellationToken cancellationToken) {
            var session = new Session { Id = sessionId };
            context.Sessions.Remove(session);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
