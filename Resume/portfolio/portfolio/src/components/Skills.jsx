import { useState, useEffect, useRef } from 'react';
import './Skills.css';

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: 'Languages',
      icon: '🧑‍💻',
      color: '#4285f4',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'C++', level: 88 },
        { name: 'JavaScript', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'C#', level: 75 },
        { name: 'SQL', level: 80 },
      ]
    },
    {
      title: 'Backend & Platform',
      icon: '⚙️',
      color: '#34a853',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 85 },
        { name: 'Django', level: 80 },
        { name: '.NET', level: 75 },
        { name: 'RESTful APIs', level: 88 },
        { name: 'Microservices', level: 80 },
        { name: 'Distributed Systems', level: 78 },
        { name: 'WebSocket', level: 80 },
      ]
    },
    {
      title: 'Frontend',
      icon: '💻',
      color: '#fbbc04',
      skills: [
        { name: 'React.js', level: 85 },
        { name: 'Next.js 15', level: 80 },
        { name: 'HTML5', level: 90 },
        { name: 'CSS3', level: 88 },
        { name: 'SSR', level: 75 },
      ]
    },
    {
      title: 'Databases & Storage',
      icon: '📚',
      color: '#06b6d4',
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 78 },
        { name: 'Redis', level: 75 },
        { name: 'Supabase', level: 70 },
        { name: 'Prisma ORM', level: 70 },
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: '\u2601\ufe0f',
      color: '#a855f7',
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'Kubernetes', level: 78 },
        { name: 'CI/CD (GitHub Actions)', level: 80 },
        { name: 'Git', level: 90 },
        { name: 'AWS', level: 75 },
        { name: 'Vercel', level: 70 },
      ]
    },
    {
      title: 'Core Concepts',
      icon: '\ud83e\udde0',
      color: '#fbbc04',
      skills: [
        { name: 'Data Structures & Algorithms', level: 90 },
        { name: 'OOP', level: 85 },
        { name: 'System Design', level: 80 },
        { name: 'Cloud-Scale Platforms', level: 75 },
        { name: 'Concurrency', level: 70 },
        { name: 'Caching', level: 70 },
        { name: 'Distributed Systems', level: 78 },
      ]
    },
  ];

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="section-container">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Technologies I work with</p>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card" style={{ '--card-color': category.color }}>
              <div className="skill-card-header">
                <span className="skill-icon">{category.icon}</span>
                <h3 className="skill-category">{category.title}</h3>
              </div>
              <div className="skill-bars">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-bar-item">
                    <div className="skill-bar-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          background: category.color,
                          transitionDelay: `${idx * 0.15}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
