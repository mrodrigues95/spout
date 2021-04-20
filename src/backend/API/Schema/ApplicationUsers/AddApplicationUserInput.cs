namespace API.Schema.ApplicationUsers {
    public record AddApplicationUserInput(
        string FirstName,
        string LastName,
        string Email,
        string Password);
}
