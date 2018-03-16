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

        /// <summary>
        /// This is by UT
        /// </summary>
        /// <param name="connectionString"></param>
        public AzureBlobStorage(string connectionString)
        {
            if (CloudStorageAccount.TryParse(connectionString, out _storageAccount))
            {
                _cloudBlobClient = _storageAccount.CreateCloudBlobClient();
                _cloudBlobContainer = _cloudBlobClient.GetContainerReference(Container);

            }
        }

        /// <summary>
        /// This is the constructor used by DI
        /// </summary>
        /// <param name="settings"></param>
        public AzureBlobStorage(IOptions<OmniNotesSettings> settings)
        {
            if (CloudStorageAccount.TryParse(settings.Value.StorageConnectionString, out _storageAccount))
            {
                _cloudBlobClient = _storageAccount.CreateCloudBlobClient();
                _cloudBlobContainer = _cloudBlobClient.GetContainerReference(Container);

            }
        }

        /// <summary>
        /// Gets all notes of a particular User
        /// </summary>
        /// <param name="userId">UserId</param>
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
            var notes = await GetAllNotesOrFullNotes(userId, noteTitle);
            return notes;
        }

        /// <summary>
        /// Get full content of particular notes
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
                PageLocation = blobRef.Name,
                Etag = blobRef.Properties.ETag
            };
            dto.Content = await blobRef.DownloadTextAsync();
            return dto;
        }

        /// <summary>
        /// Create 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="noteTitle"></param>
        /// <param name="sectionTitle"></param>
        /// <param name="pageTitle"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public async Task<BlobDto> CreateNewNote(string userId, string noteTitle, string sectionTitle, string pageTitle, string content)
        {
            var blob = _cloudBlobContainer.GetBlockBlobReference($"{userId}/{noteTitle}/{sectionTitle}/{pageTitle}");
            blob.Metadata.Add(NotesKey, noteTitle);
            blob.Metadata.Add(SectionKey, sectionTitle);
            blob.Metadata.Add(PageTitleKey, pageTitle);
            await blob.UploadTextAsync(content, Encoding.UTF8, AccessCondition.GenerateIfNotExistsCondition(), new BlobRequestOptions() { },
                new OperationContext());
            return new BlobDto()
            {
                NotesTitle = noteTitle,
                SectionTitle = sectionTitle,
                PageTitle = pageTitle,
                LastModifiedUtc = blob.Properties.LastModified,
                PageLocation = blob.Name,
                Url = blob.Uri,
                Etag = blob.Properties.ETag
            };
        }

        /// <summary>
        /// CRUD a particular a Note
        /// </summary>
        /// <param name="userId">UserId</param>
        /// <param name="blobLocation">Blob location</param>
        /// <param name="content">Content</param>
        /// <param name="pagetitle">Page Title</param>
        /// <param name="sectionTitle">Section Title</param>
        /// <param name="noteTitle">Notes Title</param>
        /// <returns></returns>
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

        /// <summary>
        /// Get All Notes or a Specific Notes with Full Content
        /// </summary>
        /// <param name="userId">UserId</param>
        /// <param name="noteTitle">Optional Note Title</param>
        /// <returns></returns>
        private async Task<IEnumerable<BlobDto>> GetAllNotesOrFullNotes(string userId, string noteTitle = "")
        {
            BlobContinuationToken blobContinuationToken = null;
            var fullNotes = !string.IsNullOrWhiteSpace(noteTitle);
            var directory = !fullNotes
                            ? _cloudBlobContainer.GetDirectoryReference($"{userId}")
                            : _cloudBlobContainer.GetDirectoryReference($"{userId}/{noteTitle}");

            var blobs = await directory.ListBlobsSegmentedAsync(true, BlobListingDetails.Metadata, Int32.MaxValue,
                blobContinuationToken, new BlobRequestOptions(), new OperationContext());

            var notesTasks =  blobs.Results.Select(async i =>
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
                    Etag = bl.Properties.ETag,
                    Content = fullNotes ? await bl.DownloadTextAsync() : ""
                };
            });
            return await Task.WhenAll(notesTasks);
        }
    }
}
