using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace studentmanagement.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MaxLength(20)]
        public string RollNo { get; set; }
        [Required]
        public string Semester { get; set; }
        public int Marks { get; set; }
        public string? PhotoUrl { get; set; }
    }
}
