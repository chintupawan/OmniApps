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
        public async Task<Note> CreateNewNote(string userId, Note note)
        {
            const string untitleSection = "Untitled Section";
            const string untitlePage = "Untitled Page";
            var dto = await Storage.CreateNewNote(userId, note.Title, untitleSection ,untitlePage, "");
            note.Sections = new List<Section>();
            var section = new Section
            {
                Title = untitleSection,
                Pages = new List<Page>() { new Page() { Title = untitlePage } }
            };
            note.Sections.Add(section);

            var firstPage = note.Sections.First().Pages.First();
            firstPage.SelfUrl = dto.Url.AbsoluteUri;
            firstPage.LastModifiedDateTime = dto.LastModifiedUtc.Value.UtcDateTime;
            firstPage.RelativeLocation = dto.PageLocation;
            return note;
        }

        public Page CreatePage(string userId, string noteTitle, string sectionTitle, Page page)
        {
            throw new NotImplementedException();
        }

        public Section CreateSection(string userId, string noteTitle, Section section)
        {
            throw new NotImplementedException();
        }
    }
}
