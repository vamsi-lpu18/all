using System;

class Doctor
{
    public static int TotalDoctors;
    public readonly string LicenseNumber;
    public string Name { get; set; }
    public string Specialization { get; set; }

    static Doctor()
    {
        TotalDoctors = 0;
    }

    public Doctor(string name, string specialization, string license)
    {
        Name = name;
        Specialization = specialization;
        LicenseNumber = license;
        TotalDoctors++;
    }
}

class Cardiology : Doctor
{
    public string A;
    public int Age;
    public long Number;

    public Cardiology(string n, int ag, long num, string license, string special)
        : base(n, special, license)
    {
        A = n;
        Age = ag;
        Number = num;
        Console.WriteLine("doctors"+TotalDoctors);
    }
    // Console.WriteLine(Total)

}

class Program
{
    public static void Main()
    {
        Doctor d = new Cardiology(
            "abcd",
            10,
            1234567899,
            "aaaa",
            "Cardiology"
        );
         Doctor c = new Cardiology(
            "abcdefg",
            19,
            1237899,
            "adedea",
            "Carddededgy"
        );

        Console.WriteLine(d.Name);
        Console.WriteLine(Doctor.TotalDoctors);
        Console.WriteLine(Cardiology.TotalDoctors);
    }
}
