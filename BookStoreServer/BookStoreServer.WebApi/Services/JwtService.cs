using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookStoreServer.WebApi.Models;
using Microsoft.IdentityModel.Tokens;

namespace BookStoreServer.WebApi.Services;

public static class JwtService
{
    public static string CreateToken(User user)
    {
        var claims = new List<Claim>()
        {
            new Claim("UserId", user.Id.ToString()),
            new Claim("UserFullName", string.Join(" ",user.Name,user.Lastname)),
            new Claim("Username", user.Username)
        };
        
        var tokenHandler = new JwtSecurityToken(
            issuer: "Issuer",
            audience: "Audience",
            claims: claims,
            notBefore: DateTime.Now,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("shoestorejwtsecretkeyshoestorejwtsecretkeyshoestorejwtsecretkey")), SecurityAlgorithms.HmacSha256)
        );

        var token = new JwtSecurityTokenHandler().WriteToken(tokenHandler);
        return token;
    }
    
    public static string CreateAdminToken(Admin admin)
    {
        var claims = new List<Claim>()
        {
            new Claim("UserId", admin.Id.ToString()),
            new Claim("Username", admin.Username),
            new Claim("Admin", "admin")
        };
        
        var tokenHandler = new JwtSecurityToken(
            issuer: "Issuer",
            audience: "Audience",
            claims: claims,
            notBefore: DateTime.Now,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("shoestorejwtsecretkeyshoestorejwtsecretkeyshoestorejwtsecretkey")), SecurityAlgorithms.HmacSha256)
        );

        var token = new JwtSecurityTokenHandler().WriteToken(tokenHandler);
        return token;
    }
}