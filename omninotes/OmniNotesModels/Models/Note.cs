using System;
using System.Collections.Generic;

namespace OmniNotesModels.Models
{
    public class Note
    {
        public string Title { get; set; }
        public IEnumerable<Section> Sections { get; set; }
        public string SelfUrl { get; set; }
    }
}
