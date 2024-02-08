using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStoreServer.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class OrderStatusTable_OrderNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "OrderStatus");

            migrationBuilder.AddColumn<string>(
                name: "OrderNumber",
                table: "OrderStatus",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "OrderStatus");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "OrderStatus",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
