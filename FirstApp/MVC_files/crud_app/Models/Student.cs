using System.ComponentModel.DataAnnotations;

namespace crud_app.Models;

public class Student
{
    public int Id { get; set; }

    [StringLength(100)]
    public string? Name { get; set; }

    [Range(1, 120)]
    public int? Age { get; set; }

    [EmailAddress]
    [StringLength(100)]
    public string? Email { get; set; }
}