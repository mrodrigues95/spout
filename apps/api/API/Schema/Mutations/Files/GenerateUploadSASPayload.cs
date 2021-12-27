using System;
using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.FileUploads {
    public class GenerateUploadSASPayload : Payload {
        public Uri? Sas { get; }
        public File? File { get; }

        public GenerateUploadSASPayload(Uri sas, File file) {
            Sas = sas;
            File = file;
        }

        public GenerateUploadSASPayload(UserError error) : base(new[] { error }) { }
    }
}
