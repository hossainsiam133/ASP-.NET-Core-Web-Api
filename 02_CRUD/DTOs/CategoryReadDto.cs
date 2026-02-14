using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _04_CRUD.DTOs
{
    public class CategoryReadDto
    {
        // public Guid categoryID { get; set; }
        public string? name { get; set; }
        public string? description { get; set; } = string.Empty;
        // public DateTime createdAt { get; set; }
    }
}