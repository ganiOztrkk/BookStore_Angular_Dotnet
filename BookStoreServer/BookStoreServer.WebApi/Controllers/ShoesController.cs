using AutoMapper;
using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;

public sealed class ShoesController : BaseController
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ShoesController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

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
    
    [HttpPost]
    public IActionResult GetAllNoFilter(RequestDto request)
    {
        ResponseDto<List<Shoe>> response = new();

        List<Shoe> filteredShoes;
        
        if (request.CategoryId != null) 
        {
            filteredShoes =
                _context.ShoeCategories
                    .Where(x => x.CategoryId == request.CategoryId)
                    .Select(x=> x.Shoe)
                    .AsQueryable()
                    .ToList()!;
        }
        else
        {
            filteredShoes = _context.Shoes
                .OrderByDescending(x => x.Id)
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

    [HttpPost]
    public IActionResult Add(CreateShoeDto createShoeDto)
    {
        var product = _mapper.Map<Shoe>(createShoeDto);
        _context.Add(product);
        _context.SaveChanges();
        return Ok();
    }
    
    [HttpPost]
    public IActionResult Update(UpdateShoeDto updateShoeDto)
    {
        var product = _context.Shoes.Find(updateShoeDto.Id);
        if (product is null) return NotFound();
        
        _mapper.Map(updateShoeDto, product);
        
        _context.Update(product);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id:int}")]
    public IActionResult Remove(int id)
    {
        var shoe = _context.Shoes.Find(id);
        if (shoe is null) return NotFound();

        shoe.IsDeleted = true;
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id:int}")]
    public IActionResult GetByIdToUpdate(int id)
    {
        var product = _context.Shoes.FirstOrDefault(x => x.Id == id);
        var updateShoeDto = _mapper.Map<UpdateShoeDto>(product);
        return Ok(updateShoeDto);
    }
    
}