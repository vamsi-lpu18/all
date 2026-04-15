using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentHostelAPI.Data;
using StudentHostelAPI.Models;

namespace StudentHostelAPI.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudentController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly ILogger<StudentController> _logger;

        public StudentController(AppDbContext context, ILogger<StudentController> logger)
        {
            _context = context;
            _logger = logger;
        }



        [HttpPost]
        public IActionResult AddStudent(Student student)
        {
            _logger.LogInformation("AddStudent called for student: {@Student}", student);
            _context.Students.Add(student);
            _context.SaveChanges();
            _logger.LogInformation("Student added successfully: {@Student}", student);
            return Ok(student);
        }


        [HttpPost("hostel")]
        public IActionResult AddHostel(Hostel hostel)
        {
            _logger.LogInformation("AddHostel called for hostel: {@Hostel}", hostel);
            _context.Hostels.Add(hostel);
            _context.SaveChanges();
            _logger.LogInformation("Hostel added successfully: {@Hostel}", hostel);
            return Ok(hostel);
        }


        [HttpGet("{id}")]
        public IActionResult GetStudentById(int id)
        {
            _logger.LogInformation("GetStudentById called for id: {Id}", id);
            var student = _context.Students
                .Include(s => s.Hostel)
                .FirstOrDefault(s => s.StudentId == id);
            if (student == null)
            {
                _logger.LogWarning("Student not found for id: {Id}", id);
                return NotFound();
            }
            _logger.LogInformation("Student found: {@Student}", student);
            return Ok(student);
        }


        [HttpGet]
        public IActionResult GetStudents()
        {
            _logger.LogInformation("GetStudents called");
            var students = _context.Students
                .Include(s => s.Hostel)
                .ToList();
            _logger.LogInformation("Students retrieved: {@Students}", students);
            return Ok(students);
        }
    }
}