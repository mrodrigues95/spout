namespace API.GraphQL.ApplicationUsers {
    public record AddApplicationUserInput(
        string Name,
        string Email,
        string Password);
}
