using System;
using API.Schema.Types.Users;

namespace API.Common.Enums {
    public static class From {
        public static string State(State state) =>
            state switch {
                Enums.State.Active => "Active",
                Enums.State.Inactive => "Inactive",
                Enums.State.Suspended => "Suspended",
                Enums.State.Deleted => "Deleted",
                _ => throw new ArgumentException(message: "Invalid enum value",
                    paramName: nameof(state))
            };

        public static string UserPreferredProvider(UserPreferredProvider provider) =>
            provider switch {
                Schema.Types.Users.UserPreferredProvider.EMAIL => "Email",
                Schema.Types.Users.UserPreferredProvider.PHONE => "Phone",
                _ => throw new ArgumentException(message: "Invalid enum value",
                    paramName: nameof(provider))
            };
    }
}
