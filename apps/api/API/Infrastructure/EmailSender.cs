using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PostmarkDotNet;
using PostmarkDotNet.Model;

namespace API.Infrastructure {
    public class EmailSender : IEmailSender {
        private readonly ILogger _logger;
        private readonly string _postmarkServerApiToken;
        private readonly string _fromEmail;

        public EmailSender(
            IOptions<PostmarkConfig> config, ILogger<EmailSender> logger) {
            _logger = logger;
            _fromEmail = Environment.GetEnvironmentVariable("POSTMARK_FROM_EMAIL") ??
                throw new ArgumentNullException(nameof(Environment));
            _postmarkServerApiToken = config.Value.PostmarkServerApiToken ??
                throw new ArgumentNullException(nameof(config));
        }

        public async Task<bool> SendEmailAsync(
            string toEmail,
            string subject,
            string message,
            string tag) {
            var client = new PostmarkClient(_postmarkServerApiToken);
            var headers = new Dictionary<string, string>() {
                {"X-CUSTOM-HEADER", "Header content"}
            };

            var postmarkMessage = new PostmarkMessage() {
                To = toEmail,
                From = _fromEmail,
                TrackOpens = true,
                Subject = subject,
                TextBody = message,
                HtmlBody = message,
                Tag = tag,
                Headers = new HeaderCollection(headers)
            };

            var result = await client.SendMessageAsync(postmarkMessage);
            if (result.Status == PostmarkStatus.Success) {
                _logger.LogInformation($"Email sent to ${toEmail} successfully.");
                return true;
            }

            // TODO: Setup Azure Service Bus so we can handle failed emails better.
            _logger.LogError($"Error sending email to ${toEmail}", postmarkMessage);
            return false;
        }
    }

    public class PostmarkConfig {
        public string? PostmarkServerApiToken { get; set; }
    }
}
