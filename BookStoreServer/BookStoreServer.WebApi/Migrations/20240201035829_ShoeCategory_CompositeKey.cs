using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStoreServer.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class ShoeCategory_CompositeKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ShoeCategories",
                table: "ShoeCategories");

            migrationBuilder.DropIndex(
                name: "IX_ShoeCategories_ShoeId",
                table: "ShoeCategories");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ShoeCategories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShoeCategories",
                table: "ShoeCategories",
                columns: new[] { "ShoeId", "CategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_ShoeCategories_CategoryId",
                table: "ShoeCategories",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShoeCategories_Categories_CategoryId",
                table: "ShoeCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoeCategories_Categories_CategoryId",
                table: "ShoeCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShoeCategories",
                table: "ShoeCategories");

            migrationBuilder.DropIndex(
                name: "IX_ShoeCategories_CategoryId",
                table: "ShoeCategories");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ShoeCategories",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShoeCategories",
                table: "ShoeCategories",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ShoeCategories_ShoeId",
                table: "ShoeCategories",
                column: "ShoeId");
        }
    }
}
