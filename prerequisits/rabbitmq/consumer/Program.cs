// See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
var factory = new ConnectionFactory() { HostName = "localhost" };
var connection = factory.CreateConnection();
var channel = connection.CreateModel();

var consumer=new EventingBasicConsumer(channel);
int i=0;
consumer.Received += (model, args) =>{
    var body = args.Body.ToArray();
    var message = System.Text.Encoding.UTF8.GetString(body);
    Console.WriteLine($"Received {i++}: {message}");
};

// channel.BasicAck(args.DeliveryTag, false);
channel.BasicConsume(queue: "fq1", autoAck: true, consumer: consumer);
Console.WriteLine(" Press [enter] to exit.");
Console.ReadLine();

