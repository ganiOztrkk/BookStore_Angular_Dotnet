using BookStoreServer.WebApi.Enums;
using BookStoreServer.WebApi.Models;

namespace BookStoreServer.WebApi.Dtos;

public class GetOrdersDto
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public string OrderNumber { get; set; }
    public DateTime PaymentDate { get; set; }
    public string PaymentType { get; set; }
    public string PaymentNumber { get; set; }
    public OrderStatusEnum OrderStatus { get; set; }
}