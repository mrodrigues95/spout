namespace API.Common.Exceptions {
    public class AppException {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string? Details { get; set; }

        public AppException(int statusCode, string message, string? details = default!) {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }
    }
}
