namespace StudentHostelAPI.Models
{
    public class Hostel
    {
        public int HostelId { get; set; }

        public string RoomNumber { get; set; } = string.Empty;

        public int StudentId { get; set; }

        // Navigation property
        public Student Student { get; set; } = null!;
    }
}