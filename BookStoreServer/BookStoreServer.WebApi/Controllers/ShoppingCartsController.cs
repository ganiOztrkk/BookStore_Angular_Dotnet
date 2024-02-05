using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;

public sealed class ShoppingCartsController : BaseController
{
    [HttpPost]
    public IActionResult Payment(PaymentDto paymentDto)
    {
        decimal totalPrice = 0;
        decimal comission = 0.1m;
        paymentDto.Shoes.ForEach(x =>
        {
            totalPrice += x.Price;
        });
        
        Options options = new Options();
        options.ApiKey = "sandbox-Hdm019F0rFt1NFv7IOeJ0Zh9pnOlSw5Q";
        options.SecretKey = "sandbox-0o6HUYwPP8CgqxY5zQABKldQ7vPP4CWX";
        options.BaseUrl = "https://sandbox-api.iyzipay.com";

        CreatePaymentRequest request = new CreatePaymentRequest();
        request.Locale = Locale.TR.ToString();
        request.ConversationId = Guid.NewGuid().ToString();
        request.Price = totalPrice.ToString();
        request.PaidPrice = (totalPrice * (1 * comission)).ToString();
        request.Currency = Currency.TRY.ToString();
        request.Installment = 1;
        request.BasketId = Order.GetNewOrderNumber();
        request.PaymentChannel = PaymentChannel.WEB.ToString();
        request.PaymentGroup = PaymentGroup.PRODUCT.ToString();

        request.PaymentCard = paymentDto.PaymentCard;

        Buyer buyer = paymentDto.Buyer;
        buyer.Id = Guid.NewGuid().ToString();
        request.Buyer = buyer;
        
        request.ShippingAddress = paymentDto.ShippingAddress;
        request.BillingAddress = paymentDto.BillingingAddress;

        List<BasketItem> basketItems = new List<BasketItem>();
        paymentDto.Shoes.ForEach(x =>
        {
            BasketItem item = new BasketItem();
            item.Id = x.Id.ToString();
            item.Name = x.Title;
            item.ItemType = BasketItemType.PHYSICAL.ToString();
            item.Price = x.Price.ToString();
            basketItems.Add(item);
        });
        request.BasketItems = basketItems;

        Payment payment =  Iyzipay.Model.Payment.Create(request, options);
        if (payment.Status =="success")
        {
            List<Order> orders = new();
            foreach (var item in paymentDto.Shoes)
            {
                var order = new Order
                {
                    OrderNumber = request.BasketId,
                    ShoeId = item.Id,
                    Price = item.Price,
                    PaymentDate = DateTime.Now,
                    PaymentType = "Credit Card",
                    PaymentNumber = payment.PaymentId
                };
                orders.Add(order);
            }

            var context = new AppDbContext();
            context.Orders.AddRange(orders);
            context.SaveChanges();
            return NoContent();
        }
        else
        {
            return BadRequest(payment.ErrorMessage);
        }
        
    }
}