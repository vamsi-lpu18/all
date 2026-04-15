interface I1
{
    public void m1();
}
interface I2
{
    public void m2();
}
interface I3
{
    public void m3();
}
interface I4
{
    public void m4();
}
public class A : I1, I2, I3, I4
{
    public void m1()
    {
        Console.WriteLine("Shut ");
    }
    public void m2()
    {
        Console.WriteLine("The ");

    }
    public void m3()
    {
        Console.WriteLine("Fuck");
    }
    public void m4()
    {
        Console.WriteLine("Up");
    }
}
public class B : A
{
    public void m5()
    {
        Console.WriteLine("Bitch");
    }
}

