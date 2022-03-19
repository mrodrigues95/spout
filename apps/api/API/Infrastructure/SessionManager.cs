using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure {
    public class SessionManager : ISessionManager, IAsyncDisposable {
        private readonly ApplicationDbContext _ctx;
        private const int _sessionTTL = 7;

        public SessionManager(IDbContextFactory<ApplicationDbContext> dbContextFactory) {
            _ctx = dbContextFactory.CreateDbContext();
        }

        public ValueTask DisposeAsync() => _ctx.DisposeAsync();

        public async Task<Session> CreateAsync(User user, CancellationToken cancellationToken) {
            var session = new Session {
                UpdatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(_sessionTTL),
                UserId = user.Id
            };

            _ctx.Sessions.Add(session);
            await _ctx.SaveChangesAsync(cancellationToken);

            return session;
        }

        public async Task<Session?> ValidateAsync(
            int sessionId,
            User user,
            CancellationToken cancellationToken) {
            var session = await _ctx.Sessions.SingleOrDefaultAsync(x =>
                x.Id == sessionId
                && x.UserId == user.Id, cancellationToken);

            if (session is null || session.ExpiresAt < DateTime.UtcNow) {
                return null;
            }

            return session;
        }

        public async Task<Session?> RefreshAsync(int sessionId, CancellationToken cancellationToken) {
            var session = await _ctx.Sessions.FindAsync(
                new object[] { sessionId },
                cancellationToken);
            if (session is null) return null;

            session.ExpiresAt = DateTime.UtcNow.AddDays(_sessionTTL);
            session.UpdatedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync(cancellationToken);
            return session;
        }

        public async Task<bool> InvalidateExceptForAsync(
            int sessionId,
            CancellationToken cancellationToken) {
            _ctx.Sessions.RemoveRange(_ctx.Sessions.Where(x => x.Id != sessionId));
            var success = await _ctx.SaveChangesAsync(cancellationToken) > 0;
            return success;
        }

        public async Task<bool> InvalidateAsync(
            int userId,
            CancellationToken cancellationToken) {
            _ctx.Sessions.RemoveRange(_ctx.Sessions.Where(x => x.UserId == userId));
            var success = await _ctx.SaveChangesAsync(cancellationToken) > 0;
            return success;
        }
    }
}
