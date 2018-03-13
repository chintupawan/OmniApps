using System.Collections.Generic;

namespace OmniNotesModels.Models
{
    public class Section
    {
        public Section()
        {
            Pages = new List<Page>();
        }
        public string Title { get; set; }
        public List<Page> Pages { get; set; }
        public string SelfUrl { get; set; }
    }
}