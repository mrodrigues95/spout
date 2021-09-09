using System;

namespace API.Common.Enums {
    public static class From {
        public static string State(State state) =>
            state switch {
                Enums.State.Active => "Active",
                Enums.State.Inactive => "Inactive",
                Enums.State.Suspended => "Suspended",
                Enums.State.Deleted => "Deleted",
                _ => throw new ArgumentException(message: "Invalid enum value", paramName: nameof(state))
            };
    }
}
