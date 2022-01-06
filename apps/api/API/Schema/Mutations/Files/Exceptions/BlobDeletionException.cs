using System;

namespace API.Schema.Mutations.Files.Exceptions {
    public class BlobDeletionException : Exception {
        public BlobDeletionException() : base("Unable to delete blob.") { }
    }
}
