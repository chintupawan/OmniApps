using System.IO;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OmniNotes.IntegrationTests;
using OmniNotesCore;

namespace OmniNotes_IntegrationTests
{
    [TestClass]
    public class AzureBlobStorageIntegrationTests:TestBase
    {
        [TestMethod]
        public void GetAllNotesTest()
        {
            AzureBlobStorage abs = new AzureBlobStorage(ConnectinStrings);
            var notes = abs.GetAllNotesWithOutContent(UserId);
            var count = notes.Result.Count();
        }

        [TestMethod]
        public void DownloadNotesTest()
        {
            AzureBlobStorage abs = new AzureBlobStorage(ConnectinStrings);
            var notesString = abs.DownloadNotes(UserId, "pavan/Sec1/Page2.txt");
            var result = notesString.Result;
        }
    }
}
