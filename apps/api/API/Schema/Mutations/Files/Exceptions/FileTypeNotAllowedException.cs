using System;

namespace API.Schema.Mutations.Files.Exceptions {
    public class FileTypeNotAllowedException : Exception {
        public FileTypeNotAllowedException(string? ext)
            : base($"{ext} is not a whitelisted file extension.") { }
    }
}
