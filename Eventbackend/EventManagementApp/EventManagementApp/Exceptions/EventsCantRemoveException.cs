namespace EventManagementApp.Exceptions
{
    public class EventsCantRemoveException : Exception
    {
        string message;
        public EventsCantRemoveException()
        {
            message = "Events are not able to remove";
        }
        public override string Message => message;
    }
}
