using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OmniNotesCore;

namespace OmniNotes_IntegrationTests
{
    [TestClass]
    public class TakeNotesRepositoryTests
    {
        private string str =
            "DefaultEndpointsProtocol=https;AccountName=omninotes;AccountKey=OELJ2YrYhD/0CFaGE5E73CjHSH1VyfSvVXQ9f4tV1jGyr2XFQHOzCLCgWAx7k3k0AgdO9/wBvA96suGkjy5uNg==";

        [TestMethod]
        public void CreateNoteTests()
        {
            var noteTitle = DateTime.UtcNow.ToString("MMddyyyyyhhmmsstt");
            AzureBlobStorage abs = new AzureBlobStorage(str);
            TakeBlobNotesRepository takeNotes = new TakeBlobNotesRepository(abs);
            var note = takeNotes.CreateNewNote("pavan", noteTitle).Result;

            Assert.IsTrue(note.Title == noteTitle);
            Assert.IsTrue(note.Sections.Count == 1);
            Assert.IsTrue(!string.IsNullOrEmpty(note.Sections.First().Pages.First().RelativeLocation));
        }
    }
}
