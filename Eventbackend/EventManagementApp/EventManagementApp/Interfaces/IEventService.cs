using EventManagementApp.Models;
using static System.Reflection.Metadata.BlobBuilder;

namespace EventManagementApp.Interfaces
{
    public interface IEventService
    {
        public Event Add(Event events);
        public Event Update(Event events);
        public List<Event> GetEvents();
        List<Event> GetByUserId(string UserId);
        public Event Remove(int Id);
        public List<Event> GetByEventId(int Id);
    }
}
