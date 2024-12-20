using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryService.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public Book(int id, string title)
        {
            Id = id;
            Title = title;
        }
    }
}
