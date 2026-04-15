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
            queue: "square_queue",
            durable: false,
            exclusive: false,
            autoDelete: false);

        var consumer = new AsyncEventingBasicConsumer(channel);

        consumer.ReceivedAsync += async (sender, ea) =>
        {
            var number = int.Parse(Encoding.UTF8.GetString(ea.Body.ToArray()));

            var square = number * number;

            Console.WriteLine($"Square of {number} = {square}");

            await Task.CompletedTask;
        };

        await channel.BasicConsumeAsync(
            queue: "square_queue",
            autoAck: true,
            consumer: consumer);

        // keep service alive
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }
    }
}