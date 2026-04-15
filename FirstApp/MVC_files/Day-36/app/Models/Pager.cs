namespace app.Models;

public class Pager
{
    public int TotalItems { get; set; }
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }

    public int TotalPages => (int)Math.Ceiling((decimal)TotalItems / PageSize);
    public int StartPage => CurrentPage - 5;
    public int EndPage => CurrentPage + 5;
}
