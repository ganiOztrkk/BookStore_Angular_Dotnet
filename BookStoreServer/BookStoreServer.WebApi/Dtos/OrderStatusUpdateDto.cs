namespace BookStoreServer.WebApi.Dtos;

public sealed record OrderStatusUpdateDto(
    int OrderId,
    int Status);