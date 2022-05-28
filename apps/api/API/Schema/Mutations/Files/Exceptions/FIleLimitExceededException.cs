using System;

namespace API.Schema.Mutations.Files.Exceptions {
    public class FileLimitExceededException : Exception {
        public FileLimitExceededException(string message) : base(message) { }
    }
}
