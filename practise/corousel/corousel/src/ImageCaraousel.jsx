import React, { useEffect, useState } from 'react';
import { data } from './data';

const ImageCarousel = () => {
    const [idx, setIdx] = useState(0);
    const [id, setId] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const back = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        if (idx - 1 >= 0) setIdx(idx => idx - 1);
        else setIdx(idx => data.length - 1);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const forw = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        if (idx + 1 <= data.length - 1) setIdx(idx => idx + 1);
        else setIdx(idx => 0);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const start = () => {
        if (!id) {
            const n = setInterval(forw, 3000);
            setId(n);
        }
    };

    const stop = () => {
        if (id) {
            clearInterval(id);
            setId(null);
        }
    };

    useEffect(() => {
        start();
        return () => stop();
    }, []);

    return (
        <div className="flex justify-between items-center min-h-screen bg-gray-300 p-4">
            <button
                className="text-6xl hover:scale-110 transition-transform mx-3 bg-white/30 rounded-full p-2"
                onClick={back}
                disabled={isTransitioning}
            >
                ⬅️
            </button>
            <div className="relative w-full max-w-3xl mx-4 group">
                <img
                    src={data[idx].image}
                    alt={data[idx].title}
                    className={`w-full h-[500px] object-contain rounded-2xl border-amber-100 border-2 transition-all duration-300 ${
                        isTransitioning ? 'opacity-50' : 'opacity-100'
                    } ${isHovered ? 'scale-105 brightness-110' : ''}`}
                    onMouseEnter={() => {
                        setIsHovered(true);
                        stop();
                    }}
                    onMouseLeave={() => {
                        setIsHovered(false);
                        start();
                    }}
                />
                <div className={`absolute bottom-4 left-0 right-0 text-center transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-80'
                }`}>
                    <p className="bg-black/50 text-white px-4 py-2 rounded-lg">
                        {data[idx].title}
                    </p>
                </div>
            </div>
            <button
                className="text-6xl hover:scale-110 transition-transform mx-3 bg-white/30 rounded-full p-2"
                onClick={forw}
                disabled={isTransitioning}
            >
                ➡️
            </button>
        </div>
    );
};

export default ImageCarousel;
