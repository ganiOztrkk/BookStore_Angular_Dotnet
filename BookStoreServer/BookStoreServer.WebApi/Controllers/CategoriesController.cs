using Microsoft.AspNetCore.Mvc;
namespace BookStoreServer.WebApi.Controllers;

public class CategoriesController : BaseController
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(SeedData.Categories);
    }
}