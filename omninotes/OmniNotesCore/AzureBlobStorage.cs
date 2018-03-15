using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using OmniNotesContracts;
using OmniNotesModels.DTO;

namespace OmniNotesCore
{
    public class OmniNotesSettings
    {
        public string StorageConnectionString { get; set; }
    }

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

        public AzureBlobStorage(IOptions<OmniNotesSettings> settings)
        {
            if (CloudStorageAccount.TryParse(settings.Value.StorageConnectionString, out _storageAccount))
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
        public async Task<IEnumerable<BlobDto>> GetAllNotesWithOutContent(string userId)
        {
            return await GetAllNotesOrFullNotes(userId);
        }

        /// <summary>
        /// Gets a note with Full Content
        /// </summary>
        /// <param name="userId">userId</param>
        /// <param name="noteTitle">notes title</param>
        /// <returns>BlobDto</returns>
        public async Task<IEnumerable<BlobDto>> GetFullNotesWithContent(string userId, string noteTitle)
        {
            return await GetAllNotesOrFullNotes(userId, noteTitle);
        }

        /// <summary>
        /// Download notes
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="blobName"></param>
        /// <returns></returns>
        public async Task<BlobDto> DownloadNotes(string userId, string blobLocation)
        {
            var blobRef = _cloudBlobContainer.GetBlockBlobReference(blobLocation);
            var dto = new BlobDto()
            {
                PageTitle = blobRef.Metadata[PageTitleKey],
                SectionTitle = blobRef.Metadata[SectionKey],
                NotesTitle = blobRef.Metadata[NotesKey],
                Url = blobRef.Uri,
                LastModifiedUtc = blobRef.Properties.LastModified,
                PageLocation = blobRef.Name
            };
            dto.Content = await blobRef.DownloadTextAsync();
            return dto;
        }

        public async Task<BlobDto> CreateNewNote(string userId, string noteTitle, string sectionTitle, string pageTitle, string content)
        {
            var currentUtc = DateTime.UtcNow.ToString("MMddyyyyhhmmsstt");
            string defaultSectionTitle = !string.IsNullOrEmpty(sectionTitle) ? sectionTitle : "Section1";
            string defaultPageTitle = !string.IsNullOrEmpty(pageTitle) ? pageTitle : $"Page1{currentUtc}";

            var blob = _cloudBlobContainer.GetBlockBlobReference($"{userId}/{noteTitle}/{defaultSectionTitle}/{defaultPageTitle}");
            blob.Metadata.Add(NotesKey, noteTitle);
            blob.Metadata.Add(SectionKey, defaultSectionTitle);
            blob.Metadata.Add(PageTitleKey, defaultPageTitle);
            await blob.UploadTextAsync(content, Encoding.UTF8, AccessCondition.GenerateIfNotExistsCondition(), new BlobRequestOptions() { },
                new OperationContext());
            return new BlobDto()
            {
                NotesTitle = noteTitle,
                SectionTitle = defaultSectionTitle,
                PageTitle = defaultPageTitle,
                LastModifiedUtc = blob.Properties.LastModified,
                PageLocation = blob.Name,
                Url = blob.Uri,
                Etag = blob.Properties.ETag
            };
        }

        public async Task<BlobDto> UpdateNote(string userId, string blobLocation, string content, string pagetitle, string sectionTitle, string noteTitle)
        {
            var blob = _cloudBlobContainer.GetBlockBlobReference($"{blobLocation}");
            blob.Metadata.Add(NotesKey, noteTitle);
            blob.Metadata.Add(SectionKey, sectionTitle);
            blob.Metadata.Add(PageTitleKey, pagetitle);
            await blob.UploadTextAsync(content, Encoding.UTF8, AccessCondition.GenerateEmptyCondition(),
                new BlobRequestOptions() { }, new OperationContext());
            return new BlobDto()
            {
                NotesTitle = blob.Metadata[NotesKey],
                SectionTitle = blob.Metadata[SectionKey],
                PageTitle = blob.Metadata[PageTitleKey],
                LastModifiedUtc = blob.Properties.LastModified,
                PageLocation = blob.Name,
                Url = blob.Uri,
                Etag = blob.Properties.ETag
            };
        }

        private async Task<IEnumerable<BlobDto>> GetAllNotesOrFullNotes(string userId, string noteTitle = "")
        {
            BlobContinuationToken blobContinuationToken = null;
            var directory = string.IsNullOrWhiteSpace(noteTitle)
                            ? _cloudBlobContainer.GetDirectoryReference($"{userId}")
                            : _cloudBlobContainer.GetDirectoryReference($"{userId}/{noteTitle}");

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
    }
}
