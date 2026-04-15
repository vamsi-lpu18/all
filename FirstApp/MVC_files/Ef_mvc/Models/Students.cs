namespace Ef_mvc.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public int HostelId { get; set; }
        public Hostel? Hostel { get; set; }
    }
}