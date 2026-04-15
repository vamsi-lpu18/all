using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Client;
using System.Text;

namespace InputService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NumberController : ControllerBase
    {
        [HttpGet]
        public async Task<string> SendNumber(int number)
        {
            var factory = new ConnectionFactory()
            {
                HostName = "localhost"
            };

            await using var connection = await factory.CreateConnectionAsync();
            await using var channel = await connection.CreateChannelAsync();

            // declare both queues
            await channel.QueueDeclareAsync("square_queue", false, false, false);
            await channel.QueueDeclareAsync("cube_queue", false, false, false);

            var body = Encoding.UTF8.GetBytes(number.ToString());

            // 🔥 send to square queue
            await channel.BasicPublishAsync(
                exchange: "",
                routingKey: "square_queue",
                body: body);

            // 🔥 send to cube queue
            await channel.BasicPublishAsync(
                exchange: "",
                routingKey: "cube_queue",
                body: body);

            return $"Sent {number} to both queues";
        }
    }
}