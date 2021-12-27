using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.Files {
    public class CompleteUploadPayload : Payload {
        public File? File { get; }

        public CompleteUploadPayload(File file) {
            File = file;
        }

        public CompleteUploadPayload(UserError error) : base(new[] { error }) { }
    }
}
