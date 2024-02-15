using EventManagementApp.Models;
using EventManagementApp.Models.DTOs;
using static System.Reflection.Metadata.BlobBuilder;

namespace EventManagementApp.Interfaces
{
    public interface IEventService
    {
        public EventDTO Add(EventDTO events);
        public Event Update(Event events);
        public List<Event> GetEvents();
        List<Event> GetByUserId(string UserId);
        public Event Remove(int Id);
        public Event GetByEventId(int Id);
    }
}
