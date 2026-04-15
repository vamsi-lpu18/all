using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace StudentManagement.Models
{
    public class Department
    {
        public int DepartmentId { get; set; }

        [Required]
        public string DepartmentName { get; set; }

        public string Description { get; set; }

        public ICollection<Course> Courses { get; set; }
        public ICollection<Student> Students { get; set; }
    }
}
