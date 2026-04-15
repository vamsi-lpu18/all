namespace Ef_mvc.Models
{
    public class Hostel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<Student> Students { get; set; }
    }
}
