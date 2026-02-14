using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _04_CRUD.Models
{
    public class Category
    {
        public Guid categoryID { get; set; }
        public string? name { get; set; }
        public string? description { get; set; } = string.Empty;
        public DateTime createdAt { get; set; }
    }
}