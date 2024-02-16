using BookStoreServer.WebApi.Models;

namespace BookStoreServer.WebApi.Dtos;

public sealed record OrderListDto(
    int Id,
    string OrderNumber,
    Shoe Shoe,
    decimal Price,
    DateTime PaymentDate,
    string PaymentType,
    string PaymentNumber,
    List<OrderStatus> OrderStatus
    );