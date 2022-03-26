using System;

namespace API.Schema.Mutations.Auth.Exceptions {
    public class InvalidProviderException : Exception {
        public InvalidProviderException(string providerName)
            : base($"'{providerName}' was chosen as the provider but this user " +
                  $"is not verified to use that provider.") { }
    }
}
