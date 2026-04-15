using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ef_mvc.Migrations
{
    /// <inheritdoc />
    public partial class AddHostelsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hostels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hostels", x => x.Id);
                });

            migrationBuilder.AddColumn<int>(
                name: "HostelId",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Hostels_HostelId",
                table: "Students",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.CreateIndex(
                name: "IX_Students_HostelId",
                table: "Students",
                column: "HostelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Hostels_HostelId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_HostelId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "HostelId",
                table: "Students");

            migrationBuilder.DropTable(
                name: "Hostels");
        }
    }
}
