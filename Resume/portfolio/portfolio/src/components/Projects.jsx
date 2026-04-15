import './Projects.css';

function Projects() {
  const projects = [
    {
      title: 'TalentPath',
      subtitle: 'E-Learning Platform',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      github: 'https://github.com/vamsi-lpu18/TalentPath',
      live: 'https://talentpath.vercel.app/',
      color: '#4285f4',
      highlights: [
        'Built backend services managing 6,300+ DSA problems with secure access control and SSR.',
        'Designed real-time code execution system using WebSockets handling 1,000+ daily submissions.',
        'Optimized database queries and caching, reducing response time under heavy usage.',
      ],
      tech: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Supabase', 'WebSocket']
    },
    {
      title: 'Workboard',
      subtitle: 'Project Management SaaS Tool',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      github: 'https://github.com/vamsi-lpu18/work_board',
      live: 'https://workboard-dev.vercel.app',
      color: '#34a853',
      highlights: [
        'Engineered multi-tenant architecture with RBAC for 100+ active users.',
        'Structured modular microservices architecture improving system efficiency by 40%.',
        'Streamlined deployment with Docker and CI/CD, reducing release cycles by 60%.',
      ],
      tech: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker']
    },
    {
      title: 'RoadHealth AI',
      subtitle: 'Automated Pavement Assessment',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      github: 'https://github.com/vamsi-lpu18/RoadHealth-AI-Automated-Pavement-Condition-Assessment-from-Photographs',
      live: 'https://roadhealth-ai-automated-pavement-uyar.onrender.com/',
      color: '#fbbc04',
      highlights: [
        'Built intelligent computer vision app for pavement defect detection using deep learning.',
        'Constructed distributed task pipeline using Celery and Redis processing 150+ images/hour.',
        'Designed flexible API architectures for image upload, parsing, and storage.',
      ],
      tech: ['Django', 'Python', 'PostgreSQL', 'Celery', 'Redis', 'Docker', 'OpenCV']
    },
    {
      title: 'RideFlow',
      subtitle: 'Premium Ride-Hailing Platform',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      github: 'https://github.com/vamsi-lpu18/RideFlow',
      live: 'https://ride-flow-nu.vercel.app',
      color: '#a855f7',
      highlights: [
        'Built a ride-hailing platform with real-time maps and Stripe payment integration.',
        'Implemented OAuth authentication with dark-themed premium UI.',
        'Deployed with Supabase backend and Vercel for production-grade performance.',
      ],
      tech: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'OAuth', 'Mapbox']
    },
    {
      title: 'Cloud Storage',
      subtitle: 'Cloud-Based Media Storage Service',
      date: '2026',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
      github: 'https://github.com/vamsi-lpu18/cloud-storage',
      color: '#8b5cf6',
      highlights: [
        'Built a cloud storage service with JWT auth, file versioning, and encryption.',
        'Real-time notifications via WebSocket and AWS S3-compatible object storage.',
        'Supports batch operations, file sharing with expiry, and folder organization.',
      ],
      tech: ['Node.js', 'Express.js', 'MongoDB', 'AWS S3', 'React', 'Socket.io', 'JWT']
    },
    {
      title: 'GoFood',
      subtitle: 'Food Delivery Application',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      github: 'https://github.com/vamsi-lpu18/Food-app',
      color: '#ef4444',
      highlights: [
        'Full-stack MERN food delivery app with user auth and cart management.',
        'RESTful APIs for menu, orders, and user management with MongoDB backend.',
        'Responsive UI with search, filtering, and real-time order tracking.',
      ],
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'CSS3']
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="section-container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Building scalable solutions with modern technologies</p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{ '--project-color': project.color, animationDelay: `${index * 0.15}s` }}
            >
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                <div className="project-image-overlay">
                  <div className="project-overlay-buttons">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-view-btn">
                      <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                      </svg>
                      Source Code
                    </a>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-view-btn live-btn">
                        <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-info">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-date">{project.date}</span>
                </div>
                <p className="project-subtitle">{project.subtitle}</p>
                <div className="project-highlights">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-item">
                      <span className="highlight-bullet">▸</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
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

export default Projects;
