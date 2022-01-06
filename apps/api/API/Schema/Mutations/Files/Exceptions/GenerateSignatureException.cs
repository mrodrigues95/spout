using System;

namespace API.Schema.Mutations.Files.Exceptions {
    public class GenerateSignatureException : Exception {
        public GenerateSignatureException() : base("Unable to generate SAS.") { }
    }
}
