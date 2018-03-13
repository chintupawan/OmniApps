using System.IO;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OmniNotesCore;

namespace OmniNotes_IntegrationTests
{
    [TestClass]
    public class AzureBlobStorageIntegrationTests
    {
        private string str =
            "";
        [TestMethod]
        public void GetAllNotesTest()
        {
            AzureBlobStorage abs = new AzureBlobStorage(str);
            var notes = abs.GetAllNotesWithOutContent("pavan");
            var count = notes.Result.Count();
        }

        [TestMethod]
        public void DownloadNotesTest()
        {
            AzureBlobStorage abs = new AzureBlobStorage(str);
            var notesString = abs.DownloadNotes("pavan", "pavan/Sec1/Page2.txt");
            var result = notesString.Result;
        }
    }
}
