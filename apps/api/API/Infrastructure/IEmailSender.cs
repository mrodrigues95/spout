using System.Threading.Tasks;

namespace API.Infrastructure {
    public interface IEmailSender {
        Task<bool> SendEmailAsync(
            string toEmail,
            string subject,
            string message,
            string tag);
    }
}
