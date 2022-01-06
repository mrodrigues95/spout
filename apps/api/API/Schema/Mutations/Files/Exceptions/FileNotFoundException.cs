using System;

namespace API.Schema.Mutations.Files.Exceptions {
    public class FileNotFoundException : Exception {
        public FileNotFoundException() : base("File not found.") { }
    }
}
