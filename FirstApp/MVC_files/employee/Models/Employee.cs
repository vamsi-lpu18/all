using System.ComponentModel.DataAnnotations;
namespace employee.Models
{   
class Employee
{
    [Required]
    public string? Name { get; set; }
    public string Address { get; set; }
    [Required]
    [StringLength(14)]
    public string Aadhar { get; set; }
    [StringLength(10)]
    public string? Phone { get; set; }
    public DateTime dob { get; set; }
    public int Salary { get; set; }
    
}
}