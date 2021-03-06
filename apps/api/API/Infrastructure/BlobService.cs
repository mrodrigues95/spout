using System;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace API.Infrastructure {
    // TODO: Use Azure Key Vault instead of local user secrets.
    public class BlobService : IBlobService {
        private readonly ILogger<BlobService> _logger;
        private readonly string _storageAccountUriString;
        private readonly string _containerName;

        public BlobService(IOptions<AzureStorageConfig> config, ILogger<BlobService> logger) {
            _logger = logger;
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

        public async Task<Uri?> GetBlobSasUri(string blobName, BlobSasPermissions permissions) {
            try {
                var blobServiceClient = CreateBlobServiceClient();
                var blobContainerClient = blobServiceClient.GetBlobContainerClient(_containerName);
                var blobClient = blobContainerClient.GetBlobClient(blobName);
                var userDelegationKey = await blobServiceClient.GetUserDelegationKeyAsync(
                    DateTime.UtcNow.AddMinutes(-15), DateTime.UtcNow.AddMinutes(15));

                var sasBuilder = new BlobSasBuilder {
                    BlobContainerName = blobContainerClient.Name,
                    BlobName = blobName,
                    Resource = "b", // b for blob, c for container.
                    StartsOn = DateTimeOffset.UtcNow.AddMinutes(-15),
                    ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(15),
                };

                sasBuilder.SetPermissions(permissions);

                var blobUriBuilder = new BlobUriBuilder(blobClient.Uri) {
                    Sas = sasBuilder.ToSasQueryParameters(userDelegationKey,
                        blobServiceClient.AccountName)
                };

                return blobUriBuilder.ToUri();
            } catch (Exception ex) {
                _logger.LogError(ex, "Error generating blob SAS URI.");
                return null;
            }
        }

        public BlobClient? GetBlobClient(string blobName) {
            try {
                var blobServiceClient = CreateBlobServiceClient();
                var blobContainerClient = blobServiceClient.GetBlobContainerClient(_containerName);
                var blobClient = blobContainerClient.GetBlobClient(blobName);
                return blobClient;
            } catch (Exception ex) {
                _logger.LogError(ex, "Error retrieving blob client.");
                return null;
            }
        }
    }

    public class AzureStorageConfig {
        public string? Uri { get; set; }
        public string? ContainerName { get; set; }
    }
}
