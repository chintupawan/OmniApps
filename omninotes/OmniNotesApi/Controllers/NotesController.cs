using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OmniNotesContracts;
using OmniNotesCore;
using OmniNotesModels.Models;

namespace OmniNotesApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Notes")]
    public class ReadNotesController : Controller
    {
        private readonly IOptions<OmniNotesSettings> _settings;
        private readonly IReadNotesRepository _notesRepository;
        private readonly ITakeNotesRepository _takeNotesRepository;
        private const string DefaultUser = "pavan";
        public ReadNotesController(IReadNotesRepository notesRepository, ITakeNotesRepository takeNotesRepository, IOptions<OmniNotesSettings> settings)
        {
            _notesRepository = notesRepository;
            _takeNotesRepository = takeNotesRepository;
            _settings = settings;
        }
        // GET: api/Notes
        [HttpGet]
        public async Task<IEnumerable<Note>> Get()
        {
            return await _notesRepository.GetAllNotes(DefaultUser);
        }

        // GET: api/Notes/5
        [HttpGet("{noteTitle}", Name = "Get")]
        public async Task<Note> Get(string noteTitle)
        {
            return await _notesRepository.GetNote(DefaultUser, noteTitle);
        }
        
        // POST: api/Notes
        [HttpPost("{noteTitle}")]
        public async Task<Note> Post(string noteTitle)
        {
            return await _takeNotesRepository.CreateNewNote(DefaultUser, noteTitle);
        }
        
        // PUT: api/Notes
        [HttpPut]
        public async Task Put([FromBody]Page page)
        {
            await _takeNotesRepository.CreatePage(DefaultUser, page);
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
