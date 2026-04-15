import { useState, useEffect, useRef } from 'react';
import './Achievements.css';

function Achievements() {
  const [isVisible, setIsVisible] = useState(false);
  const achRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (achRef.current) observer.observe(achRef.current);
    return () => observer.disconnect();
  }, []);

  const platforms = [
    {
      name: 'LeetCode',
      color: '#ffa116',
      bg: 'rgba(255, 161, 22, 0.1)',
      badge: '🏅 830+ Solved',
      stats: [
        { label: 'Problems Solved', value: 830, suffix: '+' },
        { label: 'Rating', value: 1563 },
        { label: 'Hard Problems', value: '100+', isText: true },
      ],
      ring: 85,
    },
    {
      name: 'GeeksforGeeks',
      color: '#2f8d46',
      bg: 'rgba(47, 141, 70, 0.1)',
      badge: '⭐ University Rank 23',
      stats: [
        { label: 'Rank', value: 23, suffix: 'rd' },
        { label: 'Coding Score', value: 1593 },
        { label: 'Streak', value: '180+ days', isText: true },
      ],
      ring: 78,
    },
    {
      name: 'Overall',
      color: '#4285f4',
      bg: 'rgba(66, 133, 244, 0.1)',
      badge: '🔥 1400+ Problems',
      stats: [
        { label: 'Total Solved', value: 1400, suffix: '+' },
        { label: 'Platforms', value: 'LC, GFG, CC, CSES', isText: true },
      ],
      ring: 90,
    },
  ];
  return (
    <section id="achievements" className="achievements" ref={achRef}>
      <div className="section-container">
        <h2 className="section-title">Competitive Programming</h2>
        <p className="section-subtitle">Problem solving & algorithmic thinking</p>
        <div className="achievements-grid">
          {platforms.map((platform, index) => (
            <div key={index} className="achievement-card" style={{ '--platform-color': platform.color }}>
              <div className="achievement-visual">
                <svg className="progress-ring" viewBox="0 0 120 120">
                  <circle className="ring-bg" cx="60" cy="60" r="50" />
                  <circle
                    className="ring-fill"
                    cx="60" cy="60" r="50"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 50}`,
                      strokeDashoffset: isVisible
                        ? `${2 * Math.PI * 50 * (1 - platform.ring / 100)}`
                        : `${2 * Math.PI * 50}`,
                      stroke: platform.color,
                    }}
                  />
                </svg>
                <div className="ring-label">
                  <span className="ring-value">{platform.ring}%</span>
                  <span className="ring-text">Proficiency</span>
                </div>
              </div>
              <div className="achievement-info">
                <h3 className="achievement-platform">{platform.name}</h3>
                <span className="achievement-badge" style={{ background: platform.bg, color: platform.color }}>
                  {platform.badge}
                </span>
                <div className="achievement-stats">
                  {platform.stats.map((stat, idx) => (
                    <div key={idx} className="ach-stat">
                      <span className="ach-stat-value" style={{ color: platform.color }}>
                        {stat.isText ? stat.value : (
                          <>{isVisible ? <AnimCounter end={stat.value} /> : 0}{stat.suffix}</>
                        )}
                      </span>
                      <span className="ach-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimCounter({ end }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const inc = end / (duration / 16);
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{count}</>;
}

export default Achievements;
