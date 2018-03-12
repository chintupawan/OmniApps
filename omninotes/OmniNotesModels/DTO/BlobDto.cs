using System;
using System.Collections.Generic;
using System.Text;

namespace OmniNotesModels.DTO
{
    public class BlobDto
    {
        public string NotesTitle { get; set; }
        public string SectionTitle { get; set; }
        public string PageTitle { get; set; }
        public string PageLocation { get; set; }
        public DateTimeOffset? LastModifiedUtc { get; set; }
        public Uri Url { get; set; }
        public long Length { get; set; }
        public string Etag { get; set; }
        public string Content { get; set; }
    }
}
