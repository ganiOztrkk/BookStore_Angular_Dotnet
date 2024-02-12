using AutoMapper;
using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;
using BookStoreServer.WebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;

public class AuthController : BaseController
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public AuthController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpPost]
    public IActionResult Register(RegisterDto request)
    {
        var user = _mapper.Map<User>(request);
        _context.Add(user);
        _context.SaveChanges();
        
        return Ok(new {Message = "Üyelik başarıyla oluşturuldu."});
    }
    
    [HttpPost]
    public IActionResult Login(LoginDto request)
    {
        var user = _context.Users.FirstOrDefault(x => (x.Username == request.UsernameOrEmail || x.Email == request.UsernameOrEmail) && x.Password == request.Password);
        if (user is null) return BadRequest(new { Message = "Kullanıcı bilgileri hatalı!" });

        var accessToken = JwtService.CreateToken(user);
        return Ok(new {accessToken = accessToken, Message = "Giriş başarılı"});
    }
}