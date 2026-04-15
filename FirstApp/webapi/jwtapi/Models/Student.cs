namespace StudentHostelAPI.Models
{
    public class Student
    {
        public int StudentId { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Age { get; set; }

        // Navigation property
        public Hostel Hostel { get; set; } = null!;
    }
}