using System.Collections.Generic;

namespace OmniNotesModels.Models
{
    public class Section
    {
        public string Title { get; set; }
        public IEnumerable<Page> Pages { get; set; }
        public string SelfUrl { get; set; }
    }
}