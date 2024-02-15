using EventManagementApp.Interfaces;
using EventManagementApp.Models;
using EventManagementApp.Exceptions;
using EventManagementApp.Repositories;
using static System.Reflection.Metadata.BlobBuilder;
using EventManagementApp.Models.DTOs;

namespace EventManagementApp.Services
{
    public class EventService : IEventService
    {
        private readonly IEventService _eventRepository;
        private readonly IRepository<int, Event> repository;
        public EventService(IRepository<int, Event> _repository)
        {
            repository = _repository;
        }

        public EventDTO Add(EventDTO eventDTO)
        {
            if (eventDTO == null)
            {
                return null;
            }
            else
            {
                Event events = new Event()
                {
                    Title = eventDTO.Title,
                    Description = eventDTO.Description,
                    UserId = eventDTO.UserId,
                    Date = eventDTO.Date,
                    Location = eventDTO.Location,
                    registrationFee = eventDTO.registrationFee,
                    maxAttendees = eventDTO.maxAttendees,
                    Image = "http://localhost:5086/Images/" + eventDTO.Image.FileName
                };
                var result = repository.Add(events);
                if (result != null)
                {
                    return eventDTO;
                }
                return null;
            }
        }

        public Event Update(Event events)
        {
            var EventTitle = repository.GetAll().FirstOrDefault(e => e.Id == events.Id);
            if (EventTitle != null)
            {
                var result = repository.Update(events);
                if (result != null) return result;
            }
            return EventTitle;
        }
        public Event Remove(int Id)
        {
            var EventId = repository.GetAll().FirstOrDefault(e => e.Id == Id);
            if (EventId != null)
            {
                var result = repository.Delete(EventId.Id);
                if (result != null) return result;
            }
            return EventId;
        }


        public List<Event> GetEvents()
        {
            var events = repository.GetAll();
            if (events != null)
            {
                return events.ToList();
            }
            throw new NoEventsAvailableException();
        }

        public List<Event> GetByUserId(string UserId)
        {
            try
            {
                var events = repository.GetAll().Where(c => c.UserId == UserId).ToList();
                if (events != null)
                {
                    return events;
                }
            }
            catch (Exception)
            {
                throw new NoEventsAvailableException();
            }
            return null;
        }
        public Event GetByEventId(int Id)
        {
            try
            {
                var events = repository.GetById(Id);
                if (events != null)
                {
                    return events;
                }
            }
            catch (Exception)
            {
                throw new NoEventsAvailableException();
            }
            return null;
        }



    }
}