import React from 'react'

const Banner = () => {
    return (
        <div className="relative w-full h-[600px] bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Discover Amazing
                        <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Movies
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Explore thousands of movies, create your watchlist, and never miss the latest releases
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-lg hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                            🎬 Browse Movies
                        </button>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full text-lg border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                            📋 My Watchlist
                        </button>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex justify-center items-center gap-8 mt-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">10K+</div>
                            <div className="text-gray-300">Movies Available</div>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">4.8★</div>
                            <div className="text-gray-300">Average Rating</div>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">24/7</div>
                            <div className="text-gray-300">Available</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

export default Banner
