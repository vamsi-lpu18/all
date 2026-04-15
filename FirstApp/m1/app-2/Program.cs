// using System.Collections;

// class Student
// {
//     public int Id{get;set;}
//     public string Name{get;set;}
//     public float Height{get;set;}
//     public float AttendancePercentage{get;set;}

// }
// class Program
// {
//     public static void Main()
//     {
//         List<Student> items=new List<Student>();
//         items.Add(new Student
//         {
//             Id=1,Name="abcd",Height=150.67f,
//             AttendancePercentage=56.6f
//         });
//          items.Add(new Student
//         {
//             Id=2,Name="dasdd",Height=430.67f,
//             AttendancePercentage=76.6f
//         }); items.Add(new Student
//         {
//             Id=5,Name="kjh",Height=198.67f,
//             AttendancePercentage=87.6f
//         }); items.Add(new Student
//         {
//             Id=6,Name="nkln",Height=0f,
//             AttendancePercentage=90.6f
//         }); items.Add(new Student
//         {
//             Id=9,Name="lajd",Height=678.67f,
//             AttendancePercentage=80.6f
//         });
//         ArrayList arr=new ArrayList(items);

//         foreach(var e in items)
//         {
//             if(e.Height ==0)
//             {
//                 Console.Write("Height Not avalibale ");
//             }
//             else Console.Write($"Height : {Math.Round(e.Height,1)} ");
//             string n="";
//             for(int i = 0; i < e.Name.Length; i += 2)
//             {
//                 n+=e.Name[i];
//             }
//             Console.Write($"Name : {n} ");
//             if(e.AttendancePercentage>=75.5)Console.Write($"Attendance:{e.AttendancePercentage}");
//             else Console.Write(" Under percentage");
//             Console.WriteLine();
//         }
//         Console.WriteLine(items.Count);
//     }
// }
// using System;
// using System.Threading.Tasks;

// class Program
// {
//     static async Task Main()
//     {
//         Task task1 = Task.Run(() => Console.WriteLine("Task 1 running"));
//         Task task2 = Task.Run(() => Console.WriteLine("Task 2 running"));

//         await Task.WhenAll();
//         Console.WriteLine("All tasks completed.");
//     }
// }

// Output:
// Task 1 running
// Task 2 running
// All tasks completed.
using System;
using System.Threading.Tasks;

class Program
{
    static void Task1() => Console.WriteLine($"Task 1 executed by {Task.CurrentId}");
    static void Task2() => Console.WriteLine($"Task 2 executed by {Task.CurrentId}");

    static void Main()
    {
        Parallel.WhenAll(Task1, Task2);
        Console.WriteLine("Parallel tasks executed.");
    }
}

// Output:
// Task 1 executed by 1
// Task 2 executed by 2
// Parallel tasks executed.
        
        