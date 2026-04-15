import { useState, useEffect, useRef } from 'react';
import './Stats.css';

function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: 1400, suffix: '+', label: 'Problems Solved', icon: '💻', color: '#4285f4' },
    { number: 1563, suffix: '', label: 'LeetCode Rating', icon: '⭐', color: '#ffa116' },
    { number: 1593, suffix: '', label: 'GFG Coding Score', icon: '🏆', color: '#2f8d46' },
    { number: 830, suffix: '+', label: 'LeetCode Solved', icon: '🔥', color: '#ea4335' },
    { number: 23, suffix: 'rd', label: 'GFG Univ Rank', icon: '🥇', color: '#fbbc04' },
    { number: 180, suffix: '+', label: 'Day Streak', icon: '⚡', color: '#8ab4f8' },
  ];

  return (
    <section className="stats" ref={statsRef}>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item" style={{ '--accent': stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">
              {isVisible ? <AnimatedCounter end={stat.number} /> : '0'}
              <span className="stat-suffix">{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnimatedCounter({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}</span>;
}

export default Stats;
