namespace BookStoreServer.WebApi.Dtos;

public sealed record SetShoppingCartDto(
    int UserId,
    int ShoeId,
    int Quantity,
    int Size,
    decimal Price
    );