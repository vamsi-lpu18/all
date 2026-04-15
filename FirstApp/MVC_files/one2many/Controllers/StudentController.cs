using one2many.Models;
using one2many.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//using one2many.Models;

namespace one2many.Controllers
{
    public class StudentController : Controller
    {
        private readonly StudentService _studentService;
        public StudentController(StudentService studentService)
        {
            _studentService = studentService;
        }

        public IActionResult Index()
        {
            var students = _studentService.GetAllStudents();
            if(students.Count == 0) return Content("No students found.");
            return Content(string.Join("\n", students.Select(s => $"Id: {s.Id}, Name: {s.Name}, CourseId: {s.CourseId}")));
        }

        [HttpPost]
        public IActionResult Create(string name, int age, string email, string phoneNumber, int courseId)
        {
            if (ModelState.IsValid)
            {
                var student = new Student
                {
                    Name = name,
                    Age = age,
                    Email = email,
                    PhoneNumber = phoneNumber,
                    CourseId = courseId
                };
                _studentService.AddStudent(student);
                return Content($"Student {student.Name} added.");
            }
            return Content("Invalid student data.");
        }

        [HttpPost]
        public IActionResult AssignCourse(int studentId, int courseId)
        {
            _studentService.AssignCourseToStudent(studentId, courseId);
            return Content($"Student {studentId} assigned to course {courseId}.");
        }
        [HttpPost]

        // [HttpPost]
    public IActionResult CreateCourse(string name, int credits, string description)
    {
        var course = new Course
        {
            Name = name,
            Credits = credits,
            Description = description
        };
        _studentService.AddCourse(course);
        return Content($"Course {course.Name} added.");
    }
}
}