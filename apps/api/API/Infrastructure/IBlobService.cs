using System;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;

namespace API.Infrastructure {
    public interface IBlobService {
        Task<Uri?> GetBlobSasUri(string blobName, BlobSasPermissions permissions);
        BlobClient? GetBlobClient(string blobName);
    }
}
