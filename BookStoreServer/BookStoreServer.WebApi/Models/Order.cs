using System.ComponentModel.DataAnnotations.Schema;
using BookStoreServer.WebApi.Context;

namespace BookStoreServer.WebApi.Models;

public sealed class Order
{
    public int Id { get; set; }
    public int? UserId { get; set; }
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
        const string initialLetter = "AYT"; // firma imzası 
        var year = DateTime.Now.Year.ToString(); // fatura yılı
        var orderNumber = initialLetter + year;
    
        var context = new AppDbContext();
        var lastOrder = context.Orders.OrderByDescending(x => x.Id).FirstOrDefault();
        if (lastOrder is not null)
        {
            var lastOrderYear = lastOrder.CreatedAt.Year;
            // Yeni yıla geçildiğinde sipariş numarasını sıfırlarız
            if (lastOrderYear < DateTime.Now.Year)
            {
                orderNumber += "000000001";
            }
            else
            {
                var orderNumberInt = int.Parse(lastOrder.OrderNumber.Substring(7));
                orderNumberInt++;
                orderNumber += orderNumberInt.ToString("D9");
            }
        }
        else
        {
            orderNumber += "000000001";
        }
        return orderNumber;
    }
    
}