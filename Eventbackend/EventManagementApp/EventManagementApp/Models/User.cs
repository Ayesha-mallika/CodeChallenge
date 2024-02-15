using System.ComponentModel.DataAnnotations;

namespace EventManagementApp.Models
{
    public class User
    {

        [Required(ErrorMessage = "UserName cannot be empty")]
        public string Username { get; set; }
        [Key]
        public int UserId { get; set; }
        public string Email { get; set; }
        public byte[] Password { get; set; }
        public string Role { get; set; }
        public byte[] Key { get; set; }

    }
}

