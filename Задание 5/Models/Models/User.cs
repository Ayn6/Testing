using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryService.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Book> BorrowedBooks { get; set; } = new List<Book>();

        public User(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
