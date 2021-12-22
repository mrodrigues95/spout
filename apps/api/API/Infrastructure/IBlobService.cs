using System;
using System.Threading.Tasks;

namespace API.Infrastructure {
    public interface IBlobService {
        Task<Uri> GetBlobSasUri(string blobName);
    }
}
