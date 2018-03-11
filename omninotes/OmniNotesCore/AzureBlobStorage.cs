using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using OmniNotesContracts;

namespace OmniNotesCore
{
    public class AzureBlobStorage:IStorage
    {
        private readonly CloudStorageAccount _storageAccount = null;
        private readonly CloudBlobContainer _cloudBlobContainer = null;
        private readonly CloudBlobClient _cloudBlobClient = null;
        private const string Container = "notes";
        public AzureBlobStorage(string connectionString)
        {
            if (CloudStorageAccount.TryParse(connectionString, out _storageAccount))
            {
                _cloudBlobClient = _storageAccount.CreateCloudBlobClient();
                _cloudBlobContainer = _cloudBlobClient.GetContainerReference(Container);

            }
        }

        public async Task<IEnumerable<string>> GetAllNotes(string userId)
        {
            BlobContinuationToken blobContinuationToken = null;
            var directory = _cloudBlobContainer.GetDirectoryReference($"{userId}");
            var blobs = await directory.ListBlobsSegmentedAsync(false, BlobListingDetails.Metadata, Int32.MaxValue,
                blobContinuationToken, new BlobRequestOptions(), new OperationContext());
            return blobs.Results.Select(i => ((CloudBlockBlob)i).Name);
        }

        public async Task<Stream> DownloadNotes(string userId, string blobName)
        {
            var directory = _cloudBlobContainer.GetDirectoryReference($"{userId}");
            var blob = directory.GetBlockBlobReference(blobName);
            var stream = new MemoryStream();
            await blob.DownloadToStreamAsync(stream);
            return stream;
        }

        

    }
}
