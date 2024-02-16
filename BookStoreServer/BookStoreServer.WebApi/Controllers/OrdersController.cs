using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreServer.WebApi.Controllers;

public sealed class OrdersController : BaseController
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("userId")]
    public IActionResult GetAllByUserId(int userId)
    {

        var orders = _context.Orders
            .Where(x => x.UserId == userId)
            .Include(x => x.Shoe)
            .OrderBy(x => x.PaymentDate)
            .ToList();

        var orderListDtos = new List<OrderListDto>();

        foreach (var order in orders)
        {
            var orderStatuses = _context.OrderStatus.Where(p => p.OrderNumber == order.OrderNumber).ToList();
            var orderListDto = new OrderListDto(
                order.Id,
                order.OrderNumber,
                order.Shoe,
                order.Price,
                order.PaymentDate,
                order.PaymentType,
                order.PaymentNumber,
                orderStatuses
            );

            orderListDtos.Add(orderListDto);
        }

        return Ok(orderListDtos);
    }
}