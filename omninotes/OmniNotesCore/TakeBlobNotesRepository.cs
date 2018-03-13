using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OmniNotesContracts;
using OmniNotesModels.Models;


namespace OmniNotesCore
{
    public class TakeBlobNotesRepository : ITakeNotesRepository
    {
        private IStorage Storage { get; }
        public TakeBlobNotesRepository(IStorage storage)
        {
            Storage = storage;
        }
        public async Task<Note> CreateNewNote(string userId, string noteTitle)
        {
            string untitleSection = $"Untitled Section-{noteTitle}";
            string untitlePage = $"Untitled Page-{noteTitle}";

            var dto = await Storage.CreateNewNote(userId, noteTitle, untitleSection, untitlePage, "");
            var note = new Note() { Title = noteTitle };
            var section = new Section { Title = untitleSection };
            var page = new Page()
            {
                Title = untitlePage,
                SelfUrl = dto.Url.AbsoluteUri,
                LastModifiedDateTime = dto.LastModifiedUtc?.UtcDateTime ?? DateTime.UtcNow,
                RelativeLocation = dto.PageLocation
            };

            section.Pages.Add(page);
            note.Sections.Add(section);
            return note;
        }

        public async Task<Page> CreatePage(string userId, Page page)
        {
            var dto = await Storage.UpdateNote(userId, page.RelativeLocation, page.Body, page.Title, page.SectionTitle, page.NoteTitle);
            var updatedPage = new Page()
            {
                Title = dto.PageTitle,
                SectionTitle = dto.SectionTitle,
                RelativeLocation = dto.PageLocation,
                NoteTitle = dto.PageTitle,
                LastModifiedDateTime = dto.LastModifiedUtc?.UtcDateTime ?? DateTime.UtcNow,
                SelfUrl = dto.PageLocation,
                Body = dto.Content,
            };
            return updatedPage;
        }

        public Section CreateSection(string userId, string noteTitle, string sectionTitle)
        {
            throw new NotImplementedException();
        }
    }
}
