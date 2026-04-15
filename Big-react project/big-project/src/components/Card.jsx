
import React from 'react';

const Card = ({ 
  poster, 
  title, 
  year, 
  genre, 
  rating, 
  handleAdd, 
  handleRemove, 
  watchList, 
  movie, 
  id 
}) => {
  const isInWatchList = (movie) => {
    return watchList.some((item) => item.id === movie.id); 
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Movie Poster */}
      <div className="relative h-80 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${poster})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            {isInWatchList(movie) ? (
              <button
                className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
                onClick={() => handleRemove(movie)}
                title="Remove from watchlist"
              >
                ✕
              </button>
            ) : (
              <button
                className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
                onClick={() => handleAdd(movie)}
                title="Add to watchlist"
              >
                ♥
              </button>
            )}
          </div>

          {/* Rating Badge */}
          {rating && rating !== 'N/A' && (
            <div className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
              <span>★</span>
              <span>{rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">📅</span>
            <span>{year}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">🎭</span>
            <span className="line-clamp-1">{genre}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105">
            View Details
          </button>
          <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
            ⭐
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default Card;
