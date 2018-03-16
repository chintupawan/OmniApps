using System.IO;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OmniNotesCore;

namespace OmniNotes_IntegrationTests
{
    [TestClass]
    public class AzureBlobStorageIntegrationTests
    {
        private string str = "UseDevelopmentStorage=true";
        private string userId = "pavan";
        [TestMethod]
        public void GetAllNotesTest()
        {
            AzureBlobStorage abs = new AzureBlobStorage(str);
            var notes = abs.GetAllNotesWithOutContent(userId);
            var count = notes.Result.Count();
        }

        [TestMethod]
        public void DownloadNotesTest()
        {
            AzureBlobStorage abs = new AzureBlobStorage(str);
            var notesString = abs.DownloadNotes(userId, "pavan/Sec1/Page2.txt");
            var result = notesString.Result;
        }
    }
}
