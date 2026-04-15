using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Versioning;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using firstwebapi.Models;

namespace firstwebapi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetStudents()
        {
            // Implementation for getting students
            var students = new List<Models.Student>
            {
                new Models.Student { Id = 1, Name = "Alice", Marks = 85 },
                new Models.Student { Id = 2, Name = "Bob", Marks = 90 },
                new Models.Student { Id = 3, Name = "Charlie", Marks = 78 }
            };
            return Ok(students);
        }

        // public IActionResult Index()
        // {
        //     return View();
        // }
        // public 
    }
}