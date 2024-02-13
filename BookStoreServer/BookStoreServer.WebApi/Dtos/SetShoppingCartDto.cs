namespace BookStoreServer.WebApi.Dtos;

public sealed record SetShoppingCartDto(
    int UserId,
    int ShoeId,
    string Title,
    string Description,
    string ImageUrl,
    int Quantity,
    int Size,
    decimal Price
    );