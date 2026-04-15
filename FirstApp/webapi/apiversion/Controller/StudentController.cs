using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//using apiversion.Models;
// apiversion
// api-Version
namespace apiversion.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/student")]
    public class StudentController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetStudents()
        {
            return Ok(new
            {
                Version = "V1",
                Students = new string[] { "Ram", "John", "Sara" }
            });
        }
    }
    // }
}