using System;
using API.Schema.Common;

namespace API.Schema.Mutations.FileUploads {
    public class UploadPayload : Payload {
        public Uri? SasUri { get; }

        public UploadPayload(Uri sasUri) {
            SasUri = sasUri;
        }

        public UploadPayload(UserError error) : base(new[] { error }) { }
    }
}
