using System.ComponentModel.DataAnnotations;
using one2manymvc.Models;
namespace one2manymvc.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public decimal Amount { get; set; }
        public string ProductName { get; set; }
    }
}
