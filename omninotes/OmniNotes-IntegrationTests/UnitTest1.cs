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
            "DefaultEndpointsProtocol=https;AccountName=omninotes;AccountKey=OELJ2YrYhD/0CFaGE5E73CjHSH1VyfSvVXQ9f4tV1jGyr2XFQHOzCLCgWAx7k3k0AgdO9/wBvA96suGkjy5uNg==";
        [TestMethod]
        public void GetAllNotesTest()
        {
            AzureBlobStorage abs = new AzureBlobStorage(str);
            var notes = abs.GetAllNotes("pavan");
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
