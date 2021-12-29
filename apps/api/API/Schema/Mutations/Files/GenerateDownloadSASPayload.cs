using System;
using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.Files {
    public class GenerateDownloadSASPayload : Payload {
        public Uri? Sas { get; }
        public File? File { get; }

        public GenerateDownloadSASPayload(Uri sas, File file) {
            Sas = sas;
            File = file;
        }

        public GenerateDownloadSASPayload(UserError error) : base(new[] { error }) { }
    }
}
