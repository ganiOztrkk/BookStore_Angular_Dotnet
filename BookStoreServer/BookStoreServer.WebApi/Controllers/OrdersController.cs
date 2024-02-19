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

    [HttpGet("{userId:int}")]
    public IActionResult GetAllByUserId(int userId)
    {

        var orders = _context.Orders
            .Where(x => x.UserId == userId)
            .Include(x => x.Shoe)
            .OrderByDescending(x => x.PaymentDate)
            .ToList();

        var orderListDtos = new List<OrderListDto>();

        foreach (var order in orders)
        {
            var orderStatuses = _context.OrderStatus.FirstOrDefault(p => p.OrderNumber == order.OrderNumber);
            var orderListDto = new OrderListDto(
                order.Id,
                order.OrderNumber,
                order.Shoe,
                order.Price,
                order.PaymentDate.ToShortDateString(),
                order.PaymentType,
                order.PaymentNumber,
                orderStatuses!.Status
            );

            orderListDtos.Add(orderListDto);
        }

        return Ok(orderListDtos);
    }
    
    [HttpGet("{orderNumber}")]
    public IActionResult GetByOrderNumber(string orderNumber)
    {

        var orders = _context.Orders
            .Where(x => x.OrderNumber == orderNumber)
            .Include(x => x.Shoe)
            .OrderByDescending(x => x.PaymentDate)
            .ToList();

        var orderListDtos = new List<OrderListDto>();

        foreach (var order in orders)
        {
            var orderStatuses = _context.OrderStatus.FirstOrDefault(p => p.OrderNumber == order.OrderNumber);
            var orderListDto = new OrderListDto(
                order.Id,
                order.OrderNumber,
                order.Shoe,
                order.Price,
                order.PaymentDate.ToShortDateString(),
                order.PaymentType,
                order.PaymentNumber,
                orderStatuses!.Status
            );

            orderListDtos.Add(orderListDto);
        }

        return Ok(orderListDtos);
    }
}