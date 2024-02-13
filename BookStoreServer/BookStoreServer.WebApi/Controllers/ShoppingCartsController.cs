using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Enums;
using BookStoreServer.WebApi.Models;
using BookStoreServer.WebApi.Services;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreServer.WebApi.Controllers;

public sealed class ShoppingCartsController : BaseController
{



    [HttpGet("{userId:int}")]
    public IActionResult GetUserCart(int userId)
    {
        var context = new AppDbContext();
        var shoes = context.ShoppingCarts
            .AsQueryable()
            .Where(x => x.UserId == userId)
            .Include(x => x.Shoe)
            .Select(x => new Shoe
            {
                Id = x.Shoe.Id,
                Title = x.Shoe.Title,
                Description = x.Shoe.Description,
                ImageUrl = x.Shoe.ImageUrl,
                Price = x.Price,
                IsActive = x.Shoe.IsActive,
                IsDeleted = x.Shoe.IsDeleted,
                CreateAt = x.Shoe.CreateAt
            }).ToList();
        
        
        return Ok(shoes);
    }
    

    [HttpPost]
    public IActionResult SetShoppingCartFromLocalStorage(List<SetShoppingCartDto> request)
    {
        var context = new AppDbContext();
        var shoppingCart = new List<ShoppingCart>();
        
        request.ForEach(x =>
        {
            var shoppingCartProduct = new ShoppingCart
            {
                UserId = x.UserId,
                ShoeId = x.ShoeId,
                Quantity = x.Quantity,
                Size = x.Size,
                Price = x.Price
            };
            shoppingCart.Add(shoppingCartProduct);
        });
        context.AddRange(shoppingCart);
        context.SaveChanges();
        return NoContent();
    }
    
    
    [HttpPost]
    public IActionResult Payment(PaymentDto paymentDto)
    {
        decimal totalPrice = 0;
        paymentDto.Shoes.ForEach(x => { totalPrice += x.Price; });
        decimal comission = totalPrice * 1.1m;

        Iyzipay.Options options = new Iyzipay.Options();
        options.ApiKey = "sandbox-Hdm019F0rFt1NFv7IOeJ0Zh9pnOlSw5Q";
        options.SecretKey = "sandbox-0o6HUYwPP8CgqxY5zQABKldQ7vPP4CWX";
        options.BaseUrl = "https://sandbox-api.iyzipay.com";

        CreatePaymentRequest request = new CreatePaymentRequest();
        request.Locale = Locale.TR.ToString();
        request.ConversationId = Guid.NewGuid().ToString();
        request.Price = totalPrice.ToString().Replace(",", ".");
        request.PaidPrice = comission.ToString().Replace(",", ".");
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
        request.BillingAddress = paymentDto.BillingAddress;

        List<BasketItem> basketItems = new List<BasketItem>();
        paymentDto.Shoes.ForEach(x =>
        {
            BasketItem item = new BasketItem();
            item.Id = x.Id.ToString();
            item.Category1 = "Shoe";
            item.Category2 = "Shoe";
            item.Name = x.Title;
            item.ItemType = BasketItemType.PHYSICAL.ToString();
            item.Price = x.Price.ToString().Replace(",", ".");
            basketItems.Add(item);
        });

        request.BasketItems = basketItems;

        Payment payment = Iyzipay.Model.Payment.Create(request, options);
        if (payment.Status == "success")
        {
            var orderNumber = Order.GetNewOrderNumber();
            List<Order> orders = new();
            paymentDto.Shoes.ForEach(x =>
            {
                var order = new Order
                {
                    OrderNumber = orderNumber,
                    ShoeId = x.Id,
                    Price = x.Price,
                    PaymentDate = DateTime.Now,
                    PaymentType = "Credit Card",
                    PaymentNumber = payment.PaymentId,
                    CreatedAt = DateTime.Now
                };
                orders.Add(order);
            });
            var orderStatus = new OrderStatus()
            {
                OrderNumber = orderNumber,
                Status = OrderStatusEnum.PendingApproval,
                StatusDate = DateTime.Now
            };
            var context = new AppDbContext();
            context.OrderStatus.Add(orderStatus);
            context.Orders.AddRange(orders);
            context.SaveChanges();

            var successMailSubject = "Satın Alma Bilgilendirme";
            var successMailBody = 
                $@"
            <p>Sayın {paymentDto.Buyer.Name} {paymentDto.Buyer.Surname},</p>
            <p>Siparişiniz için teşekkür ederiz! JustKicks Store olarak, bizimle alışveriş yapmayı tercih ettiğiniz için memnuniyet duyuyoruz.</p>
    
            <h3>Sipariş Detayları:</h3>
            <ul>
                <li><strong>Sipariş Numarası:</strong> {orderNumber}</li>
                <li><strong>Sipariş Tarihi:</strong> {orders[0].PaymentDate.ToShortDateString()}</li>
                <li><strong>Ödeme Yöntemi:</strong> {orders[0].PaymentType}</li>
            </ul>

            <h3>Teslimat Bilgileri:</h3>
            <ul>
                <li><strong>Alıcı Adı:</strong> {paymentDto.ShippingAddress.ContactName}</li>
                <li><strong>Teslimat Adresi:</strong> {paymentDto.ShippingAddress.Description}</li>
                <li><strong>Tahmini Teslimat Tarihi:</strong> {orders[0].PaymentDate.AddDays(3).ToShortDateString()}</li>
            </ul>

            <h3>Ödeme Bilgileri:</h3>
            <ul>
                <li><strong>Toplam Tutar:</strong> {request.Price}</li>
                <li><strong>Ödenen Tutar:</strong> {request.PaidPrice}</li>
                <li><strong>Kullanılan Ödeme Yöntemi:</strong> {orders[0].PaymentType}</li>
            </ul>

            <h3>İletişim Bilgileri:</h3>
            <p>Siparişinizle ilgili herhangi bir sorunuz veya endişeniz varsa, lütfen çekinmeden bizimle iletişime geçin. Müşteri hizmetleri ekibimiz her zaman yardımcı olmaktan mutluluk duyacaktır.</p>
            <p>Telefon: +90 530 999 99 99</p>
            
            <p>İlginiz ve güveniniz için tekrar teşekkür ederiz.</p>
            <p>Saygılarımla,</p>
            <p>Gani Ozturk<br>
            Müşteri Hizmetleri Departmanı<br>
            JustKicks Store<br>
            Tekirdag / Cerkezkoy<br>
            Tel: +90 530 999 99 99<br>
            Web: <a href=""www.justkicks.com"">www.justkicks.com</a></p>
            ";
            var mailResponse = MailService.SendEmailAsync(paymentDto.Buyer.Email, successMailSubject, successMailBody);

            return NoContent();
        }
        else
        {
            return BadRequest(new { Message = payment.ErrorMessage });
        }
    }
}