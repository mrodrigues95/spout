using System;

namespace API.Schema.Mutations.Files.Exceptions {
    public class ParseSignatureException : Exception {
        public ParseSignatureException() : base("Unable to parse SAS.") { }
    }
}
