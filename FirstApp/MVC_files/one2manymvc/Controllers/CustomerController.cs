using one2manymvc.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//using one2manymvc.Models;

namespace one2manymvc.Controllers
{
    // Standard MVC controller, no API routing
    public class CustomerController : Controller
    {
        private readonly AppDbContext _context;

        public CustomerController(AppDbContext context)
        {
            _context = context;
        }

        // Question 1
        // Customers whose total orders > 1000
[HttpGet]
        public IActionResult OrdersAbove1000()
            
        {
            var result = _context.Customers
                .Include(c => c.Orders)
                .Where(c => c.Orders.Sum(o => o.Amount) > 1000)
                .ToList();

            return View(result);
        }

        // Question 2
        // Who purchased iPhone

        public IActionResult WhoPurchasedIphone()
        {
            var result = _context.Orders
                .Include(o => o.Customer)
                .Where(o => o.ProductName == "iPhone")
                .ToList();

            return View(result);
        }

        // Question 3
        // Show all customers with orders

        public IActionResult CustomerOrders()
        {
            var result = _context.Customers
                .Include(c => c.Orders)
                .ToList();

            return View(result);
        }

    }
}