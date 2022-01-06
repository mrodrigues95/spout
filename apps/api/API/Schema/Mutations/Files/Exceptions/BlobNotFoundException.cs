using System;

namespace API.Schema.Mutations.Files.Exceptions {
    public class BlobNotFoundException : Exception {
        public BlobNotFoundException() : base("Blob not found.") { }
    }
}
