namespace BookStoreServer.WebApi.Enums;

public enum OrderStatusEnum
{
    PendingApproval,
    Preparing,
    InTransit,
    Delivered,
    Rejected,
    Returned
}