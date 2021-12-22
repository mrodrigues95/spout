using System;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.Extensions.Options;

namespace API.Infrastructure {
    public class BlobService : IBlobService {
        private readonly string? _storageAccountUriString;
        private readonly string? _storageAccountContainerName;

        public BlobService(IOptions<AzureStorageConfig> config) {
            _storageAccountUriString = config.Value.Uri;
            _storageAccountContainerName = config.Value.ContainerName;
        }

        private BlobServiceClient CreateBlobServiceClient() {
            // TODO: Use Azure Key Vault.
            if (string.IsNullOrEmpty(_storageAccountUriString)) {
                throw new Exception("No `storageAccountUriString` user secret was set.");
            }

            var credential = new DefaultAzureCredential();
            return new BlobServiceClient(new Uri(_storageAccountUriString), credential);
        }

        private async Task<BlobContainerClient> CreateBlobContainerClient(BlobServiceClient serviceClient) {
            if (string.IsNullOrEmpty(_storageAccountContainerName)) {
                throw new Exception("No `storageAccountContainerName` user secret was set.");
            }

            var containerClient = serviceClient.GetBlobContainerClient(_storageAccountContainerName);

            try {
                await containerClient.CreateIfNotExistsAsync();
                return containerClient;
            } catch (Exception) {
                throw;
            }
        }

        /// <summary>
        /// Returns a URI containing a SAS for the blob.
        /// </summary>
        /// <param name="blobName">A string containing the name of the blob.</param>
        /// <returns>A string containing the URI for the blob, with the SAS token appended.</returns>
        public async Task<Uri> GetBlobSasUri(string blobName) {
            var serviceClient = CreateBlobServiceClient();
            var containerClient = await CreateBlobContainerClient(serviceClient);
            var blobClient = containerClient.GetBlobClient(blobName);
            var userDelegationKey = await serviceClient.GetUserDelegationKeyAsync(
                DateTime.UtcNow, DateTime.UtcNow.AddMinutes(5));

            var sasBuilder = new BlobSasBuilder {
                BlobContainerName = containerClient.Name,
                BlobName = blobName,
                Resource = "b", // b for blob, c for container.
                StartsOn = DateTimeOffset.UtcNow,
                ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(5),
            };

            sasBuilder.SetPermissions(BlobSasPermissions.Write | BlobSasPermissions.Create);

            var blobUriBuilder = new BlobUriBuilder(blobClient.Uri) {
                Sas = sasBuilder.ToSasQueryParameters(userDelegationKey, serviceClient.AccountName)
            };
            return blobUriBuilder.ToUri();
        }
    }

    public class AzureStorageConfig {
        public string? Uri { get; set; }
        public string? ContainerName { get; set; }
    }
}
