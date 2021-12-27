using System;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.Extensions.Options;

namespace API.Infrastructure {
    // TODO: Use Azure Key Vault instead of local user secrets.
    // TODO: Only allow SAS over HTTPS (re-enable this in Azure).
    public class BlobService : IBlobService {
        private readonly string _storageAccountUriString;
        private readonly string _containerName;

        public BlobService(IOptions<AzureStorageConfig> config) {
            _storageAccountUriString = config.Value.Uri ??
                throw new ArgumentNullException(nameof(config));

            // TODO: Container name will probably be dynamic at some point depending on how
            // we want to structure this in Azure (e.g. spout-messages-container,
            // spout-user-avatars-container, etc). If so, we can just pass in a container name
            // and remove this secret.
            _containerName = config.Value.ContainerName ??
                throw new ArgumentNullException(nameof(config));
        }

        private BlobServiceClient CreateBlobServiceClient() {
            var credential = new DefaultAzureCredential();
            return new BlobServiceClient(new Uri(_storageAccountUriString!), credential);
        }

        private async Task<BlobContainerClient> CreateBlobContainerClient(
            BlobServiceClient serviceClient) {
            var containerClient = serviceClient.GetBlobContainerClient(_containerName);

            try {
                await containerClient.CreateIfNotExistsAsync();
                return containerClient;
            } catch (Exception) {
                throw;
            }
        }

        public async Task<Uri?> GetBlobSasUri(string blobName) {
            try {
                var blobServiceClient = CreateBlobServiceClient();
                var blobContainerClient = await CreateBlobContainerClient(blobServiceClient);
                var blobClient = blobContainerClient.GetBlobClient(blobName);
                var userDelegationKey = await blobServiceClient.GetUserDelegationKeyAsync(
                    DateTime.UtcNow, DateTime.UtcNow.AddMinutes(5));

                var sasBuilder = new BlobSasBuilder {
                    BlobContainerName = blobContainerClient.Name,
                    BlobName = blobName,
                    Resource = "b", // b for blob, c for container.
                    StartsOn = DateTimeOffset.UtcNow.AddMinutes(-15),
                    ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(15),
                };

                sasBuilder.SetPermissions(BlobSasPermissions.Write | BlobSasPermissions.Create);

                var blobUriBuilder = new BlobUriBuilder(blobClient.Uri) {
                    Sas = sasBuilder.ToSasQueryParameters(userDelegationKey,
                        blobServiceClient.AccountName)
                };

                return blobUriBuilder.ToUri();
            } catch (Exception) {
                // TODO: Configure logging.
                return null;
            }
        }

        public async Task<BlobClient?> GetBlobClient(string blobName) {
            try {
                var blobServiceClient = CreateBlobServiceClient();
                var blobContainerClient = await CreateBlobContainerClient(blobServiceClient);
                var blobClient = blobContainerClient.GetBlobClient(blobName);
                return blobClient;
            } catch (Exception){
                return null;
            }
        }
    }

    public class AzureStorageConfig {
        public string? Uri { get; set; }
        public string? ContainerName { get; set; }
    }
}
