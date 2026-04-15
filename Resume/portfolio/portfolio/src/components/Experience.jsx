import { useState, useEffect, useRef } from 'react';
import './Experience.css';

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const expRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (expRef.current) observer.observe(expRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="experience" ref={expRef}>
      <div className="section-container">
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-subtitle">Where I've contributed and grown</p>
        <div className="experience-timeline">
          <div className={`experience-card ${isVisible ? 'visible' : ''}`}>
            <div className="exp-header">
              <div className="exp-company-info">
                <div className="exp-company-badge">
                  <span className="exp-company-icon">🏢</span>
                </div>
                <div>
                  <h3 className="exp-company">Labmantix</h3>
                  <p className="exp-role">Software Developer Intern</p>
                </div>
              </div>
              <div className="exp-period-badge">2025 – Present</div>
            </div>
            <div className="exp-highlights">
              <div className="exp-highlight-item">
                <span className="exp-bullet">▸</span>
                <p>Owned end-to-end development of backend features from design to deployment, leveraging Redis caching and asynchronous processing to improve API response time by <strong>30–40%</strong> under concurrent load.</p>
              </div>
              <div className="exp-highlight-item">
                <span className="exp-bullet">▸</span>
                <p>Developed backend services and RESTful APIs using Node.js and Django, supporting <strong>hundreds of daily active users</strong> across a distributed SaaS platform.</p>
              </div>
              <div className="exp-highlight-item">
                <span className="exp-bullet">▸</span>
                <p>Implemented JWT-based authentication and role-based access control (RBAC), securing user workflows and reducing unauthorized access issues.</p>
              </div>
              <div className="exp-highlight-item">
                <span className="exp-bullet">▸</span>
                <p>Containerized services using Docker and set up CI/CD pipelines with GitHub Actions, reducing deployment time by <strong>40–50%</strong> and enabling faster release cycles.</p>
              </div>
            </div>
            <div className="exp-tech-stack">
              {['Node.js', 'Django', '.NET', 'Redis', 'Docker', 'GitHub Actions', 'JWT', 'RBAC', 'REST APIs'].map((tech, idx) => (
                <span key={idx} className="exp-tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
