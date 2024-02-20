using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;

public sealed class ShoesController : BaseController
{
    private readonly AppDbContext _context = new AppDbContext();
    
    [HttpPost]
    public IActionResult GetAll(RequestDto request)
    {
        ResponseDto<List<Shoe>> response = new();

        List<Shoe> filteredShoes;
        
        if (request.CategoryId != null) 
        {
            filteredShoes =
                _context.ShoeCategories
                    .Where(x => x.CategoryId == request.CategoryId)
                    .Where(x => x.Shoe.IsActive == true && x.Shoe.IsDeleted == false)
                    .Select(x=> x.Shoe)
                    .AsQueryable()
                    .ToList()!;
        }
        else
        {
            filteredShoes = _context.Shoes
                .Where(x => x.IsActive == true && x.IsDeleted == false)
                .AsQueryable()
                .ToList();
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

    [HttpGet]
    public IActionResult GetNewestShoes()
    {
        var shoeList = _context.Shoes
            .OrderByDescending(x => x.Id)
            .Take(10)
            .ToList();
        
        return Ok(shoeList);
    }
    
}