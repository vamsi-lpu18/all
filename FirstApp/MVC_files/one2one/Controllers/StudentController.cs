using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using one2one.Models;
using one2one.Services;
//using one2one.Models;

namespace one2one.Controllers
{
    public class StudentController : Controller
    {
        private readonly StudentService _service;

        public StudentController(StudentService service)
        {
            _service = service;
        }

        public IActionResult Index()
        {
            return View(_service.GetAllStudents());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Student student, string roomNumber)
        {
            student.Room = new HostelRoom
            {
                RoomNumber = roomNumber
            };

            _service.AddStudent(student);

            return RedirectToAction("Index");
        }
    }
}