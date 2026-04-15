using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Client;
using System.Text;

namespace CubeService.Controllers
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

            await channel.QueueDeclareAsync("cube_queue", false, false, false);

            var body = Encoding.UTF8.GetBytes(number.ToString());

            await channel.BasicPublishAsync(
                exchange: "",
                routingKey: "cube_queue",
                body: body);

            return $"Number {number} sent to cube_queue!";
        }
    }
}
