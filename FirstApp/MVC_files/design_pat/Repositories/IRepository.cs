using design_pat.Models;
namespace design_pat.Repositories
{
    public interface IStudentRepository
    {
        List<Student>GetAllStudents();
        void AddStudent(Student student);
    }
}