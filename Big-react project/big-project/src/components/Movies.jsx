
import React, { useState, useEffect } from "react";
import Card from "./Card";

const Movies = ({ handleAdd, handleRemove, watchList }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (page) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://www.omdbapi.com/?s=batman&page=${page}&apikey=9cba9513`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "True") {
        const detailedMovies = [];
        for (let movie of data.Search) {
          const detailsResponse = await fetch(
            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=9cba9513`
          );
          const details = await detailsResponse.json();

          detailedMovies.push({
            id: details.imdbID,
            Title: details.Title,
            Year: details.Year,
            Poster: details.Poster,
            Genre: details.Genre,
            imdbRating: details.imdbRating,
          });
        }

        setMovies(detailedMovies);
        setTotalPages(Math.ceil(data.totalResults / 10));
      } else {
        throw new Error(data.Error || "Failed to fetch movies");
      }
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Amazing Movies...</h2>
            <p className="text-gray-600">Fetching the latest releases for you</p>
          </div>
          
          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-80 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => fetchMovies(currentPage)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Amazing Movies
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of the best movies from around the world
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              poster={movie.Poster}
              title={movie.Title}
              year={movie.Year}
              genre={movie.Genre}
              rating={movie.imdbRating}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              watchList={watchList}
              movie={movie}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 shadow-lg"
            }`}
          >
            ← Previous
          </button>
          
          <div className="flex items-center space-x-2">
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              const pageNum = Math.max(1, currentPage - 2) + index;
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === pageNum
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 shadow-lg"
            }`}
          >
            Next →
          </button>
        </div>
        
        <div className="text-center mt-4 text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default Movies;
