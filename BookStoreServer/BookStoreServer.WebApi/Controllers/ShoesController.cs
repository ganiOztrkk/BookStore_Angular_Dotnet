using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;

public sealed class ShoesController : BaseController
{
    [HttpPost]
    public IActionResult GetAll(RequestDto request)
    {
        ResponseDto<List<Shoe>> response = new();

        List<Shoe> filteredShoes;
        
        if (request.CategoryId != null) 
        {
            filteredShoes =
                SeedData.ShoeCategories
                    .Where(x => x.CategoryId == request.CategoryId)
                    .Select(x=> x.Shoe)
                    .ToList()!;
        }
        else
        {
            filteredShoes = SeedData.Shoes;
        }
        
        filteredShoes =
            filteredShoes
                .Where(x => x.Title.ToLower().Contains(request.Search.ToLower()))
                .ToList();
        
        response.Data =
            filteredShoes
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();
        
        response.PageNumber = request.PageNumber;
        response.PageSize = request.PageSize;
        response.TotalPageCount = (int)Math.Ceiling(filteredShoes.Count / (decimal)request.PageSize);
        response.IsFirstPage = request.PageNumber == 1;
        response.IsLastPage = request.PageNumber == response.TotalPageCount;

        return Ok(response);
    }
}

public static class SeedData
{
    public static readonly List<Shoe> Shoes = new ShoeService().CreateSeedShoeData();
    public static readonly List<Category> Categories = new ShoeService().CreateSeedCategoryData();
    public static readonly List<ShoeCategory> ShoeCategories = new ShoeService().CreateSeedShoeCategoryData();
}
public class ShoeService
{
    private readonly List<Shoe> shoes = new()
    {
        new Shoe()
        {
            Id = 1,
            Title = "Nike Pegasus 39 Shield",
            Description = "Hava Şartlarına Dayanıklı Erkek Yol Koşu Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9022903b-ed99-4f2d-a441-58eb7c19a66c/pegasus-39-shield-hava-%C5%9Fartlar%C4%B1na-dayan%C4%B1kl%C4%B1-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-Fp3SPv.png",
            Price = 3299.99M
        },
        new Shoe()
        {
            Id = 2,
            Title = "Nike Invincible 3",
            Description = "Erkek Yol Koşu Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4c41bcec-f8e9-4eaf-913d-e5fef6438749/invincible-3-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-0r1MPB.png",
            Price = 6799.99M
        },
        new Shoe()
        {
            Id = 3,
            Title = "Nike InfinityRN 4 GORE-TEX",
            Description = "Su Geçirmez Erkek Yol Koşu Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/91e44e83-f4e5-41af-83af-262b59e4e089/infinityrn-4-gore-tex-su-ge%C3%A7irmez-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-gpQ324.png",
            Price = 5999.99M
        },
        new Shoe()
        {
            Id = 4,
            Title = "Nike Alphafly 3",
            Description = "Erkek Yol Yarış Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/477abbf8-b37a-4fe6-b516-08e294a8487a/alphafly-3-yol-yar%C4%B1%C5%9F-ayakkab%C4%B1s%C4%B1-vNzQdQ.png",
            Price = 11999
        }
    };
    
    private readonly List<Category> categories = new()
    {
        new Category()
        {
            Id = 1,
            Name = "lifestyle"
        },new Category()
        {
            Id = 2,
            Name = "jordan"
        },new Category()
        {
            Id = 3,
            Name = "running"
        },new Category()
        {
            Id = 4,
            Name = "basketball"
        },new Category()
        {
            Id = 5,
            Name = "football"
        },new Category()
        {
            Id = 6,
            Name = "training"
        },new Category()
        {
            Id = 7,
            Name = "tennis"
        },new Category()
        {
            Id = 8,
            Name = "walking"
        }
    };

    private readonly List<ShoeCategory> shoeCategories = new();
    
    public List<Shoe> CreateSeedShoeData()
    {
        /*shoes.Add(new Shoe()
        {
            Id = 1,
            Title = "Nike Pegasus 39 Shield",
            Description = "Hava Şartlarına Dayanıklı Erkek Yol Koşu Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9022903b-ed99-4f2d-a441-58eb7c19a66c/pegasus-39-shield-hava-%C5%9Fartlar%C4%B1na-dayan%C4%B1kl%C4%B1-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-Fp3SPv.png",
            Price = 3299.99M
        });
        shoes.Add(new Shoe()
        {
            Id = 2,
            Title = "Nike Invincible 3",
            Description = "Erkek Yol Koşu Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4c41bcec-f8e9-4eaf-913d-e5fef6438749/invincible-3-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-0r1MPB.png",
            Price = 6799.99M
        });
        shoes.Add(new Shoe()
        {
            Id = 3,
            Title = "Nike InfinityRN 4 GORE-TEX",
            Description = "Su Geçirmez Erkek Yol Koşu Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/91e44e83-f4e5-41af-83af-262b59e4e089/infinityrn-4-gore-tex-su-ge%C3%A7irmez-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-gpQ324.png",
            Price = 5999.99M
        });
        shoes.Add(new Shoe()
        {
            Id = 4,
            Title = "Nike Alphafly 3",
            Description = "Erkek Yol Yarış Ayakkabısı",
            ImageUrl =
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/477abbf8-b37a-4fe6-b516-08e294a8487a/alphafly-3-yol-yar%C4%B1%C5%9F-ayakkab%C4%B1s%C4%B1-vNzQdQ.png",
            Price = 11999
        });*/
        
        for (var i = 5; i <= 100; i++)
        {
            shoes.Add(new Shoe()
            {
                Id = i,
                Title = $"Nike Pegasus 39 Shield - {i}",
                Description = "Hava Şartlarına Dayanıklı Erkek Yol Koşu Ayakkabısı",
                ImageUrl =
                    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9022903b-ed99-4f2d-a441-58eb7c19a66c/pegasus-39-shield-hava-%C5%9Fartlar%C4%B1na-dayan%C4%B1kl%C4%B1-yol-ko%C5%9Fu-ayakkab%C4%B1s%C4%B1-Fp3SPv.png",
                Price = 5999.99M
            });
        }

        return shoes;
    }

    public List<Category> CreateSeedCategoryData()
    {
        return categories;
    }

    public List<ShoeCategory> CreateSeedShoeCategoryData()
    {
        var id = 0;
        var random = new Random();
        foreach (var item in SeedData.Shoes)
        {
            id++;
            var shoeCategory = new ShoeCategory()
            {
                Id = id,
                ShoeId = item.Id,
                Shoe = item,
                CategoryId = random.Next(1, 9)
            };
            shoeCategories.Add(shoeCategory);
        }
        return shoeCategories;
    }
}