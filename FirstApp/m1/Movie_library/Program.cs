interface IFilm
{
    public string Title;
    public string Director;
    public int year;
}
class Film : IFilm
{
    public string Title{get;set;}
    public string Director{get ;set;}
    public int year{get;set;}
}

interface IFilmLibrary
{
    public void AddFilm(IFilm ifilm);
    public void RemoveFilm(string title);
    public List<>GetFilms();
    public List<>SearchFilms(string query);
    public int GetTotalFilmCount();
}
class FilmLibrary
{
    private List<IFilm>_films;
    public void AddFilm(IFilm film)
    {
        _films.Add(film);
    }
    public void RemoveFilm(string title)
    {
        IFilm filmToRemove=_films.FirstOrDefault((e)=>e.Title.Equals(title,StringComparison.OrdinalIgnoreCase));
        if(filmToRemove)
        _films.Remove(filmToRemove);
    }
    public List<IFilm> SearchFilms(string query)
    {
        List<IFilm> film=_films.FirstOrDefault((e)=>e.Title.Equals(query,StringComparison.OrdinalIgnoreCase) 
        ||e.Director.Equals(query,StringComparison.OrdinalIgnoreCase));
    }
}