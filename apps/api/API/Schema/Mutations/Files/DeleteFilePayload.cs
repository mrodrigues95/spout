using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.Files {
    public class DeleteFilePayload : Payload {
        public File? File { get; }

        public DeleteFilePayload(File file) {
            File = file;
        }

        public DeleteFilePayload(UserError error) : base(new[] { error }) { }
    }
}
