using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Ef_mvc.Data;
using Ef_mvc.Models;

namespace ef_mvc.Controllers
{
    public class NewStudentController : Controller
    {
        private readonly StudentManagementContext _context;

        public NewStudentController(StudentManagementContext context)
        {
            _context = context;
        }

        // GET: NewStudent
        public async Task<IActionResult> Index()
        {
            var studentManagementContext = _context.Students.Include(s => s.Hostel);
            return View(await studentManagementContext.ToListAsync());
        }

        // GET: NewStudent/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _context.Students
                .Include(s => s.Hostel)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        // GET: NewStudent/CreateByQuery?name=...&age=...&email=...&phonenumber=...&hostelid=...
        public IActionResult CreateByQuery(string name, int age, string email, string phonenumber, int hostelid)
        {
            var student = new Student
            {
                Name = name,
                Age = age,
                Email = email,
                PhoneNumber = phonenumber,
                HostelId = hostelid
            };

            _context.Students.Add(student);
            _context.SaveChanges();

            return Content("Student Created Successfully");
        }

        // GET: NewStudent/Create
        public IActionResult Create()
        {
            ViewData["HostelId"] = new SelectList(_context.Hostels, "Id", "Name");
            return View();
        }

        // POST: NewStudent/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Age,Email,PhoneNumber,HostelId")] Student student)
        {
            if (ModelState.IsValid)
            {
                _context.Add(student);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["HostelId"] = new SelectList(_context.Hostels, "Id", "Name", student.HostelId);
            return View(student);
        }

        // GET: NewStudent/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            ViewData["HostelId"] = new SelectList(_context.Hostels, "Id", "Name", student.HostelId);
            return View(student);
        }
        public IActionResult EditByQuery(int id, string name, int age, string email, string phonenumber, int hostelid)
        {
            var student = _context.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            student.Name = name;
            student.Age = age;
            student.Email = email;
            student.PhoneNumber = phonenumber;
            student.HostelId = hostelid;

            _context.Update(student);
            _context.SaveChanges();

            return Content("Student Updated Successfully");
        }
        public IActionResult DeleteBYQuery(int id){
            var student=_context.Students.Find(id);
            if(student==null){
                return NotFound();
            }
            _context.Students.Remove(student);
            _context.SaveChanges();
            return Content("Student Deleted Successfully");
        }

        // GET: NewStudent/CreateHostel?name=HostelA&address=SomeAddress
        public IActionResult CreateHostel(string name, string address)
        {
            var hostel = new Hostel { Name = name, Address = address };
            _context.Hostels.Add(hostel);
            _context.SaveChanges();
            return Content($"Hostel '{name}' created with Id: {hostel.Id}");
        }

        // GET: NewStudent/ListHostels
        public IActionResult ListHostels()
        {
            var hostels = _context.Hostels.ToList();
            StringBuilder sb = new StringBuilder();
            foreach (var h in hostels)
            {
                sb.Append($"{h.Id} - {h.Name} <br>");
            }
            return Content(sb.ToString(), "text/html");
        }

        public IActionResult Get()
        {
            var students = _context.Students.ToList();
            StringBuilder sb = new StringBuilder();

            foreach (var s in students)
            {
                sb.Append($"{s.Id} - {s.Name} - {s.Age} - {s.PhoneNumber} <br>");
            }

            return Content(sb.ToString(), "text/html");
        }
        public IActionResult GetById(int id)
        {
            var student = _context.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }
            return Content($"{student.Id} - {student.Name} - {student.Age} - {student.PhoneNumber}");
        }


        // POST: NewStudent/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Age,Email,PhoneNumber,HostelId")] Student student)
        {
            if (id != student.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(student);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StudentExists(student.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["HostelId"] = new SelectList(_context.Hostels, "Id", "Name", student.HostelId);
            return View(student);
        }

        // GET: NewStudent/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _context.Students
                .Include(s => s.Hostel)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        // POST: NewStudent/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student != null)
            {
                _context.Students.Remove(student);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }
    }
}
