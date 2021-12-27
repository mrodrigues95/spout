using System;
using System.Threading.Tasks;
using Azure.Storage.Blobs;

namespace API.Infrastructure {
    public interface IBlobService {
        Task<Uri?> GetBlobSasUri(string blobName);
        Task<BlobClient?> GetBlobClient(string blobName);
    }
}
