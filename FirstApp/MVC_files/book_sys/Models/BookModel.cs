
using System.ComponentModel.DataAnnotations;

namespace book_sys.Models
{
    public class Book
    {
        public int Id { get; set; }
        [MaxLength(10)]
        public string? Title { get; set; }
        public string? Author { get; set; }
        // public string? Genre { get; set; }
        // [DataType(DataType.Currency)]
        public decimal Price { get; set; }
        // public int PublicationYear { get; set; }
    }
}