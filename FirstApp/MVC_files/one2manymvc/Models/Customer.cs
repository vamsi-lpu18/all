using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace one2manymvc.Models
{
    public class Customer
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string City { get; set; }
        public List<Order> Orders { get; set; } = new List<Order>();
    }
}