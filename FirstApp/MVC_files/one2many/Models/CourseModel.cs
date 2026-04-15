namespace one2many.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Credits { get; set; }
        public string? Description { get; set; }
        public ICollection<Student> Students { get; set; } = new List<Student>();
    }
}
