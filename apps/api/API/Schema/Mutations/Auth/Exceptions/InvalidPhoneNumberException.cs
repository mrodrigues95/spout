using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class InvalidPhoneNumberException : Exception {
        public InvalidPhoneNumberException(string phoneNumber)
            : base($"{phoneNumber} is an invalid phone number.") { }
    }
}
