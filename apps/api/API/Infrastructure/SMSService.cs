using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Twilio;
using Twilio.Clients;
using Twilio.Exceptions;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Rest.Lookups.V1;
using Twilio.Types;

namespace API.Infrastructure {
    public class SMSService : ISMSService {
        private readonly ILogger<SMSService> _logger;
        private readonly string _accountSid;
        private readonly string _authToken;
        private readonly string _fromNumber;

        public SMSService(
            IOptions<TwilioConfig> config,
            ILogger<SMSService> logger) {
            _logger = logger;
            _accountSid = config.Value.AccountSid ??
                throw new ArgumentNullException(nameof(config));
            _authToken = config.Value.AuthToken ??
                throw new ArgumentNullException(nameof(config));
            _fromNumber = config.Value.FromNumber ??
                throw new ArgumentNullException(nameof(config));
        }

        private void InitTwilioClient() => TwilioClient.Init(_accountSid, _authToken);

        public async Task<PhoneNumberResource?> GetPhoneNumberAsync(
            string phoneNumber,
            string? countryCode = null,
            List<string>? type = null,
            List<string>? addOns = null,
            Dictionary<string, object>? addOnsData = null,
            ITwilioRestClient? client = null) {
            try {
                InitTwilioClient();

                var twilioPhoneNumber = await PhoneNumberResource.FetchAsync(
                    pathPhoneNumber: new PhoneNumber(phoneNumber),
                    type: type ?? new List<string> { "carrier" },
                    countryCode: countryCode,
                    addOns: addOns,
                    addOnsData: addOnsData);

                return twilioPhoneNumber;
            } catch (ApiException ex) {
                if (ex.Status == 404) {
                    _logger.LogInformation(phoneNumber, "Phone number not found");
                } else {
                    _logger.LogError(
                        ex, "Unknown API error while fetching phone number from Twilio");
                }

                return null;
            } catch (Exception ex) {
                _logger.LogError(ex, "Unknown error while fetching phone number from Twilio");
                return null;
            }
        }

        public async Task<bool> SendSMS(
            string body,
            string to,
            string? from = null) {
            try {
                InitTwilioClient();

                var message = await MessageResource.CreateAsync(
                    body: body,
                    from: new PhoneNumber(_fromNumber),
                    to: new PhoneNumber(to));

                if (message.ErrorCode is not null ||
                    message.Status == MessageResource.StatusEnum.Failed ||
                    message.Status == MessageResource.StatusEnum.Canceled ||
                    message.Status == MessageResource.StatusEnum.Undelivered) {
                    _logger.LogWarning("SMS failed to send", message);
                    return false;
                }

                return true;
            } catch (ApiException ex) {
                _logger.LogError(ex, "Unknown API error while sending SMS");
                return false;
            } catch (Exception ex) {
                _logger.LogError(ex, "Unknown error while sending SMS");
                return false;
            }
        }
    }

    public class TwilioConfig {
        public string? AccountSid { get; set; }
        public string? AuthToken { get; set; }
        public string? FromNumber { get; set; }
    }
}
