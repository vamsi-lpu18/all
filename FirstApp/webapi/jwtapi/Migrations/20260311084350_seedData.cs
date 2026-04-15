using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace jwtapi.Migrations
{
    /// <inheritdoc />
    public partial class seedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "StudentId", "Age", "Name" },
                values: new object[,]
                {
                    { 1, 20, "Alice" },
                    { 2, 22, "Bob" }
                });

            migrationBuilder.InsertData(
                table: "Hostels",
                columns: new[] { "HostelId", "RoomNumber", "StudentId" },
                values: new object[,]
                {
                    { 1, "A101", 1 },
                    { 2, "B202", 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Hostels",
                keyColumn: "HostelId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Hostels",
                keyColumn: "HostelId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 2);
        }
    }
}
