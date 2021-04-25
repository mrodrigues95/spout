namespace API.Schema.Services.Auth {
    public record LoginUserInput(
        string Email,
        string Password);
}
