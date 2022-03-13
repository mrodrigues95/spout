using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure {
    public class SessionManager : ISessionManager {
        private const int _sessionTTL = 7;

        public async Task<Session> CreateAsync(
            User user,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var session = new Session {
                UpdatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(_sessionTTL),
                UserId = user.Id
            };

            ctx.Sessions.Add(session);
            await ctx.SaveChangesAsync(cancellationToken);

            return session;
        }

        public async Task<Session?> ValidateAsync(
            int sessionId,
            User user,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var session = await ctx.Sessions.SingleOrDefaultAsync(x =>
                x.Id == sessionId
                && x.UserId == user.Id, cancellationToken);

            if (session is null || session.ExpiresAt < DateTime.UtcNow) {
                return null;
            }

            return session;
        }

        public async Task<Session?> RefreshAsync(
            int sessionId,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var session = await ctx.Sessions.FindAsync(
                new object[] { sessionId },
                cancellationToken);
            if (session is null) return null;

            session.ExpiresAt = DateTime.UtcNow.AddDays(_sessionTTL);
            session.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);
            return session;
        }

        public async Task<bool> InvalidateExceptForAsync(
            int sessionId,
            User user,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            ctx.Sessions.RemoveRange(ctx.Sessions.Where(x => x.Id != sessionId));
            var success = await ctx.SaveChangesAsync(cancellationToken) > 0;
            return success;
        }
    }
}
