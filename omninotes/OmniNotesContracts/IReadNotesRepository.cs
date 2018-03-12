using System.Collections.Generic;
using System.Threading.Tasks;
using OmniNotesModels.Models;

namespace OmniNotesContracts
{
    public interface IReadNotesRepository
    {
        Task<IEnumerable<Note>> GetAllNotes(string userId);
        Task<Note> GetNote(string userId, string noteTitle);
        Task<Page> GetPage(string userId, string pageLocation);
    }
}
