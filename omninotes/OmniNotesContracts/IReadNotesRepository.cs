using System.Collections.Generic;
using OmniNotesModels.Models;

namespace OmniNotesContracts
{
    public interface IReadNotesRepository
    {
        IEnumerable<Note> GetAllNotes(string userId);
        Note GetNote(string userId, string noteTitle);
        Section GetSection(string userId, string noteTitle, string sectionTitle);
        IEnumerable<Section> GetSections(string userId, string noteTitle);
        Page GetPage(string userId, string noteTitle, string sectionTitle, string pageTitle);
        IEnumerable<Page> GetPages(string userId, string noteTitle, string sectionTitle);
    }
}
