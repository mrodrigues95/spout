using HotChocolate;

namespace API.Common.Exceptions {
    public class ErrorFilter : ExceptionStatusCodes, IErrorFilter {
        public IError OnError(IError error) {
            if (error.Exception != null) {
                error = error.WithCode(GetExceptionErrorCode(error.Exception));
            }

            // Handles generic GraphQL exceptions.
            return error.WithCode("200");
        }
    }
}
