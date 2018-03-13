using System.Threading.Tasks;
using OmniNotesModels.Models;

namespace OmniNotesContracts
{
    public interface ITakeNotesRepository
    {
        Task<Note> CreateNewNote(string userId, string noteTitle);
        Section CreateSection(string userId, string noteTitle, string section);
        Task<Page> CreatePage(string userId, Page page);
    }
}