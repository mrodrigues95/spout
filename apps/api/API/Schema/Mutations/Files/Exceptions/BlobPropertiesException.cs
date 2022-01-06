using System;

namespace API.Schema.Mutations.Files.Exceptions {
    public class BlobPropertiesException : Exception {
        public BlobPropertiesException() : base("Unable to retrieve blob properties.") { }
    }
}
