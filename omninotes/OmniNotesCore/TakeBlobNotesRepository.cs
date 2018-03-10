using System;
using System.Collections.Generic;
using System.Text;
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
        public Note CreateNewNote(string userId, Note note)
        {
            throw  new NotImplementedException();
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
