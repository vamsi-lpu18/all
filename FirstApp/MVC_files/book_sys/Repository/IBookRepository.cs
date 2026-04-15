using book_sys.Models;

namespace book_sys.Repository
{
    public interface IBookRepository
    {
        List<Book> GetAllBooks();
        void AddBook(Book book);
        List<Book> Book_by_price(int price);
        Book GetBookById(int id);
        // void max(BookModel book);
        // void DeleteBook(int id);
        // List<BookModel> GetBooksByAuthor(string author);
    }
}