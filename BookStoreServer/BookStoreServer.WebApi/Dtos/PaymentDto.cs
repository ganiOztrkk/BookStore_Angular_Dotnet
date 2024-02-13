using BookStoreServer.WebApi.Models;
using Iyzipay.Model;

namespace BookStoreServer.WebApi.Dtos;

public sealed record PaymentDto(
    int UserId,
    List<Shoe> Shoes,
    Buyer Buyer,
    Address ShippingAddress,
    Address BillingAddress,
    PaymentCard PaymentCard
    );