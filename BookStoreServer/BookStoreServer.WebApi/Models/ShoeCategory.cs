namespace BookStoreServer.WebApi.Models;

public sealed class ShoeCategory
{
    //composite key
    public int ShoeId { get; set; }
    public Shoe Shoe { get; set; }
    
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}