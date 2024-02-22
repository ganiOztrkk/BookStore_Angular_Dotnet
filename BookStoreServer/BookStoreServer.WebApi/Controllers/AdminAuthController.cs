using AutoMapper;
using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;
using BookStoreServer.WebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;

public class AdminAuthController : BaseController
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public AdminAuthController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    [HttpPost]
    public IActionResult Login(AdminLoginDto request)
    {
        var admin = _context.Admins
            .FirstOrDefault(x => x.Username == request.Username && x.Password == request.Password);
        if (admin is null) return BadRequest(new { Message = "Admin bilgileri hatalı!" });
        

        var accessToken = JwtService.CreateAdminToken(admin);
        return Ok(new {accessToken = accessToken, Message = "Admin Girişi başarılı"});
    }
}