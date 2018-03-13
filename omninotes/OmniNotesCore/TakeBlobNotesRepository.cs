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
            var utc = DateTime.Now.ToString("O");
            string untitleSection = $"Untitled Section-{utc}";
            string untitlePage = $"Untitled Page-{utc}";

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

        public Page CreatePage(string userId, string noteTitle, string sectionTitle, Page page)
        {
            throw new NotImplementedException();
        }

        public Section CreateSection(string userId, string noteTitle, string sectionTitle)
        {
            throw new NotImplementedException();
        }
    }
}
