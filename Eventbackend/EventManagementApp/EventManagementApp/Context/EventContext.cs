using EventManagementApp.Models;
using Microsoft.EntityFrameworkCore;
namespace EventManagementApp.Context

{
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }


    }
}

