
import React, { useState } from 'react';

const WatchList = ({ watchList, setWatchList }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('title'); // 'title', 'rating', 'year'

  const genres = [
    'Action', 'Drama', 'Adventure', 'Sci-Fi', 'Crime', 'Fantasy',
    'Thriller', 'Horror', 'Comedy', 'Family', 'Mystery', 'Romance',
    'Animation', 'War', 'Short',
  ];

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    const sortedList = [...watchList].sort((a, b) => {
      switch (sortType) {
        case 'rating':
          const ratingA = parseFloat(a.imdbRating) || 0;
          const ratingB = parseFloat(b.imdbRating) || 0;
          return ratingB - ratingA;
        case 'year':
          return parseInt(b.Year) - parseInt(a.Year);
        case 'title':
        default:
          return a.Title.localeCompare(b.Title);
      }
    });
    setWatchList(sortedList);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const filteredWatchList = watchList.filter((movie) => {
    const matchesSearch = movie.Title.toLowerCase().includes(searchValue.toLowerCase());
    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) =>
        movie.Genre.toLowerCase().includes(genre.toLowerCase())
      );
    return matchesSearch && matchesGenre;
  });

  const removeFromWatchList = (movieToRemove) => {
    setWatchList((prev) => {
      const updatedList = prev.filter((movie) => movie.id !== movieToRemove.id);
      localStorage.setItem("movie", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Watchlist
          </h1>
          <p className="text-xl text-gray-600">
            {watchList.length} movies in your collection
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <input
                  type="text"
                  onChange={handleSearch}
                  value={searchValue}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Search your watchlist..."
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="title">Title</option>
                <option value="rating">Rating</option>
                <option value="year">Year</option>
              </select>
            </div>
          </div>

          {/* Genre Filters */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter by Genre:</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedGenres.includes(genre)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredWatchList.length} of {watchList.length} movies
          </p>
        </div>

        {/* Movies Grid */}
        {filteredWatchList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWatchList.map((movie) => (
              <div key={movie.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                {/* Movie Poster */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${movie.Poster})` }}
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWatchList(movie)}
                      className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-75 group-hover:scale-100"
                      title="Remove from watchlist"
                    >
                      ✕
                    </button>

                    {/* Rating Badge */}
                    {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                      <div className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                        <span>★</span>
                        <span>{movie.imdbRating}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {movie.Title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📅</span>
                      <span>{movie.Year}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">🎭</span>
                      <span className="line-clamp-1">{movie.Genre}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                      View Details
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
                      ⭐
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {watchList.length === 0 ? 'Your watchlist is empty' : 'No movies match your criteria'}
            </h2>
            <p className="text-gray-600 mb-6">
              {watchList.length === 0 
                ? 'Start adding movies to your watchlist to see them here!' 
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            {watchList.length === 0 && (
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                Browse Movies
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;
