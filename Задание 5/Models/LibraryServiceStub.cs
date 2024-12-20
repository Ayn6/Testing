using LibraryService.Interface;
using LibraryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryService
{
    public class LibraryServiceStub : ILibraryService
    {
        private readonly List<User> _users = new List<User>();
        private readonly List<Book> _books = new List<Book>();

        public void AddUser(User user)
        {
            _users.Add(user);
        }

        public void AddBook(Book book)
        {
            _books.Add(book);
        }

        public void BorrowBook(int userId, int bookId)
        {
            var user = _users.FirstOrDefault(u => u.Id == userId);
            var book = _books.FirstOrDefault(b => b.Id == bookId);

            if (user == null) throw new Exception("User not found.");
            if (book == null) throw new Exception("Book not found.");

            user.BorrowedBooks.Add(book);
            _books.Remove(book);
        }

        public List<Book> GetBooksBorrowedByUser(int userId)
        {
            var user = _users.FirstOrDefault(u => u.Id == userId);
            return user?.BorrowedBooks ?? throw new Exception("User not found.");
        }

        public List<Book> GetAvailableBooks()
        {
            return _books;
        }
    }
}
