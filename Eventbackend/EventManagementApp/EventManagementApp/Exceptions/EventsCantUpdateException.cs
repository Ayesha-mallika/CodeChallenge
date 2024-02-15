namespace EventManagementApp.Exceptions
{
    public class EventsCantUpdateException : Exception
    {
        string message;
        public EventsCantUpdateException()
        {
            message = "Events are not able to update";
        }
        public override string Message => message;
    }
}
