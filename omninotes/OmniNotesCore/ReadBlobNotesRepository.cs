using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OmniNotesContracts;
using OmniNotesModels.Models;

namespace OmniNotesCore
{
    public class ReadBlobNotesRepository : IReadNotesRepository
    {
        private IStorage Storage { get; }
        public ReadBlobNotesRepository(IStorage storage)
        {
            Storage = storage;
        }
        public async Task<IEnumerable<Note>> GetAllNotes(string userId)
        {
            var notesDto = await Storage.GetAllNotes(userId);
            notesDto.GroupBy(i => i.NotesTitle).GroupBy(i => i.GroupBy(j => j.SectionTitle));
            throw  new NotImplementedException();
        }

        public Note GetNote(string userId, string noteTitle)
        {
            throw new NotImplementedException();
        }

        public Section GetSection(string userId, string noteTitle, string sectionTitle)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Section> GetSections(string userId, string noteTitle)
        {
            throw new NotImplementedException();
        }

        public Page GetPage(string userId, string noteTitle, string sectionTitle, string pageTitle)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Page> GetPages(string userId, string noteTitle, string sectionTitle)
        {
            throw new NotImplementedException();
        }
    }
}