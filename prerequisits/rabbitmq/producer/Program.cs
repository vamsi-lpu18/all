// See https://aka.ms/new-console-template for more information
using System.Text;
using System.Text.Unicode;
using RabbitMQ.Client;

Console.WriteLine("producer side");
var factory = new ConnectionFactory()
{
    HostName = "localhost",

};
var connection = factory.CreateConnection();

//this will create an object of rabbitmq channel and we can use this channel to send messages to the queue
var channel = connection.CreateModel();
channel.QueueDeclare(
    queue: "key1",
    durable: false,
    exclusive: false,
    autoDelete: false,
    arguments: null
);

//---------1.default exchange (Direct exchange)------------------
// for(int i = 0; i < 10000; i++)
// {
//     string msg = "this is a demo message " + i;
//     var bytes = Encoding.UTF8.GetBytes(msg);
//     channel.BasicPublish(exchange: "", routingKey: "key1", basicProperties: null, body: bytes);
// }
//---------2.Custom  exchange------------------
// string exchangeName = "myExchange";
// channel.ExchangeDeclare(exchange: exchangeName, type:"direct");
// channel.QueueDeclare(
//     queue: "customq",
//     durable: false,
//     exclusive: false,
//     autoDelete: false,
//     arguments: null
// );
// for(int i=0;i<10000;i++)
// {
//     var msg=Encoding.UTF8.GetBytes("this is a custom exchange message");
//     channel.QueueBind(queue: "customq", exchange: exchangeName, routingKey: "kkk");
//     channel.BasicPublish(exchange: exchangeName, routingKey: "kkk", basicProperties: null, body: msg);
// }
// Console.WriteLine("Message sent to the queue");
// Console.ReadLine();
//---------3.Fanout exchange------------------
string exchangeName = "myFanoutExchange";
channel.ExchangeDeclare(exchange: exchangeName, type: "fanout");
channel.QueueDeclare(
    queue: "fq1",
    durable: false,
    exclusive: false,
    autoDelete: false,
    arguments: null
);
channel.QueueDeclare(
    queue: "fq2",
    durable: false,
    exclusive: false,
    autoDelete: false,
    arguments: null
);
for(int i=0;i<10000;i++)
{
    var msg=Encoding.UTF8.GetBytes("this is a fanout exchange message");    
channel.QueueBind(queue: "fq1", exchange: exchangeName, routingKey: "");
channel.QueueBind(queue: "fq2", exchange: exchangeName, routingKey: "");
channel.BasicPublish(exchange: exchangeName, routingKey: "", basicProperties: null, body: Encoding.UTF8.GetBytes("this is a fanout exchange message"));
}
Console.WriteLine("Message sent to the queue");
