namespace SquareService
{
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
                queue: "number_queue",
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            await channel.QueueDeclareAsync(
                queue: "square_queue",
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            var consumer = new AsyncEventingBasicConsumer(channel);

            consumer.ReceivedAsync += async (sender, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);

                int number = int.Parse(message);
                int square = number * number;

                var newBody = Encoding.UTF8.GetBytes(square.ToString());

                // ⭐ copy message metadata
                var props = new BasicProperties();
                props.CorrelationId = ea.BasicProperties.CorrelationId;
                props.ReplyTo = ea.BasicProperties.ReplyTo;

                await channel.BasicPublishAsync(
                    exchange: "",
                    routingKey: "square_queue",
                    mandatory: false,
                    basicProperties: props,
                    body: newBody);

                await Task.CompletedTask;
            };

            await channel.BasicConsumeAsync(
                queue: "number_queue",
                autoAck: true,
                consumer: consumer);
        }
    }
}