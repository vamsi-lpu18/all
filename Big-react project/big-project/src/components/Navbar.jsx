import React from 'react'
import icon from '../icon.jpg'
import {Link, useLocation} from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/20">
              <img src={icon} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MovieHub
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link 
              to="/Movies" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/Movies') 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              🎬 Movies
            </Link>
            <Link 
              to="/watchList" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/watchList') 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              📋 Watchlist
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              🔍
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              ⚙️
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
