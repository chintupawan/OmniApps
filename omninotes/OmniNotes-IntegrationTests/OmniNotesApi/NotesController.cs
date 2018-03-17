using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Extensions.Options;
using OmniNotesApi.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OmniNotesContracts;
using OmniNotesCore;

namespace OmniNotes.IntegrationTests.OmniNotesApi
{
    [TestClass]
    public class NotesControllerTests:TestBase
    {
        private ReadNotesController notesController = null;

        [TestInitialize]
        public void Init()
        {
            IOptions<OmniNotesSettings> settings = Options.Create(new OmniNotesSettings() { StorageConnectionString = "" });
            IStorage storage = new AzureBlobStorage(ConnectinStrings);
            ReadBlobNotesRepository readBlobNotesRepository = new ReadBlobNotesRepository(storage);
            ITakeNotesRepository takeNotesRepository = new TakeBlobNotesRepository(storage);
            notesController = new ReadNotesController(readBlobNotesRepository, takeNotesRepository, settings);
        }

        [TestMethod]
        public void GetAllNotesTest()
        {
            var allNotes = notesController.Get().Result;
            Assert.IsTrue(allNotes.Any());
        }

    }
}
