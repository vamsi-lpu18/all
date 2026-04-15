using Microsoft.AspNetCore.Mvc;
using SimpleServices.Services;

public class CalculatorController : Controller
{
    private readonly CalculatorService _calculator;
    public CalculatorController(CalculatorService calculator)
    {
        _calculator = calculator;
    }
    public IActionResult Add()
    {
        int result = _calculator.Add(5, 3);
        return Content("result " + result);
    }
}