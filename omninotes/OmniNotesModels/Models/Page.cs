using System;

namespace OmniNotesModels.Models
{
    public class Page
    {
        public DateTime CreateDateTime { get; set; }
        public DateTime LastModifiedDateTime { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string SelfUrl { get; set; }
        public string NoteTitle { get; set; }
        public string SectionTitle { get; set; }
        public string RelativeLocation { get; set; }
    }
}