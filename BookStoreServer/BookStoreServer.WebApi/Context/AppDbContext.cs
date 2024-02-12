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
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderStatus> OrderStatus { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<ShoppingCart> ShoppingCarts { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderStatus>().HasIndex(x => new { x.Id, x.OrderNumber });
        //composite key - 2 id beraber key oluyor.
        modelBuilder.Entity<ShoeCategory>().HasKey(x => new { x.ShoeId, x.CategoryId });
        //kullanıcının email ve username bilgileri uniq olmak zorunda
        modelBuilder.Entity<User>().HasIndex(x => x.Email).IsUnique();
        modelBuilder.Entity<User>().HasIndex(x => x.Username).IsUnique();
        
        modelBuilder.Entity<Shoe>().Property(x => x.Price).HasColumnType("money");
        modelBuilder.Entity<Order>().Property(x => x.Price).HasColumnType("money");
        modelBuilder.Entity<ShoppingCart>().Property(x => x.Price).HasColumnType("money");
    }
}