using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OmniNotes.IntegrationTests;
using OmniNotesCore;

namespace OmniNotes_IntegrationTests
{
    [TestClass]
    public class TakeNotesRepositoryTests:TestBase
    {
        [TestMethod]
        public void CreateNoteTests()
        {
            var noteTitle = DateTime.UtcNow.ToString("MMddyyyyyhhmmsstt");
            AzureBlobStorage abs = new AzureBlobStorage(ConnectinStrings);
            TakeBlobNotesRepository takeNotes = new TakeBlobNotesRepository(abs);
            var note = takeNotes.CreateNewNote(UserId, noteTitle).Result;

            Assert.IsTrue(note.Title == noteTitle);
            Assert.IsTrue(note.Sections.Count == 1);
            Assert.IsTrue(!string.IsNullOrEmpty(note.Sections.First().Pages.First().RelativeLocation));
        }
    }
}
