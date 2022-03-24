using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class SMSNotSentException : Exception {
        public SMSNotSentException(string phoneNumber)
            : base($"SMS was not able to be sent to {phoneNumber}.") { }
    }
}
