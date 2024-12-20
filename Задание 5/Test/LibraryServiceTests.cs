using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using LibraryService;
using LibraryService.Models;
using LibraryService.Interface;


namespace LibraryServiceTests
{
    [TestClass]
    public class LibraryServiceTests
    {
        private ILibraryService libraryService;

        [TestInitialize]
        public void Setup()
        {
            libraryService = new LibraryServiceStub();

            // Arrange
            var user = new User(1, "Анечка");
            var book1 = new Book(1, "Война и мир");
            var book2 = new Book(2, "Преступление и наказание");
            libraryService.AddUser(user);
            libraryService.AddBook(book1);
            libraryService.AddBook(book2);
        }

        [TestMethod]
        public void Test_AddAndRetrieveAvailableBooks()
        {
            var availableBooks = libraryService.GetAvailableBooks();
            Assert.AreEqual(2, availableBooks.Count, "Available books count mismatch.");
        }

        [TestMethod]
        public void Test_BorrowBook_ReducesAvailableBooks()
        {
            libraryService.BorrowBook(1, 1);
            var availableBooks = libraryService.GetAvailableBooks();
            Assert.AreEqual(1, availableBooks.Count, "Available books count should decrease after borrowing.");
            Assert.AreEqual(2, availableBooks[0].Id, "Remaining book ID mismatch.");
        }

        [TestMethod]
        public void Test_GetBorrowedBooksByUser()
        {
            libraryService.BorrowBook(1, 1);
            var borrowedBooks = libraryService.GetBooksBorrowedByUser(1);
            Assert.AreEqual(1, borrowedBooks.Count, "Borrowed books count mismatch.");
            Assert.AreEqual(1, borrowedBooks[0].Id, "Borrowed book ID mismatch.");
        }

        [TestMethod]
        public void Test_BorrowNonExistentBook_ThrowsException()
        {
            var ex = Assert.ThrowsException<Exception>(() => libraryService.BorrowBook(1, 999));
            Assert.AreEqual("Book not found.", ex.Message, "Incorrect exception message for nonexistent book.");
        }

        [TestMethod]
        public void Test_GetBooksForNonExistentUser_ThrowsException()
        {
            var ex = Assert.ThrowsException<Exception>(() => libraryService.GetBooksBorrowedByUser(999));
            Assert.AreEqual("User not found.", ex.Message, "Incorrect exception message for nonexistent user.");
        }
    }
}