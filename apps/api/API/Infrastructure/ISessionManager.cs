using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;

namespace API.Infrastructure {
    public interface ISessionManager {
        Task<Session> CreateAsync(
            User user,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken);

        Task<Session?> ValidateAsync(
            int sessionId,
            User user,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken);


        Task<Session?> RefreshAsync(
            int sessionId,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken);

        Task<bool> InvalidateExceptForAsync(
            int sessionId,
            User user,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken);
    }
}
