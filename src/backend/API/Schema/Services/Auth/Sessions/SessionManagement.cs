using API.Data;
using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.Services.Auth.Sessions {
    public class SessionPayload {
        public User User { get; set; } = default!;
        public Session Session { get; set; } = default!;
    }

    public static class SessionManagement {
        public async static Task<SessionPayload> CreateSession(
            string email,
            ApplicationDbContext context,
            CancellationToken cancellationToken) {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Email == email, cancellationToken);

            var session = new Session {
                UpdatedAt = DateTime.UtcNow,
                User = user,
                UserId = user.Id
            };

            context.Sessions.Add(session);
            await context.SaveChangesAsync(cancellationToken);

            return new SessionPayload { User = user, Session = session };
        }

        public async static Task RemoveSession(
            Guid sessionId,
            ApplicationDbContext context,
            CancellationToken cancellationToken) {
            var session = new Session() { Id = sessionId };
            context.Sessions.Remove(session);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
