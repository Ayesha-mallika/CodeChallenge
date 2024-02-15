namespace EventManagementApp.Exceptions
{
    public class NoEventsAvailableException : Exception
    {
        string message;
        public NoEventsAvailableException()
        {
            message = "No Events are available In The Store";
        }
        public override string Message => message;
    }
}

