class Program
{
    public static event Action<string> Gold;
    public static event Action<int> Calculate;
    public static event Action<int> Payment;
    
    public void name(string s)
    {
        // Gold?.Invoke(s);
        Console.WriteLine("ornament  is " + s);
        Gold?.Invoke(s);
    }
    public void calculate(int weight)
    {
        Calculate?.Invoke(weight);
    }

    public void payment(int amount)
    {
        Payment?.Invoke(amount);
    }

    public static void Main()
    {
        //correct the code and implement the events for gold sale
        // Gold gold = new Gold();
        Gold += (s) => Console.WriteLine($"Gold is {s}");
        // Gold.Calculate += (weight) => Console.WriteLine($"Calculated value for {weight} grams of gold");
        // Gold.Payment += (amount) => Console.WriteLine($"Payment of {amount} received");
        // gold.name("Shining");
        // gold.calculate(100);
        // gold.payment(5000);
        Calculate += (weight) => Console.WriteLine($"Calculated value for {weight} grams of gold");
        Payment += (amount) => Console.WriteLine($"Payment of {amount} received");

        Gold?.Invoke("ring");
        Calculate?.Invoke(100);
        Payment?.Invoke(5000);


    }
}
// class Gold
// {
    
// }
// class 