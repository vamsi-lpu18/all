using StudentManagement.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentManagement.Models
{
    public class Course
    {
        public int CourseId { get; set; }

        [Required]
        public string CourseName { get; set; }

        public string Duration { get; set; }

        public decimal Fees { get; set; }

        public int DepartmentId { get; set; }

        public Department Department { get; set; }

        public ICollection<Student> Students { get; set; }
    }
}