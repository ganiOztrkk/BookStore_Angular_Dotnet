using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;

public sealed class ShoesController : BaseController
{
    private static List<Shoe> _shoes = new();

    public ShoesController()
    {
        _shoes = new();
        _shoes.Add(new Shoe()
        {
            Id = 1,
            Title = "Nike Pegasus 39 Shield",
            Description = "Hava Şartlarına Dayanıklı Erkek Yol Koşu Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9022903b-ed99-4f2d-a441-58eb7c19a66c/pegasus-39-shield-hava-%C5%9Fartlar%C4%B1na-dayan%C4%B1kl%C4%B1-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-Fp3SPv.png",
            Price = 3299.99M
        });
        _shoes.Add(new Shoe()
        {
            Id = 2,
            Title = "Nike Invincible 3",
            Description = "Erkek Yol Koşu Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4c41bcec-f8e9-4eaf-913d-e5fef6438749/invincible-3-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-0r1MPB.png",
            Price = 6799.99M
        });
        _shoes.Add(new Shoe()
        {
            Id = 3,
            Title = "Nike InfinityRN 4 GORE-TEX",
            Description = "Su Geçirmez Erkek Yol Koşu Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/91e44e83-f4e5-41af-83af-262b59e4e089/infinityrn-4-gore-tex-su-ge%C3%A7irmez-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-gpQ324.png",
            Price = 5999.99M
        });
        _shoes.Add(new Shoe()
        {
            Id = 4,
            Title = "Nike Alphafly 3",
            Description = "Erkek Yol Yarış Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/477abbf8-b37a-4fe6-b516-08e294a8487a/alphafly-3-yol-yar%C4%B1%C5%9F-ayakkab%C4%B1s%C4%B1-vNzQdQ.png",
            Price = 11999
        });

        for (int i = 5; i <= 100; i++)
        {
            _shoes.Add(new Shoe()
            {
                Id = i,
                Title = $"Nike Pegasus 39 Shield - {i}",
                Description = "Hava Şartlarına Dayanıklı Erkek Yol Koşu Ayakkabısı",
                ImageUrl =
                    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9022903b-ed99-4f2d-a441-58eb7c19a66c/pegasus-39-shield-hava-%C5%9Fartlar%C4%B1na-dayan%C4%B1kl%C4%B1-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-Fp3SPv.png",
                Price = 5999.99M
            });
        }
    }

    [HttpGet("{pageNumber}/{pageSize}")]
    public IActionResult GetAll(int pageNumber, int pageSize)
    {
        ResponseDto<List<Shoe>> response = new();
        response.PageNumber = pageNumber;
        response.PageSize = pageSize;
        response.TotalPageCount = (int)Math.Ceiling(_shoes.Count / (decimal)pageSize);
        response.IsFirstPage = pageNumber == 1;
        response.IsLastPage = pageNumber == response.TotalPageCount;
        response.Data = _shoes
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToList();

        return Ok(response);
    }
}