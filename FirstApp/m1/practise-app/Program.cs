// // using System;
// // using System.Collections.Generic;
// // interface Parse
// // {
// //     public List<double> parse(List<string>items);
// // }
// // interface Rounder
// // {
// //     public List<double>rounder(List<double>items);
// // }
// // class IParse :Parse
// // {
// //     public  List<double> parse(List<string> items)
// //     {
// //        List<double> res = new List<double>();

// //         foreach (var e in items)
// //         {
// //             if (double.TryParse(e, out double n))
// //             {
// //                 double rounded = Math.Round(n, 2);
// //                 res.Add(rounded);
// //             }
// //         }
// //         return res;
// //     }
// // }
// // class IRounder : Rounder
// // {
// //     public  List<double> rounder(List<double> items)
// //     {
// //          List<double> res = new List<double>();

// //         foreach (var e in items)
// //         {
// //             if(double.IsNaN(e))continue;
// //                 // double n;
// //                 double rounded = Math.Round(e, 3,MidpointRounding.AwayFromZero)/1.00;
// //                 res.Add(rounded/1.00);

// //         }
// //         return res;
// //     }
// // }
// // class Program
// // {
// //     public static void Main()
// //     {
// //         List<string>arr = Console.ReadLine().Split(",").ToList();
// //         IParse p=new IParse();
// //         IRounder r= new IRounder();
// //         List<double> res=r.rounder(p.parse(arr));
// //         // foreach(var e in res)Console.WriteLine(e);
// //          foreach (var e in res)
// //             Console.WriteLine(e.ToString("F2"));
// //     }
// // }

// // class Program
// // {
// //     public static void Main()
// //     {
// // //         Convert an integer Student ID 105 into a string and display it with the message:
// // // Student ID: _
// //         int id=120;
// //         string s=Convert.ToString(id);
// //         // Console.WriteLine(s);
// //         // Console.WriteLine(s.GetType());

// // // Convert the string "45" into an integer and display:
// // // Available Seats: _
// // // string a="123";
// // // int.TryParse(a,out int c);
// // // int c=Convert.ToInt32(a);
// // // Console.WriteLine(c);


// // // Convert the string course fee "15000.50" into a decimal and display it.
// // // string b="15000.50";
// // // decimal.TryParse(b,out decimal r);
// // // Console.WriteLine(r);
// // // Convert an int discount 15 into a double and display it as:
// // // Discount Rate: _
// // // int a=15;
// // // double.TryParse(a,out double r);
// // // double r=Convert.ToDouble(a);
// // // Console.WriteLine(r);
// // // Convert a float attendance value 92.75f into a double and print it.
// // float a=92.75f;
// // // double.TryParse(a,out double r);
// // // double r=Convert.ToDouble(a);
// // // Console.WriteLine(r);
// // // Convert the double duration 6.8 into an int and display the number of days.
// // // Console.WriteLine((int)6.7);
// // // Convert the double temperature 37.45678 into a float and display the result.

// // // float res=(float)34.5678;
// // // Console.WriteLine(res.GetType());
// // // Convert the decimal total amount 12345.6789m into a string formatted to 2 decimal places.
// // // string res=Convert.ToString(12345.6789);
// // // Console.WriteLine(res);
// // // Convert the character grade 'B' into its numeric (ASCII/Unicode) value.
// // // Console.WriteLine((int)'b');
// // // Convert the boolean value false into a string and display:
// // bool flag=false;
// // string res=Convert.ToString(flag);
// // Console.WriteLine(res+ res.GetType());
// //     }
// // }

// namespace ItTechGenie.M1.GenericsDelegates.Q6
// {
//     public delegate void Notify(string message); // delegate type for notifications

//     public class Program
//     {
//         public static void Main()
//         {
//             var hub = new NotificationHub();                         // central hub

//             hub.Register(EmailSender.Send);                          // add email handler
//             hub.Register(SmsSender.Send);                            // add sms handler
//             hub.Register(AuditLogger.Log);                           // add audit handler

//             hub.Publish("Order #5001 placed successfully.");          // trigger notification
//         }
//     }

//     public class NotificationHub
//     {
//         private Notify? _pipeline;                                   // multicast chain

//         public void Register(Notify handler) => _pipeline += handler;   // add handler
//         public void Unregister(Notify handler) => _pipeline -= handler; // remove handler

//         // ✅ TODO: Student must implement only this method
//         public void Publish(string message)
//         {
//             // TODO:
//             // 1) If _pipeline is null, do nothing.
//             // 2) Invoke each delegate safely so one exception doesn't break others.
//             _pipeline?.Invoke(message);
//             // throw new NotImplementedException(); // remove after implementing
//         }
//     }

//     public static class EmailSender
//     {
//         public static void Send(string message) => Console.WriteLine($"EMAIL: {message}"); // simulate email
//     }

//     public static class SmsSender
//     {
//         public static void Send(string message) => Console.WriteLine($"SMS  : {message}"); // simulate sms
//     }

//     public static class AuditLogger
//     {
//         public static void Log(string message) => Console.WriteLine($"AUDIT: {message}"); // simulate audit log
//     }
// }

using System;
using System.Threading;

class Program
{
    static void Main()
    {
        // Creating a thread using a lambda expression
        Thread thread = new Thread(() =>
        {
            for (var i = 1; i <= 5; i++)
            {
                Console.WriteLine($"Lambda Thread prints {i}");
                Thread.Sleep(5000);
            }
        });

        thread.Start();
    }
}

// Output:
// Lambda Thread prints 1
// Lambda Thread prints 2
// ...
        