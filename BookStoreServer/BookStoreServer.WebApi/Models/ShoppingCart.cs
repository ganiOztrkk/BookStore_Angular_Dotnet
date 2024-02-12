namespace BookStoreServer.WebApi.Models;

public sealed class ShoppingCart
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; }
    
    public int ShoeId { get; set; }
    public Shoe Shoe { get; set; }

    public int Quantity { get; set; }
    public int Size { get; set; }
    public decimal Price { get; set; }
}