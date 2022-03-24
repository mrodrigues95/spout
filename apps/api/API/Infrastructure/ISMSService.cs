using System.Collections.Generic;
using System.Threading.Tasks;
using Twilio.Clients;
using Twilio.Rest.Lookups.V1;

namespace API.Infrastructure {
    public interface ISMSService {
        Task<PhoneNumberResource?> GetPhoneNumberAsync(
            string phoneNumber,
            string? countryCode = null,
            List<string>? type = null,
            List<string>? addOns = null,
            Dictionary<string, object>? addOnsData = null,
            ITwilioRestClient? client = null);

        Task<bool> SendSMS(
            string body,
            string to,
            string? from = null);
    }
}
