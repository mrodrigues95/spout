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
        
        public static string ExpiresAfter(ExpiresAfter expiresAfter) =>
            expiresAfter switch {
                Enums.ExpiresAfter.ThirtyMinutes => "30 minutes",
                Enums.ExpiresAfter.OneHour => "1 hour",
                Enums.ExpiresAfter.SixHours => "6 hours",
                Enums.ExpiresAfter.TwelveHours => "12 hours",
                Enums.ExpiresAfter.OneDay => "1 day",
                Enums.ExpiresAfter.SevenDays => "7 days",
                Enums.ExpiresAfter.Never => "Never",
                _ => throw new ArgumentException(message: "Invalid enum value", paramName: nameof(expiresAfter))
            };
    }
}
