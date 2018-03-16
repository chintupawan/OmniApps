using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OmniNotesContracts;
using OmniNotesModels.DTO;
using OmniNotesModels.Models;

namespace OmniNotesCore
{
    public class ReadBlobNotesRepository : IReadNotesRepository
    {
        private IStorage Storage { get; }
        public ReadBlobNotesRepository(IStorage storage)
        {
            Storage = storage;
        }

        /// <summary>
        /// Get all notes of a user
        /// </summary>
        /// <param name="userId">UserId</param>
        /// <returns></returns>
        public async Task<IEnumerable<Note>> GetAllNotes(string userId)
        {
            var notesDto = await Storage.GetAllNotesWithOutContent(userId);
            return MapDtoNotes(notesDto);
        }

        /// <summary>
        /// Helper method to Map DTO to Model
        /// </summary>
        /// <param name="notesDto"></param>
        /// <returns></returns>
        private static IEnumerable<Note> MapDtoNotes(IEnumerable<BlobDto> notesDto)
        {
            var notes = notesDto.GroupBy(i => i.NotesTitle)
                .Select(i => new Note
                {
                    Title = i.Key,
                    Sections = i.GroupBy(j => j.SectionTitle)
                        .Select(k => new Section()
                        {
                            Title = k.Key,
                            Pages = k.Select(l => new Page()
                            {
                                Title = l.PageTitle,
                                Body = l.Content,
                                LastModifiedDateTime = l.LastModifiedUtc.Value.DateTime,
                                SelfUrl = l.Url.AbsoluteUri,
                                RelativeLocation = l.PageLocation,
                                SectionTitle = l.SectionTitle,
                                NoteTitle = l.NotesTitle,
                            }).ToList()
                        }).ToList()
                });
            return notes;
        }

        /// <summary>
        /// Get full notes with content
        /// </summary>
        /// <param name="userId">UserId</param>
        /// <param name="noteTitle">noteTitle</param>
        /// <returns></returns>
        public async Task<Note> GetNote(string userId, string noteTitle)
        {
            var dto = await Storage.GetFullNotesWithContent(userId, noteTitle);
            return MapDtoNotes(dto).FirstOrDefault();
        }

        /// <summary>
        /// Get a particular page
        /// </summary>
        /// <param name="userId">userId</param>
        /// <param name="pageLocation">page relative location</param>
        /// <returns></returns>
        public async Task<Page> GetPage(string userId, string pageLocation)
        {
            var dto = await Storage.DownloadNotes(userId, pageLocation);
            var page = new Page
            {
                Title = dto.PageTitle,
                SectionTitle = dto.SectionTitle,
                Body = dto.Content,
                LastModifiedDateTime = dto.LastModifiedUtc.GetValueOrDefault().DateTime,
                NoteTitle = dto.NotesTitle,
                SelfUrl = dto.Url.AbsoluteUri,
                RelativeLocation = dto.PageLocation
            };
            return page;
        }

    }
}