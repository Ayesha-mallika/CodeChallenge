namespace EventManagementApp.Exceptions
{
    public class NoSuchEventsAvailableException : Exception
    {
        string message = "";
        public NoSuchEventsAvailableException()
        {
            message = "No Such Book is available In The Store";
        }
        public override string Message => message;

    }
}
