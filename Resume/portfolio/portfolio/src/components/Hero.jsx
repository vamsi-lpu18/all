import { useState, useEffect } from 'react';
import './Hero.css';

const roles = [
  'Software Developer Intern',
  'Full Stack Developer',
  'Backend Enthusiast',
  'Problem Solver',
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-greeting">Hello, I'm</div>
          <h1 className="hero-title">
            <span className="gradient-text">Vamsi Kotamsetti</span>
          </h1>
          <div className="hero-role">
            <span className="role-text">{displayText}</span>
            <span className="cursor">|</span>
          </div>
          <div className="hero-summary">
            <p>Software Developer Intern at Labmantix, experienced in building scalable backend systems and distributed services using Python, Node.js, Django, Next.js, and .NET. Strong in data structures, algorithms, and system design with 1400+ problems solved across platforms.</p>
            <p className="hero-location">📍 West Godavari, Andhra Pradesh</p>
          </div>
          <div className="hero-links">
            <a href="https://github.com/vamsi-lpu18" target="_blank" rel="noopener noreferrer" className="hero-btn primary">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/vamsi-kotamsetti-47b302260" target="_blank" rel="noopener noreferrer" className="hero-btn secondary">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              LinkedIn
            </a>
            <a href="mailto:vamsi14roll@gmail.com" className="hero-btn secondary">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email
            </a>
            <a href="tel:+919182683257" className="hero-btn secondary">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call
            </a>
            <a href="https://drive.google.com/file/d/1HCyJR3IxKQ3HiGmqSoMC8D7FWqIxJ12D/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hero-btn resume">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
              Download CV
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title">vamsi@dev ~ </span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line"><span className="prompt">$</span> <span className="cmd">node</span> developer.js</div>
              <div className="terminal-line output">
                <span className="brace">{'{'}</span>
              </div>
              <div className="terminal-line output indent">
                <span className="key">"name"</span>: <span className="value">"Vamsi Kotamsetti"</span>,
              </div>
              <div className="terminal-line output indent">
                <span className="key">"role"</span>: <span className="value">"Software Developer Intern"</span>,
              </div>
              <div className="terminal-line output indent">
                <span className="key">"company"</span>: <span className="value">"Labmantix"</span>,
              </div>
              <div className="terminal-line output indent">
                <span className="key">"stack"</span>: <span className="value">["Next.js", "Node.js", "Django", ".NET", "Python", "Docker"]</span>,
              </div>
              <div className="terminal-line output indent">
                <span className="key">"projects"</span>: <span className="number">6</span>,
              </div>
              <div className="terminal-line output indent">
                <span className="key">"problems_solved"</span>: <span className="number">1400</span>,
              </div>
              <div className="terminal-line output indent">
                <span className="key">"open_to_work"</span>: <span className="bool">true</span>
              </div>
              <div className="terminal-line output">
                <span className="brace">{'}'}</span>
              </div>
              <div className="terminal-line"><span className="prompt">$</span> <span className="cursor-blink">▊</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
