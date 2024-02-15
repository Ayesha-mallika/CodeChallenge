using System.ComponentModel.DataAnnotations;

namespace EventManagementApp.Models.DTOs
{
    public class EventDTO
    {
        [Required(ErrorMessage = "Title cannot be empty")]
        public string Title { get; set; } = "";
        [Required(ErrorMessage = "UserId cannot be empty")]
        public string UserId { get; set; } = "";
        [Required(ErrorMessage = "Author cannot be empty")]
        public string Description { get; set; } = "";
        [Required(ErrorMessage = "Genre cannot be empty")]
        public string Location { get; set; } = "";
        public string maxAttendees { get; set; } = "";

        [Required(ErrorMessage = "Publish Date cannot be empty")]
        public DateTime Date { get; set; }
        [Required(ErrorMessage = "Price cannot be empty")]
        public int registerationFee { get; set; }
        [Required(ErrorMessage = "Image is Mandatory")]
        public IFormFile? Image { get; set; }
    }
}