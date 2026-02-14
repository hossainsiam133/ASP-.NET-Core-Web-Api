using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using _04_CRUD.Models;
using _04_CRUD.DTOs;
using _04_CRUD.Data;
using Microsoft.EntityFrameworkCore;

namespace _04_CRUD.Controllers
{
    [ApiController]
    [Route("/api/categories/")]
    public class CategoryController : ControllerBase
    {
        // private static List<Category> categories = new List<Category>();
        private readonly AppDbContext _context;
        // Dependency Injection
        public CategoryController(AppDbContext context)
        {
            _context = context;
        }
        // GET
        [HttpGet]
        public async Task<IActionResult> GetCategories([FromQuery] string? val)
        {
            var query = _context.Categories.AsQueryable();
            if (!string.IsNullOrEmpty(val))
            {
                query = query.Where(c => c.name!.Contains(val));
            }
            var categories = await query.Select(c => new CategoryReadDto
            {
                name = c.name,
                description = c.description
            }).ToListAsync();
            return Ok(categories);
            // List<Category> cats = new List<Category>();
            // foreach (var item in categories)
            // {
            //     string s = item.name;
            //     if (s.Contains(val, StringComparison.OrdinalIgnoreCase))
            //     {
            //         cats.Add(item);
            //     }
            // }
            // return Ok(cats);
            // return Results.Ok(categories);
            // var newcate = categories.Select(c => new CategoryReadDto
            // {
            //     name = c.name,
            //     description = c.description
            // }).ToList();
            // return Ok(newcate);
        }


        // [HttpGet]
        // public async Task<IActionResult> GetCategoriesAll()
        // {
        //     var query = _context.Categories.AsQueryable();
        //     var categories = await query.Select(c => new CategoryReadDto
        //     {
        //         name = c.name,
        //         description = c.description
        //     }).ToListAsync();
        //     return Ok(categories);
        // }
        // POST
        [HttpPost]
        public async Task<IActionResult> CreateCategories([FromBody] CategoryCreateDto categoryData)
        {
            if (string.IsNullOrEmpty(categoryData.name))
            {
                return BadRequest("Name is required");
            }
            var category = new Category
            {
                categoryID = Guid.NewGuid(),
                name = categoryData.name,
                description = categoryData.description,
                createdAt = DateTime.UtcNow,
            };
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            // categories.Add(category);
            // return CreatedAtAction(nameof(GetCategoryById),
            //   new { id = category.categoryID }, category);
            return Created($"/api/categories/{category.categoryID}", category);
        }
        // Delete
        [HttpDelete("{deleteId:guid}")]
        public async Task<IActionResult> DeleteCategories(Guid deleteId)
        {
            var category = await _context.Categories.FindAsync(deleteId);
            if (category == null)
                return NotFound();
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            // for (int i = 0; i < categories.Count; i++)
            // {
            //     if (categories[i].categoryID == deleteId)
            //     {
            //         categories.RemoveAt(i);
            //     }
            // }
            return NoContent();
        }
        // Put
        [HttpPut("{uid:guid}")]
        public async Task<IActionResult> UpdateCategories(Guid uid, CategoryUpdateDto updateData)
        {
            var category = await _context.Categories.FindAsync(uid);
            if (category == null)
                return NotFound();
            category.name = updateData.name;
            category.description = updateData.description;

            await _context.SaveChangesAsync();
            return Ok(category);
            // bool flag = false;
            // for (int i = 0; i < categories.Count; i++)
            // {
            //     Console.WriteLine(categories[i].categoryID);
            //     if (categories[i].categoryID == uid)
            //     {
            //         categories[i].name = "Walton";
            //         flag = true;
            //     }
            // }
            // if (flag)
            //     return Ok("Updated");
            // else
            //     return Ok("Not Found");
        }

    }
}