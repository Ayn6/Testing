using LibraryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryService.Interface
{
    public interface ILibraryService
    {
        void AddUser(User user);
        void AddBook(Book book);
        void BorrowBook(int userId, int bookId);
        List<Book> GetBooksBorrowedByUser(int userId);
        List<Book> GetAvailableBooks();
    }
}
