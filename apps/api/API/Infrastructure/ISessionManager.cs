using System.Threading;
using System.Threading.Tasks;
using API.Data.Entities;

namespace API.Infrastructure {
    public interface ISessionManager {
        Task<Session> CreateAsync(
            User user,
            CancellationToken cancellationToken);

        Task<Session?> ValidateAsync(
            int sessionId,
            User user,
            CancellationToken cancellationToken);

        Task<Session?> RefreshAsync(
            int sessionId,
            CancellationToken cancellationToken);

        Task<bool> InvalidateExceptForAsync(
            int sessionId,
            CancellationToken cancellationToken);
    }
}
