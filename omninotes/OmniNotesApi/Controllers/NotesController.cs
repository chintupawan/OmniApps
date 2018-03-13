using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OmniNotesContracts;
using OmniNotesModels.Models;

namespace OmniNotesApi.Controllers
{
    [Produces("application/json")]
    [Route("api/ReadNotes")]
    public class ReadNotesController : Controller
    {
        private readonly IReadNotesRepository _notesRepository;
        private readonly ITakeNotesRepository _takeNotesRepository;
        public ReadNotesController(IReadNotesRepository notesRepository, ITakeNotesRepository takeNotesRepository)
        {
            _notesRepository = notesRepository;
            _takeNotesRepository = takeNotesRepository;
        }
        // GET: api/Notes
        [HttpGet]
        public async Task<IEnumerable<Note>> Get()
        {
            return await _notesRepository.GetAllNotes("pavan");
        }

        // GET: api/Notes/5
        [HttpGet("{noteTitle}", Name = "Get")]
        public async Task<Note> Get(string noteTitle)
        {
            return await _notesRepository.GetNote("", noteTitle);
        }
        
        // POST: api/Notes
        [HttpPost("{noteTitle}")]
        public async Task<Note> Post(string noteTitle)
        {
            return await _takeNotesRepository.CreateNewNote("", noteTitle);
        }
        
        // PUT: api/Notes/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
