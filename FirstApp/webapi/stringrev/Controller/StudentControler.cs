using Microsoft.AspNetCore.Mvc;

using stringrev.Models;

[ApiController]
[Route("api/student")]
public class StudentController : ControllerBase
{
    [HttpPost]
    public IActionResult Post(Student student)
    {
        var name = student.Name;

        // Reverse the string
        char[] arr = name.ToCharArray();
        Array.Reverse(arr);

        var reversed = new string(arr);

        return Ok(reversed);
    }
}