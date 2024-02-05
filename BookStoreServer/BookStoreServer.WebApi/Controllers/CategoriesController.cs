using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
namespace BookStoreServer.WebApi.Controllers;

public sealed class CategoriesController : BaseController
{
    [HttpGet]
    public IActionResult GetAll()
    {
        var context = new AppDbContext();

        var categoryList = context.Categories
            .Where(x => x.IsActive == true && x.IsDeleted == false)
            .OrderBy(x => x.Name)
            .AsQueryable()
            .ToList();
        
        return Ok(categoryList);
    }

    
    [HttpPost]
    public IActionResult Create(CreateCategoryDto request)
    {
        var context = new AppDbContext();

        var isNameUnique = context.Categories.Any(x => x.Name == request.Name);
        if (isNameUnique) return BadRequest("Kategori zaten mevcut!");
        
        var category = new Category()
        {
            Name = request.Name,
            IsDeleted = false,
            IsActive = true
        };
        context.Categories.Add(category);
        context.SaveChanges();

        return Created("", category);
    }


    [HttpGet("{id:int}")] // => localhost../api/[controller]/[action]/id
    public IActionResult RemoveById(int id)
    {
        var context = new AppDbContext();
        var category = context.Categories.Find(id);
        if (category is null) return NotFound();
        
        category.IsDeleted = true;
        context.SaveChanges();
        return NoContent();
    }


    [HttpPost]
    public IActionResult Update(UpdateCategoryDto request)
    {
        var context = new AppDbContext();
        var category = context.Categories.Find(request.Id);
        if (category is null) return NotFound();

        category.Name = request.Name;
        context.SaveChanges();
        return NoContent();
    }
}