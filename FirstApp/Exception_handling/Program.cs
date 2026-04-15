using System;

class InsufficientBalanceException : Exception
{
    public InsufficientBalanceException(string message) : base(message)
    {
    }
}

public class BankAccount
{
    public decimal Balance { get; private set; }

    public BankAccount(decimal initialBalance)
    {
        if (initialBalance < 0)
            throw new ArgumentException(
                "Initial balance cannot be negative",
                nameof(initialBalance));

        Balance = initialBalance;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException(
                "Withdrawal amount must be greater than zero",
                nameof(amount));

        if (amount > Balance)
            throw new InsufficientBalanceException(
                $"Cannot withdraw {amount:C}. Available balance: {Balance:C}");

        Balance -= amount;
        Console.WriteLine($"{amount:C} withdrawn successfully.");
    }
}

class Program
{
    static void Main()
    {
        try
        {
            BankAccount account = new BankAccount(1000);

            Console.WriteLine("Enter withdrawal amount:");
            decimal amount = decimal.Parse(Console.ReadLine());

            account.Withdraw(amount);

            Console.WriteLine("Withdrawal successful.");
            Console.WriteLine($"Remaining Balance: {account.Balance:C}");
        }
        catch (InsufficientBalanceException ex)
        {
            Console.WriteLine("Transaction failed: " + ex.Message);
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine("Invalid input: " + ex.Message);
        }
        catch (FormatException)
        {
            Console.WriteLine("Please enter a valid numeric amount.");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Unexpected error: " + ex.Message);
        }
        finally
        {
            Console.WriteLine("Thank you for using our banking service.");
        }
    }
}
