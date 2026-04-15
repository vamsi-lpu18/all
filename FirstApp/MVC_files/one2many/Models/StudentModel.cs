namespace one2many.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public int CourseId { get; set; }
        public Course? Course { get; set; }
    }
}