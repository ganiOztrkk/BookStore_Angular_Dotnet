using BookStoreServer.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStoreServer.WebApi.Context;

public sealed class AppDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //Data Source=localhost; Initial Catalog=ShoeStoreDb; User Id=sa; Password=148951753Gg(.);TrustServerCertificate=True; Encrypt=false
        optionsBuilder.UseSqlServer("Data Source=localhost; Initial Catalog=ShoeStoreDb; User Id=sa; Password=148951753Gg(.);TrustServerCertificate=True; Encrypt=false");
    }

    public DbSet<Shoe> Shoes { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<ShoeCategory> ShoeCategories { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ShoeCategory>().HasKey(x => new
        {
            x.ShoeId, x.CategoryId
        });
        modelBuilder.Entity<Shoe>().Property(x => x.Price).HasColumnType("money");
    }
}