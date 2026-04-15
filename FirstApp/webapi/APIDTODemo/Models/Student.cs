namespace APIDTODemo.Models
{
    public class Student
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Age { get; set; }
        public decimal CourseFeePaid { get; set; }
    }
}
