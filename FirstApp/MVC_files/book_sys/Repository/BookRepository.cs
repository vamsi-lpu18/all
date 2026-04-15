using book_sys.Models;
namespace book_sys.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly List<Book> _books;

        public BookRepository()
        {
            _books = new List<Book>
            {
                new Book { Id = 1, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", Price = 10 },
                new Book { Id = 2, Title = "To Kill a Mockingbird", Author = "Harper Lee", Price = 12 },
                new Book { Id = 3, Title = "1984", Author = "George Orwell", Price = 15 }
            };
        }

        public List<Book> GetAllBooks()
        {
            return _books;
        }

        public void AddBook(Book book)
        {
            book.Id = _books.Count + 1;
            _books.Add(book);
        }
        public List<Book> Book_by_price(int price)
        {
            return _books.Where(b => b.Price >= price).ToList();
        }
        public Book GetBookById(int id)
        {
            return _books.FirstOrDefault(b => b.Id == id);
        }
    }
}