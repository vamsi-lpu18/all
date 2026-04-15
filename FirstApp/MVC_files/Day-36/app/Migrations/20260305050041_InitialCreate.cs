using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace app.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Department = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Position = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Salary = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    JoiningDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "Department", "Email", "EmployeeName", "JoiningDate", "PhoneNumber", "Position", "Salary" },
                values: new object[,]
                {
                    { 1, "IT", "employee1@company.com", "Employee 1", new DateTime(2026, 2, 23, 10, 30, 40, 402, DateTimeKind.Local).AddTicks(6058), "+1-555-1001", "Manager", 51000m },
                    { 2, "HR", "employee2@company.com", "Employee 2", new DateTime(2026, 2, 13, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7717), "+1-555-1002", "Developer", 52000m },
                    { 3, "Finance", "employee3@company.com", "Employee 3", new DateTime(2026, 2, 3, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7736), "+1-555-1003", "Analyst", 53000m },
                    { 4, "Sales", "employee4@company.com", "Employee 4", new DateTime(2026, 1, 24, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7739), "+1-555-1004", "Coordinator", 54000m },
                    { 5, "Marketing", "employee5@company.com", "Employee 5", new DateTime(2026, 1, 14, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7743), "+1-555-1005", "Specialist", 55000m },
                    { 6, "Operations", "employee6@company.com", "Employee 6", new DateTime(2026, 1, 4, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7752), "+1-555-1006", "Associate", 56000m },
                    { 7, "IT", "employee7@company.com", "Employee 7", new DateTime(2025, 12, 25, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7755), "+1-555-1007", "Manager", 57000m },
                    { 8, "HR", "employee8@company.com", "Employee 8", new DateTime(2025, 12, 15, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7757), "+1-555-1008", "Developer", 58000m },
                    { 9, "Finance", "employee9@company.com", "Employee 9", new DateTime(2025, 12, 5, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7760), "+1-555-1009", "Analyst", 59000m },
                    { 10, "Sales", "employee10@company.com", "Employee 10", new DateTime(2025, 11, 25, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7764), "+1-555-1010", "Coordinator", 60000m },
                    { 11, "Marketing", "employee11@company.com", "Employee 11", new DateTime(2025, 11, 15, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7767), "+1-555-1011", "Specialist", 61000m },
                    { 12, "Operations", "employee12@company.com", "Employee 12", new DateTime(2025, 11, 5, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7769), "+1-555-1012", "Associate", 62000m },
                    { 13, "IT", "employee13@company.com", "Employee 13", new DateTime(2025, 10, 26, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7772), "+1-555-1013", "Manager", 63000m },
                    { 14, "HR", "employee14@company.com", "Employee 14", new DateTime(2025, 10, 16, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7774), "+1-555-1014", "Developer", 64000m },
                    { 15, "Finance", "employee15@company.com", "Employee 15", new DateTime(2025, 10, 6, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7777), "+1-555-1015", "Analyst", 65000m },
                    { 16, "Sales", "employee16@company.com", "Employee 16", new DateTime(2025, 9, 26, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7780), "+1-555-1016", "Coordinator", 66000m },
                    { 17, "Marketing", "employee17@company.com", "Employee 17", new DateTime(2025, 9, 16, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7782), "+1-555-1017", "Specialist", 67000m },
                    { 18, "Operations", "employee18@company.com", "Employee 18", new DateTime(2025, 9, 6, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7786), "+1-555-1018", "Associate", 68000m },
                    { 19, "IT", "employee19@company.com", "Employee 19", new DateTime(2025, 8, 27, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7788), "+1-555-1019", "Manager", 69000m },
                    { 20, "HR", "employee20@company.com", "Employee 20", new DateTime(2025, 8, 17, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7791), "+1-555-1020", "Developer", 70000m },
                    { 21, "Finance", "employee21@company.com", "Employee 21", new DateTime(2025, 8, 7, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7793), "+1-555-1021", "Analyst", 71000m },
                    { 22, "Sales", "employee22@company.com", "Employee 22", new DateTime(2025, 7, 28, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7796), "+1-555-1022", "Coordinator", 72000m },
                    { 23, "Marketing", "employee23@company.com", "Employee 23", new DateTime(2025, 7, 18, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7822), "+1-555-1023", "Specialist", 73000m },
                    { 24, "Operations", "employee24@company.com", "Employee 24", new DateTime(2025, 7, 8, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7825), "+1-555-1024", "Associate", 74000m },
                    { 25, "IT", "employee25@company.com", "Employee 25", new DateTime(2025, 6, 28, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7828), "+1-555-1025", "Manager", 75000m },
                    { 26, "HR", "employee26@company.com", "Employee 26", new DateTime(2025, 6, 18, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7831), "+1-555-1026", "Developer", 76000m },
                    { 27, "Finance", "employee27@company.com", "Employee 27", new DateTime(2025, 6, 8, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7833), "+1-555-1027", "Analyst", 77000m },
                    { 28, "Sales", "employee28@company.com", "Employee 28", new DateTime(2025, 5, 29, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7836), "+1-555-1028", "Coordinator", 78000m },
                    { 29, "Marketing", "employee29@company.com", "Employee 29", new DateTime(2025, 5, 19, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7838), "+1-555-1029", "Specialist", 79000m },
                    { 30, "Operations", "employee30@company.com", "Employee 30", new DateTime(2025, 5, 9, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7841), "+1-555-1030", "Associate", 80000m },
                    { 31, "IT", "employee31@company.com", "Employee 31", new DateTime(2025, 4, 29, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7843), "+1-555-1031", "Manager", 81000m },
                    { 32, "HR", "employee32@company.com", "Employee 32", new DateTime(2025, 4, 19, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7846), "+1-555-1032", "Developer", 82000m },
                    { 33, "Finance", "employee33@company.com", "Employee 33", new DateTime(2025, 4, 9, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7848), "+1-555-1033", "Analyst", 83000m },
                    { 34, "Sales", "employee34@company.com", "Employee 34", new DateTime(2025, 3, 30, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7852), "+1-555-1034", "Coordinator", 84000m },
                    { 35, "Marketing", "employee35@company.com", "Employee 35", new DateTime(2025, 3, 20, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7855), "+1-555-1035", "Specialist", 85000m },
                    { 36, "Operations", "employee36@company.com", "Employee 36", new DateTime(2025, 3, 10, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7857), "+1-555-1036", "Associate", 86000m },
                    { 37, "IT", "employee37@company.com", "Employee 37", new DateTime(2025, 2, 28, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7859), "+1-555-1037", "Manager", 87000m },
                    { 38, "HR", "employee38@company.com", "Employee 38", new DateTime(2025, 2, 18, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7862), "+1-555-1038", "Developer", 88000m },
                    { 39, "Finance", "employee39@company.com", "Employee 39", new DateTime(2025, 2, 8, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7865), "+1-555-1039", "Analyst", 89000m },
                    { 40, "Sales", "employee40@company.com", "Employee 40", new DateTime(2025, 1, 29, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7867), "+1-555-1040", "Coordinator", 90000m },
                    { 41, "Marketing", "employee41@company.com", "Employee 41", new DateTime(2025, 1, 19, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7870), "+1-555-1041", "Specialist", 91000m },
                    { 42, "Operations", "employee42@company.com", "Employee 42", new DateTime(2025, 1, 9, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7872), "+1-555-1042", "Associate", 92000m },
                    { 43, "IT", "employee43@company.com", "Employee 43", new DateTime(2024, 12, 30, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7875), "+1-555-1043", "Manager", 93000m },
                    { 44, "HR", "employee44@company.com", "Employee 44", new DateTime(2024, 12, 20, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7878), "+1-555-1044", "Developer", 94000m },
                    { 45, "Finance", "employee45@company.com", "Employee 45", new DateTime(2024, 12, 10, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7880), "+1-555-1045", "Analyst", 95000m },
                    { 46, "Sales", "employee46@company.com", "Employee 46", new DateTime(2024, 11, 30, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7882), "+1-555-1046", "Coordinator", 96000m },
                    { 47, "Marketing", "employee47@company.com", "Employee 47", new DateTime(2024, 11, 20, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7885), "+1-555-1047", "Specialist", 97000m },
                    { 48, "Operations", "employee48@company.com", "Employee 48", new DateTime(2024, 11, 10, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7888), "+1-555-1048", "Associate", 98000m },
                    { 49, "IT", "employee49@company.com", "Employee 49", new DateTime(2024, 10, 31, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7890), "+1-555-1049", "Manager", 99000m },
                    { 50, "HR", "employee50@company.com", "Employee 50", new DateTime(2024, 10, 21, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7892), "+1-555-1050", "Developer", 100000m },
                    { 51, "Finance", "employee51@company.com", "Employee 51", new DateTime(2024, 10, 11, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7895), "+1-555-1051", "Analyst", 101000m },
                    { 52, "Sales", "employee52@company.com", "Employee 52", new DateTime(2024, 10, 1, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7898), "+1-555-1052", "Coordinator", 102000m },
                    { 53, "Marketing", "employee53@company.com", "Employee 53", new DateTime(2024, 9, 21, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7908), "+1-555-1053", "Specialist", 103000m },
                    { 54, "Operations", "employee54@company.com", "Employee 54", new DateTime(2024, 9, 11, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7911), "+1-555-1054", "Associate", 104000m },
                    { 55, "IT", "employee55@company.com", "Employee 55", new DateTime(2024, 9, 1, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7914), "+1-555-1055", "Manager", 105000m },
                    { 56, "HR", "employee56@company.com", "Employee 56", new DateTime(2024, 8, 22, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7916), "+1-555-1056", "Developer", 106000m },
                    { 57, "Finance", "employee57@company.com", "Employee 57", new DateTime(2024, 8, 12, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7919), "+1-555-1057", "Analyst", 107000m },
                    { 58, "Sales", "employee58@company.com", "Employee 58", new DateTime(2024, 8, 2, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7921), "+1-555-1058", "Coordinator", 108000m },
                    { 59, "Marketing", "employee59@company.com", "Employee 59", new DateTime(2024, 7, 23, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7924), "+1-555-1059", "Specialist", 109000m },
                    { 60, "Operations", "employee60@company.com", "Employee 60", new DateTime(2024, 7, 13, 10, 30, 40, 403, DateTimeKind.Local).AddTicks(7926), "+1-555-1060", "Associate", 110000m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
