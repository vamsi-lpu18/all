using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ef_mvc.Migrations
{
    /// <inheritdoc />
    public partial class AddStudentPK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add Id as identity PK (column didn't exist in manually-created table)
            migrationBuilder.Sql("ALTER TABLE [Students] ADD [Id] int IDENTITY(1,1)");
            migrationBuilder.Sql("ALTER TABLE [Students] ADD CONSTRAINT [PK_Students] PRIMARY KEY ([Id])");
            // PhoneNumber already exists in DB — no need to add
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("ALTER TABLE [Students] DROP CONSTRAINT [PK_Students]");
            migrationBuilder.Sql("ALTER TABLE [Students] DROP COLUMN [Id]");
        }
    }
}
