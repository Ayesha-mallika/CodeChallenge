using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EventManagementApp.Exceptions;
using EventManagementApp.Interfaces;
using EventManagementApp.Models;

namespace EventManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService bookService)
        {
            _eventService = bookService;
        }
        [HttpGet]
        public ActionResult GetAllEvents()
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _eventService.GetEvents();
                return Ok(result);
            }
            catch (NoEventsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpGet("GetByUserId")]
        public ActionResult GetById(string id)
        {
            string message = string.Empty;
            try
            {
                var result = _eventService.GetByUserId(id);
                if (result != null)
                {
                    return Ok(result);
                }
                message = "Could not Get book";
            }
            catch (Exception e)
            {
                message = e.Message;
            }
            return BadRequest(message);
        }
        [HttpGet("GetByEventId")]
        public ActionResult GetEventId(int id)
        {
            string message = string.Empty;
            try
            {
                var result = _eventService.GetByEventId(id);
                if (result != null)
                {
                    return Ok(result);
                }
                message = "Could not Get book";
            }
            catch (Exception e)
            {
                message = e.Message;
            }
            return BadRequest(message);
        }
        [HttpPost("AddEvent")]
        //[Authorize(Roles = "Admin")]
        public ActionResult Create(Event events)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _eventService.Add(events);
                return Ok(result);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        [Route("RemoveEvent")]
        public ActionResult RemoveEvent(int Id)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _eventService.Remove(Id);
                return Ok(result);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPut]
        public ActionResult Update(Event events)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _eventService.Update(events);
                return Ok(events);
            }
            catch (EventsCantUpdateException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }

        [HttpDelete]
        public ActionResult Remove(int Id)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _eventService.Remove(Id);
                return Ok("event deleted successfully");
            }
            catch (EventsCantRemoveException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
    }
}
