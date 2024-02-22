using AutoMapper;
using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreServer.WebApi.Controllers;

public sealed class OrdersController : BaseController
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public OrdersController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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

    [HttpGet]
    public IActionResult GettAllOrders()
    {
        var orders = _context.Orders
            .GroupBy(x => x.OrderNumber)
            .Select(x => x.FirstOrDefault())
            .ToList()
            .OrderByDescending(x => x.Id)
            .ToList();
        
        var ordersDto = _mapper.Map<List<GetOrdersDto>>(orders);
        ordersDto.ForEach(x =>
        {
            var orderStatus = _context.OrderStatus.FirstOrDefault(status => status.OrderNumber == x.OrderNumber);
            x.OrderStatus = orderStatus!.Status;
        });
        return Ok(ordersDto);
    }

    [HttpPost]
    public IActionResult UpdateOrderStatus(OrderStatusUpdateDto orderStatusUpdateDto)
    {
        var order = _context.Orders.FirstOrDefault(x => x.Id == orderStatusUpdateDto.OrderId);
        var orderStatus = _context.OrderStatus.FirstOrDefault(x => x.OrderNumber == order.OrderNumber);
        orderStatus!.Status = (OrderStatusEnum)orderStatusUpdateDto.Status;
        
        _context.Update(orderStatus);
        _context.SaveChanges();
        
        return NoContent();
    }
}