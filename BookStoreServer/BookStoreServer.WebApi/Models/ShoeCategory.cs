namespace BookStoreServer.WebApi.Models;

public sealed class ShoeCategory
{
    public int Id { get; set; }
    public int ShoeId { get; set; }
    public Shoe? Shoe { get; set; }
    
    public int CategoryId { get; set; }
}