using System.Threading.Tasks;
using OmniNotesModels.Models;

namespace OmniNotesContracts
{
    public interface ITakeNotesRepository
    {
        Task<Note> CreateNewNote(string userId, string noteTitle);
        Section CreateSection(string userId, string noteTitle, string section);
        Page CreatePage(string userId, string noteTitle, string sectionTitle, Page page);
    }
}