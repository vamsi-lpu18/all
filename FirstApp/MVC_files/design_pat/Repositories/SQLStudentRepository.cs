using design_pat.Models;
using design_pat.Data;

namespace design_pat.Repositories
{
    // public class SQLStudentRepository : IStudentRepository
    // {
    //     private readonly StudentManagementContext _context;

    //     public SQLStudentRepository(StudentManagementContext context)
    //     {
    //         _context = context;
    //     }

    //     public List<Student> GetAllStudents()
    //     {
    //         return _context.Students.ToList();
    //     }

    //     public void AddStudent(Student student)
    //     {
    //         _context.Students.Add(student);
    //         _context.SaveChanges();
    //     }
    // }
    public class SqlStudentRepository : IStudentRepository
    {
        private readonly AppDbContext context;

        public SqlStudentRepository(AppDbContext db)
        {
            context = db;
        }

        public List<Student> GetAllStudents()
        {
            return context.Students.ToList();
        }

        public void AddStudent(Student student)
        {
            context.Students.Add(student);
            context.SaveChanges();
        }
    }
}