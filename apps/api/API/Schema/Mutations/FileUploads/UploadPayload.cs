using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.FileUploads {
    public class UploadPayload : Payload {
        public FileUpload? FileUpload { get; }

        public UploadPayload(FileUpload fileUpload) {
            FileUpload = fileUpload;
        }

        public UploadPayload(UserError error) : base(new[] { error }) { }
    }
}
