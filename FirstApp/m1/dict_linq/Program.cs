// // ============ SHOPPING CART PROGRAM ============
// public abstract class Product
// {
//     public int Id { get; set; }
//     public string Name { get; set; }
//     public double Price { get; set; }
// }

// // Generic shopping cart
// public class ShoppingCart<T> where T : Product
// {
//     private Dictionary<T, int> _cartItems = new Dictionary<T, int>();
    
//     // Add product to cart
//     public void AddToCart(T product, int quantity)
//     {
//         // Add or update quantity in dictionary
//         if (_cartItems.ContainsKey(product))
//         {
//             _cartItems[product] += quantity;
//         }
//         else
//         {
//             _cartItems.Add(product, quantity);
//         }
//     }
    
//     // Calculate total with discount delegate
//     public double CalculateTotal(Func<T, double, double> discountCalculator = null)
//     {
//         double total = 0;
//         foreach (var item in _cartItems)
//         {
//             double price = item.Key.Price * item.Value;
//             if (discountCalculator != null)
//                 price = discountCalculator(item.Key, price);
//             total += price;
//         }
//         return total;
//     }
    
//     // Get top N expensive items using LINQ
//     public List<T> GetTopExpensiveItems(int n)
//     {
//         return _cartItems.Keys
//             .OrderByDescending(p => p.Price)
//             .Take(n)
//             .ToList();
//     }
// }

class Electronics : Product { }
class Clothing : Product { }

// ============ TOURNAMENT PROGRAM ============
public class Match
{
    public Team Team1 { get; set; }
    public Team Team2 { get; set; }
    public int Team1Score { get; set; }
    public int Team2Score { get; set; }

    public Match(Team team1, Team team2)
    {
        Team1 = team1;
        Team2 = team2;
    }

    public Match Clone()
    {
        return new Match(Team1, Team2)
        {
            Team1Score = this.Team1Score,
            Team2Score = this.Team2Score
        };
    }
}

public class Team : IComparable<Team>
{
    public string Name { get; set; }
    public int Points { get; set; }
    
    public int CompareTo(Team other)
    {
        // Compare by points descending, then by name ascending
        if (other.Points != this.Points)
        {
            return other.Points.CompareTo(this.Points); // Descending order
        }
        return this.Name.CompareTo(other.Name); // Ascending order for name
    }
}

public class Tournament
{
    private List<Team> _teams = new List<Team>();
    private LinkedList<Match> _schedule = new LinkedList<Match>();
    private Stack<Match> _undoStack = new Stack<Match>();
    
    public void RegisterTeam(Team team)
    {
        if (!_teams.Contains(team))
        {
            _teams.Add(team);
        }
    }

    // Add match to schedule
    public void ScheduleMatch(Match match)
    {
        _schedule.AddLast(match);
    }
    
    // Record match result and update rankings
    public void RecordMatchResult(Match match, int team1Score, int team2Score)
    {
        _undoStack.Push(match.Clone());
        
        match.Team1Score = team1Score;
        match.Team2Score = team2Score;
        
        // Update team points
        if (team1Score > team2Score)
        {
            match.Team1.Points += 3; // Win = 3 points
        }
        else if (team2Score > team1Score)
        {
            match.Team2.Points += 3;
        }
        else
        {
            match.Team1.Points += 1; // Draw = 1 point each
            match.Team2.Points += 1;
        }
    }
    
    // Undo last match
    public void UndoLastMatch()
    {
        if (_undoStack.Count > 0)
        {
            Match lastMatch = _undoStack.Pop();
            
            // Revert points
            if (lastMatch.Team1Score > lastMatch.Team2Score)
            {
                lastMatch.Team1.Points -= 3;
            }
            else if (lastMatch.Team2Score > lastMatch.Team1Score)
            {
                lastMatch.Team2.Points -= 3;
            }
            else
            {
                lastMatch.Team1.Points -= 1;
                lastMatch.Team2.Points -= 1;
            }
        }
    }
    
    // Get ranking position using binary search
    public int GetTeamRanking(Team team)
    {
        var sortedTeams = GetRankings();
        for (int i = 0; i < sortedTeams.Count; i++)
        {
            if (sortedTeams[i] == team)
            {
                return i + 1; // Return position (1-based)
            }
        }
        return -1;
    }
    
    public List<Team> GetRankings()
    {
        _teams.Sort();
        return new List<Team>(_teams);
    }
}

class Program
{
    public static void Main()
    {
        Console.WriteLine("========== SHOPPING CART DEMO ==========");
        ShoppingCart<Electronics> cart = new ShoppingCart<Electronics>();

        cart.AddToCart(new Electronics { Id = 1, Name = "Laptop", Price = 999.99 }, 1);
        cart.AddToCart(new Electronics { Id = 2, Name = "Mouse", Price = 29.99 }, 2);

        // Apply 10% discount for items over $100
        double total = cart.CalculateTotal((product, price) => 
            price > 100 ? price * 0.9 : price);

        Console.WriteLine($"Total: ${total:F2}");

        var topItems = cart.GetTopExpensiveItems(1);
        Console.WriteLine($"Most expensive item: {topItems[0].Name}");

        Console.WriteLine("\n========== TOURNAMENT DEMO ==========");
        Tournament tournament = new Tournament();
        Team teamA = new Team { Name = "Team Alpha", Points = 0 };
        Team teamB = new Team { Name = "Team Beta", Points = 0 };

        tournament.RegisterTeam(teamA);
        tournament.RegisterTeam(teamB);

        Match match = new Match(teamA, teamB);
        tournament.ScheduleMatch(match);
        tournament.RecordMatchResult(match, 3, 1); // Team A wins

        var rankings = tournament.GetRankings();
        Console.WriteLine($"1st place: {rankings[0].Name} ({rankings[0].Points} points)");
        Console.WriteLine($"Team Alpha ranking: {tournament.GetTeamRanking(teamA)}");

        Console.WriteLine($"\nBefore undo - Team A Points: {teamA.Points}");
        tournament.UndoLastMatch();
        Console.WriteLine($"After undo - Team A Points: {teamA.Points}");
    }
}
