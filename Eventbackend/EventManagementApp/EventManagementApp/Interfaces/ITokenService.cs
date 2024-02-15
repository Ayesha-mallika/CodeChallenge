using EventManagementApp.Models.DTOs;
namespace EventManagementApp.Interfaces
{
    public interface ITokenService
    {
        string GetToken(UserDTO user);
    }
}
