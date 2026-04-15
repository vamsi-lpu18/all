using one2manymvc.Models;
using one2manymvc.Data;
using Microsoft.EntityFrameworkCore;

namespace one2manymvc.service
{
    public class DataSeeder
    {
        public static void Seed(AppDbContext context)
        {
            // Remove all existing data
            context.Orders.RemoveRange(context.Orders);
            context.Customers.RemoveRange(context.Customers);
            context.SaveChanges();

            var c1 = new Customer { Name = "Marimuthu", City = "Chennai" };
            var c2 = new Customer { Name = "Kannan", City = "Madurai" };
            var c3 = new Customer { Name = "Ganesh", City = "Trichy" };
            var c4 = new Customer { Name = "Suresh", City = "Salem" };

            context.Customers.AddRange(c1, c2, c3, c4);
            context.SaveChanges();

            context.Orders.AddRange(
                new Order { ProductName = "iPhone", Amount = 90000, CustomerId = c1.Id, Description = "Apple iPhone" },
                new Order { ProductName = "Laptop", Amount = 60000, CustomerId = c1.Id, Description = "Dell Laptop" },
                new Order { ProductName = "AirPods", Amount = 15000, CustomerId = c1.Id, Description = "Apple AirPods" },
                new Order { ProductName = "Samsung", Amount = 35000, CustomerId = c2.Id, Description = "Samsung Phone" },
                new Order { ProductName = "Headphones", Amount = 2000, CustomerId = c2.Id, Description = "Sony Headphones" },
                new Order { ProductName = "Keyboard", Amount = 1200, CustomerId = c3.Id, Description = "Logitech Keyboard" }
            );
            context.SaveChanges();
        }
    }
}