using System.Collections.Generic;
using System.Threading.Tasks;
using OmniNotesModels.DTO;

namespace OmniNotesContracts
{
    public interface IStorage
    {
        Task<IEnumerable<BlobDto>> GetAllNotesWithOutContent(string userId);
        Task<IEnumerable<BlobDto>> GetFullNotesWithContent(string userId, string noteTitle);
        Task<BlobDto> DownloadNotes(string userId, string blobName);

        Task<BlobDto> CreateNewNote(string userId, string noteTitle, string sectionTitle, string pageTitle,
            string content);
        Task<BlobDto> UpdateNote(string userId, string blobLocation, string content);
    }

   
}