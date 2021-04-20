namespace API.Schema.Users {
    public record CreateUserInput(
        string FirstName,
        string LastName,
        string Email,
        string Password);
}
