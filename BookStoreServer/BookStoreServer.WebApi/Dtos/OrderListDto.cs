using BookStoreServer.WebApi.Enums;
using BookStoreServer.WebApi.Models;

namespace BookStoreServer.WebApi.Dtos;

public sealed record OrderListDto(
    int Id,
    string OrderNumber,
    Shoe Shoe,
    decimal Price,
    string PaymentDate,
    string PaymentType,
    string PaymentNumber,
    OrderStatusEnum OrderStatus
    );