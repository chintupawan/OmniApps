using System;
using System.Collections.Generic;

namespace OmniNotesModels.Models
{
    public class Note
    {
        public Note()
        {
            Sections = new List<Section>();
        }
        public string Title { get; set; }
        public List<Section> Sections { get; set; }
        public string SelfUrl { get; set; }
    }
}
