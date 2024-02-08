namespace BookStoreServer.WebApi.Options;

public class EmailSettings
{
    public string Smtp { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int Port { get; set; }
    public bool SSL { get; set; }
    public bool Html { get; set; }
}