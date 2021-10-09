using API.Data.Entities;
using API.Schema.Common;

namespace API.Schema.Mutations.FileUploads {
    public class FileUploadPayload : Payload {
        public FileUpload? FileUpload { get; }

        public FileUploadPayload(FileUpload fileUpload) {
            FileUpload = fileUpload;
        }

        public FileUploadPayload(UserError error) : base(new[] { error }) { }

        public FileUploadPayload(FileUpload fileUpload, UserError error) : base(new[] { error }) {
            FileUpload = fileUpload;
        }
    }
}
