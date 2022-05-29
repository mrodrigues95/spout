using System.Globalization;

namespace System.Security.Claims {
    public static class ClaimsPrincipalExtensions {
        public static string? FindFirstValue(
            this ClaimsPrincipal principal,
            string claimType,
            bool throwIfNotFound = false) {
            if (principal is null) {
                throw new ArgumentNullException(nameof(principal));
            }

            var value = principal.FindFirst(claimType)?.Value;
            if (throwIfNotFound && string.IsNullOrWhiteSpace(value)) {
                throw new InvalidOperationException(
                    string.Format(CultureInfo.InvariantCulture,
                        "The supplied principal does not contain a claim of type {0}", claimType));
            }

            return value;
        }

        public static int? GetUserIdValue(
            this ClaimsPrincipal principal,
            bool throwIfNotFound = true) {
            var value = principal.FindFirstValue(ClaimTypes.NameIdentifier, throwIfNotFound);
            return value is null ? null : int.Parse(value);
        }

        public static string? GetUserEmailValue(
            this ClaimsPrincipal principal,
            bool throwIfNotFound = true) {
            return principal.FindFirstValue(ClaimTypes.NameIdentifier, throwIfNotFound);
        }
    }
}
