using Microsoft.AspNetCore.Mvc;
using book_sys.Models;
using book_sys.Repository;

namespace book_sys.Controllers
{
    public class BookController : Controller
    {
        // GET: Book
        private readonly IBookRepository _bookRepository;
        public BookController(IBookRepository repository)
        {
            _bookRepository = repository;
        }

        // [HttpGet("books/all")]
        public IActionResult GetAll()
        {
            var books = _bookRepository.GetAllBooks();

            List<string> result = new List<string>();

            foreach (var book in books)
            {
                result.Add($"{book.Title} by {book.Author} - ${book.Price:F2}");
            }

            return Content(string.Join("\n", result));
        }

        public IActionResult Listprice(int id)
        {
            var books = _bookRepository.Book_by_price(id);

            List<string> result = new List<string>();

            foreach (var book in books)
            {
                result.Add($"{book.Title} by {book.Author} - {book.Price:F2}");
            }

            return Content(string.Join("\n", result));
        }
        public IActionResult GetById(int id)
        {
            var book = _bookRepository.GetBookById(id);

            if (book == null)
            {
                return NotFound($"Book with ID {id} not found.");
            }

            return Content($"{book.Title} by {book.Author} - ${book.Price:F2}");
        }
        // POST: Book/Create
        // [HttpPost]

        public IActionResult Add()
        {
            var book = new Book
            {
                Title = "New Book",
                Author = "New Author",
                Price = 20
            };

            _bookRepository.AddBook(book);

            return Content("Book Added Successfully!");
        }
    }
}

