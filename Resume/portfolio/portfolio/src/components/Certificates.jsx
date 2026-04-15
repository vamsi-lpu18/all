import './Certificates.css';

function Certificates() {
  const certificates = [
    {
      title: 'REST API with NodeJS',
      platform: 'Udemy',
      date: "Sept' 25",
      icon: '🔗',
      color: '#a855f7',
      skills: ['Node.js', 'Express', 'REST', 'MongoDB'],
    },
    {
      title: 'Hands on ReactJS',
      platform: 'Udemy',
      date: "July' 25",
      icon: '⚛️',
      color: '#06b6d4',
      skills: ['React.js', 'Components', 'Hooks', 'State'],
    }
  ];

  return (
    <section id="certificates" className="certificates">
      <div className="section-container">
        <h2 className="section-title">Certificates</h2>
        <p className="section-subtitle">Continuous learning & growth</p>
        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <div key={index} className="certificate-card" style={{ '--cert-color': cert.color }}>
              <div className="cert-badge">
                <span className="cert-icon">{cert.icon}</span>
                <div className="cert-verified">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                  Verified
                </div>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-meta">
                <span className="cert-platform">{cert.platform}</span>
                <span className="cert-dot">•</span>
                <span className="cert-date">{cert.date}</span>
              </div>
              <div className="cert-skills">
                {cert.skills.map((skill, idx) => (
                  <span key={idx} className="cert-skill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;
