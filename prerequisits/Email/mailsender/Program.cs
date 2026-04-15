// // See https://aka.ms/new-console-template for more information
// using MimeKit;
// using MailKit.Net.Smtp;
// using System;
// Console.WriteLine("Notification service");
// var message = new MimeMessage();
// var from=new MailboxAddress("vamsi here", "vamsi14roll@gmail.com");
// message.From.Add(from);
// var to = new MailboxAddress("mohan", "mohanmutyalu@gmail.com");
// message.To.Add(to);
// message.Subject = "Notification demo from  dotnet";
// message.Body = new TextPart("plain")
// {
//     Text = @"Hi Mohan,
// This is a simple notification message sent from a .NET application."
// };
// using var smtp=new SmtpClient();
// await smtp.ConnectAsync("smtp.gmail.com", 587);
// await smtp.SendAsync(message);
// await smtp.DisconnectAsync(true);
// Console.WriteLine("Email sent successfully!");


using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SendEmailWithGoogleSMTP
{
    class Program
    {
        public static void Main(string[] args)
        {
            string fromMail = "vamsi14roll@gmail.com";
            string fromPassword = "okawoirlcxsxopyt";

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.Subject = "Test Subject";
            message.To.Add(new MailAddress("srikaran2230@gmail.com"));
            message.Body = "<html><body> Testing mail functionality with HTML support </body></html>";
            message.IsBodyHtml = true;

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587, 
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);
        }
    }
}
