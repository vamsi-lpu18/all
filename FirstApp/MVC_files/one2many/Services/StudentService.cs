using one2many.Models;
using one2many.Data;
namespace one2many.Services
{
    public class StudentService
    {
        private readonly StudentManagementDbContext _context;

        public StudentService(StudentManagementDbContext context)
        {
            _context = context;
        }
        public List<Student> GetAllStudents()
        {
            return _context.Students.ToList();
        }

        public void AddStudent(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
        }
        public void AddCourse(Course course)
        {
            _context.Courses.Add(course);
            _context.SaveChanges();
        }

        public void AssignCourseToStudent(int studentId, int courseId)
        {
            var student = _context.Students.FirstOrDefault(s => s.Id == studentId);
            var course = _context.Courses.FirstOrDefault(c => c.Id == courseId);
            if (student == null || course == null) return;
            student.CourseId = courseId;
            student.Course = course;
            _context.SaveChanges();
        }

        public List<Student> GetStudentsForCourse(int courseId)
        {
            return _context.Students.Where(s => s.CourseId == courseId).ToList();
        }
    }
}