using System;
using System.Collections.Generic;
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
        public IEnumerable<Note> GetAllNotes(string userId)
        {
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