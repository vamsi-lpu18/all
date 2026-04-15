using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

public class RabbitWorker : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var factory = new ConnectionFactory()
        {
            HostName = "localhost"
        };

        var connection = await factory.CreateConnectionAsync();
        var channel = await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(
            queue: "cube_queue",
            durable: false,
            exclusive: false,
            autoDelete: false);

        var consumer = new AsyncEventingBasicConsumer(channel);

        consumer.ReceivedAsync += async (sender, ea) =>
        {
            var number = int.Parse(Encoding.UTF8.GetString(ea.Body.ToArray()));

            var cube = number * number * number;

            Console.WriteLine($"Cube of {number} = {cube}");

            await Task.CompletedTask;
        };

        await channel.BasicConsumeAsync(
            queue: "cube_queue",
            autoAck: true,
            consumer: consumer);

        // 🔥 KEEP SERVICE ALIVE
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }
    }
}