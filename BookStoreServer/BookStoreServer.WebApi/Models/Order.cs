using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreServer.WebApi.Models;

public sealed class Order
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    
    [ForeignKey("Shoe")]
    public int ShoeId { get; set; }
    public Shoe Shoe { get; set; }
    public decimal Price { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime PaymentDate { get; set; }
    public string PaymentType { get; set; } = string.Empty;
    public string PaymentNumber { get; set; } = string.Empty;

    public static string GetNewOrderNumber()
    {
        return Guid.NewGuid().ToString();
    }
}