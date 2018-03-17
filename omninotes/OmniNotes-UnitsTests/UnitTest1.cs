using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using OmniNotesContracts;
using OmniNotesCore;
using OmniNotesModels.DTO;

namespace OmniNotes_UnitsTests
{
    [TestClass]
    public class ReadBlobNotesRepositoryTests
    {
        [TestMethod]
        public void GetAllNotesTest()
        {
            var blobDto1 = new BlobDto()
            {
                Content = "Sample",
                SectionTitle = "SampleSection",
                PageLocation = "notes/section/page",
                PageTitle = "Sample Page",
                Url = new Uri("https://blahblah"),
                LastModifiedUtc = DateTimeOffset.UtcNow,
                NotesTitle = "Sample Notes",
                Etag = ""
            };
            var blobDto2 = new BlobDto()
            {
                Content = "Sample2",
                SectionTitle = "SampleSection2",
                PageLocation = "notes2/section2/page2",
                PageTitle = "Sample Page2",
                Url = new Uri("https://blahblah2"),
                LastModifiedUtc = DateTimeOffset.UtcNow,
                NotesTitle = "Sample Notes2",
                Etag = ""
            };

            var mockStorage = new Moq.Mock<IStorage>(MockBehavior.Strict);
            mockStorage.Setup(i => i.GetAllNotesWithOutContent(It.IsAny<string>()))
                .ReturnsAsync(() => new List<BlobDto>
                {
                   blobDto1,blobDto2
                });
            var readBlobNotesRepository = new ReadBlobNotesRepository(mockStorage.Object);
            var result = readBlobNotesRepository.GetAllNotes("Pavan").Result;

            Assert.IsTrue(result.First().Title.Equals("Sample Notes"));
        }
    }
}
