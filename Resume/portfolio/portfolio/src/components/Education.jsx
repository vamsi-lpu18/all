import './Education.css';

function Education() {
  const education = [
    {
      degree: 'B.Tech',
      major: 'Computer Science & Engineering (CSE)',
      institution: 'Lovely Professional University',
      location: 'Phagwara, Punjab',
      period: 'Aug 2022 – May 2026',
      grade: '7.5',
      gradeLabel: 'CGPA',
      gradeMax: '10',
      color: '#4285f4',
      icon: '🎓',
      progress: 75,
    }
  ];

  return (
    <section id="education" className="education">
      <div className="section-container">
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">Academic journey & accomplishments</p>
        <div className="education-timeline">
          {education.map((edu, index) => (
            <div key={index} className="education-item" style={{ '--edu-color': edu.color }}>
              <div className="education-marker">
                <span className="edu-icon">{edu.icon}</span>
              </div>
              <div className="education-card">
                <div className="education-card-top">
                  <div className="edu-info">
                    <h3 className="education-degree">{edu.degree}</h3>
                    {edu.major && <p className="education-major">{edu.major}</p>}
                    <p className="education-institution">{edu.institution}</p>
                    <p className="education-location">📍 {edu.location}</p>
                  </div>
                  <div className="edu-grade-ring">
                    <svg viewBox="0 0 80 80" className="grade-ring-svg">
                      <circle className="grade-ring-bg" cx="40" cy="40" r="32" />
                      <circle
                        className="grade-ring-fill"
                        cx="40" cy="40" r="32"
                        style={{
                          strokeDasharray: `${2 * Math.PI * 32}`,
                          strokeDashoffset: `${2 * Math.PI * 32 * (1 - edu.progress / 100)}`,
                          stroke: edu.color,
                        }}
                      />
                    </svg>
                    <div className="grade-ring-label">
                      <span className="grade-value">{edu.grade}</span>
                      <span className="grade-text">{edu.gradeLabel === 'CGPA' ? 'CGPA' : '%'}</span>
                    </div>
                  </div>
                </div>
                <div className="edu-bar-section">
                  <div className="edu-period">{edu.period}</div>
                  <div className="edu-progress-bar">
                    <div
                      className="edu-progress-fill"
                      style={{ width: `${edu.progress}%`, background: edu.color }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
