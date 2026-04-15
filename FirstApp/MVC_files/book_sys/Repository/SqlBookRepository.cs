using book_sys.Models;
using book_sys.Data;

namespace book_sys.Repository
{
    public class SqlBookRepository : IBookRepository
    {
        private readonly AppDbContext _context;

        public SqlBookRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Book> GetAllBooks()
        {
            return _context.Books.ToList();
        }

        public Book GetBookById(int id)
        {
            return _context.Books.FirstOrDefault(b => b.Id == id);
        }

        public List<Book> Book_by_price(int price)
        {
            return _context.Books.Where(b => b.Price > price).ToList();
        }

        public void AddBook(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
        }
    }
}
