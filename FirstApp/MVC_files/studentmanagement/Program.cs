
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<studentmanagement.Data.StudentDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("StudentDbConnection")));
builder.Services.AddScoped<studentmanagement.Services.IStudentRepository, studentmanagement.Services.StudentRepository>();
builder.Services.AddScoped<studentmanagement.Services.StudentService>();
builder.Services.AddScoped<studentmanagement.Services.IUserRepository, studentmanagement.Services.UserRepository>();
builder.Services.AddScoped<studentmanagement.Services.AuthService>();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseSession();
app.UseAuthorization();


// Seed sample data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<studentmanagement.Data.StudentDbContext>();
    try
    {
        if (!db.Students.Any())
        {
            db.Students.AddRange(
                new studentmanagement.Models.Student { Name = "Alice", RollNo = "R001", Semester = "1", Marks = 85 },
                new studentmanagement.Models.Student { Name = "Bob", RollNo = "R002", Semester = "2", Marks = 90 },
                new studentmanagement.Models.Student { Name = "Charlie", RollNo = "R003", Semester = "1", Marks = 78 }
            );
            db.SaveChanges();
        }
        if (!db.Users.Any())
        {
            db.Users.AddRange(
                new studentmanagement.Models.User { Username = "alice", Password = "alice123", StudentId = db.Students.First(s => s.Name == "Alice").Id },
                new studentmanagement.Models.User { Username = "bob", Password = "bob123", StudentId = db.Students.First(s => s.Name == "Bob").Id },
                new studentmanagement.Models.User { Username = "charlie", Password = "charlie123", StudentId = db.Students.First(s => s.Name == "Charlie").Id }
            );
            db.SaveChanges();
        }
    }
    catch { /* Ignore errors if tables are missing */ }
}

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
