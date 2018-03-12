using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using OmniNotesContracts;
using OmniNotesModels.DTO;

namespace OmniNotesCore
{
   

    public class AzureBlobStorage : IStorage
    {
        private readonly CloudStorageAccount _storageAccount = null;
        private readonly CloudBlobContainer _cloudBlobContainer = null;
        private readonly CloudBlobClient _cloudBlobClient = null;

        private const string Container = "notes";
        private const string NotesKey = "NotesTitle";
        private const string SectionKey = "SectionTitle";
        private const string PageTitleKey = "PageTitle";

        public AzureBlobStorage(string connectionString)
        {
            if (CloudStorageAccount.TryParse(connectionString, out _storageAccount))
            {
                _cloudBlobClient = _storageAccount.CreateCloudBlobClient();
                _cloudBlobContainer = _cloudBlobClient.GetContainerReference(Container);

            }
        }

        /// <summary>
        /// Gets all notes
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<BlobDto>> GetAllNotes(string userId)
        {
            BlobContinuationToken blobContinuationToken = null;
            var directory = _cloudBlobContainer.GetDirectoryReference($"{userId}");
            var blobs = await directory.ListBlobsSegmentedAsync(true, BlobListingDetails.Metadata, Int32.MaxValue,
                blobContinuationToken, new BlobRequestOptions(), new OperationContext());
            return blobs.Results.Select(i =>
            {
                var bl = ((CloudBlockBlob)i);
                return new BlobDto()
                {
                    NotesTitle = bl.Metadata.ContainsKey(NotesKey) ? bl.Metadata[NotesKey] : "Unknown",
                    SectionTitle = bl.Metadata.ContainsKey(SectionKey) ? bl.Metadata[SectionKey] : "Unknown",
                    PageTitle = bl.Metadata.ContainsKey(PageTitleKey) ? bl.Metadata[PageTitleKey] : "Unknown",
                    LastModifiedUtc = bl.Properties.LastModified,
                    PageLocation = bl.Name,
                    Length = bl.Properties.Length,
                    Url = bl.Uri,
                    Etag = bl.Properties.ETag
                };
            });
        }
        
        /// <summary>
        /// Download notes
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="blobName"></param>
        /// <returns></returns>
        public async Task<string> DownloadNotes(string userId, string blobName)
        {
            var blobRef = _cloudBlobContainer.GetBlockBlobReference(blobName);
            string text = await blobRef.DownloadTextAsync();
            return text;
        }

        public async Task<BlobDto> CreateNewNote(string userId, string noteTitle, string sectionTitle, string pageTitle, string content)
        {
            var currentUtc = DateTime.UtcNow.ToString("O");
            string defaultSectionTitle = !string.IsNullOrEmpty(sectionTitle)?sectionTitle: "Section1";
            string defaultPageTitle = !string.IsNullOrEmpty(pageTitle)?pageTitle: $"Page1{currentUtc}";
            
            var blob = _cloudBlobContainer.GetBlockBlobReference($"{userId}/{noteTitle}/{defaultSectionTitle}/{defaultPageTitle}");
            blob.Metadata.Add(NotesKey, noteTitle);
            blob.Metadata.Add(SectionKey, defaultSectionTitle);
            blob.Metadata.Add(PageTitleKey, defaultPageTitle);
            await blob.UploadTextAsync(content, AccessCondition.GenerateIfNotExistsCondition(), new BlobRequestOptions() { },
                new OperationContext());
            return new BlobDto()
            {
                NotesTitle = noteTitle,
                SectionTitle = defaultSectionTitle,
                PageTitle = "DefaultPageTitle",
                LastModifiedUtc = blob.Properties.LastModified,
                PageLocation = blob.Name,
                Url = blob.Uri,
                Etag = blob.Properties.ETag
            };
        }

        public async Task<BlobDto> UpdateNote(string userId, string blobLocation, string content)
        {
            throw  new NotImplementedException();
        }
    }
}
