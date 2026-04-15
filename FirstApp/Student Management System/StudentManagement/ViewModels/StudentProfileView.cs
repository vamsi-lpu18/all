using System.ComponentModel.DataAnnotations;

namespace StudentManagement.ViewModels
{
    public class StudentProfileViewModel
    {
        public int StudentId { get; set; }

        [Display(Name = "Student Name")]
        public string StudentName { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Phone Number")]
        [Required]
        public string PhoneNumber { get; set; }

        [Display(Name = "Address")]
        [Required]
        public string Address { get; set; }

        [Display(Name = "Department")]
        public string DepartmentName { get; set; }

        [Display(Name = "Course")]
        public string CourseName { get; set; }

        [Display(Name = "Course Duration")]
        public string CourseDuration { get; set; }

        [Display(Name = "Course Fees")]
        public decimal CourseFees { get; set; }
    }
}