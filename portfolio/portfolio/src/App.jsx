import React, { useState } from 'react'
import './App.css'
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaPython, FaLinkedin, FaGithub, FaFilePdf, FaNodeJs } from 'react-icons/fa'
import { SiRedux, SiTailwindcss, SiCplusplus, SiLeetcode, SiGeeksforgeeks, SiCodechef, SiExpress, SiMongodb, SiMysql, SiJsonwebtokens, SiSocketdotio, SiTypescript } from 'react-icons/si'
import { motion } from 'framer-motion'

function App() {
  const [logoSrc, setLogoSrc] = useState('/assets/profile-avatar.png');
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden w-full max-w-screen box-border flex flex-col">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-800"
      >
        <div className="w-full px-2 sm:px-6 lg:px-8 max-w-screen box-border">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center gap-2"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                <img
                  src={logoSrc}
                  onError={() => setLogoSrc('https://ui-avatars.com/api/?name=Vamsi&background=0D8ABC&color=fff')}
                  alt="Logo"
                  className="w-8 h-8 rounded-full mr-2"
                />
                
              </span>
              {/* <span className="text-sm text-gray-400">Full Stack Web Developer</span> */}
            </motion.div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {['Home', 'About', 'Education', 'Projects', 'Skills', 'Achievements', 'CV'].map((item) => (
                  item === 'CV' ? (
                    <motion.a
                      key={item}
                      href="#cv"
                      whileHover={{ scale: 1.05 }}
                      className="no-underline hover:no-underline text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors duration-200 relative group"
                    >
                      <FaFilePdf className="inline text-blue-400" /> {item}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </motion.a>
                  ) : (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase().replace(' ', '')}`}
                      whileHover={{ scale: 1.05 }} 
                      className="no-underline hover:no-underline text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors duration-200 relative group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </motion.a>
                  )
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/vamsi-kotamsetti-47b302260/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                title="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/vamsi-lpu18"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                title="GitHub"
              >
                <FaGithub className="text-xl" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://codolio.com/profile/vamsi@lpunow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                title="Codolio"
              >
                <SiCplusplus className="text-xl" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.codechef.com/users/odd_book_13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                title="CodeChef"
              >
                <SiCodechef className="text-xl" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="pt-20 w-full max-w-screen overflow-x-hidden box-border">
                {/* CV Section */}
                <motion.section
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  id="cv"
                  className="py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-blue-900 w-full max-w-screen overflow-x-hidden box-border relative"
                >
                  <div className="flex justify-center items-center min-h-[40vh]">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-lg w-full border-2 border-blue-500/30 animate-fade-in"
                    >
                      <img
                        src={logoSrc}
                        alt="Profile Avatar"
                        className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4 shadow-lg"
                      />
                      <h2 className="text-2xl font-bold text-white mb-2">Vamsi Kotamsetti</h2>
                      <h3 className="text-lg font-semibold text-blue-400 mb-4">Full Stack Web Developer</h3>
                      <p className="text-gray-300 text-center mb-6">
                        Experienced in React, Tailwind CSS, TypeScript, Redux, Express, Node.js, MongoDB, MySQL, JavaScript, JWT, NoSQL, and Sockets. Passionate about building scalable, modern web applications and delivering seamless user experiences.
                      </p>
                      <motion.a
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://drive.google.com/file/d/1Jdk1iP3lgHzfcmcaITgePfI5Kf6lLYS0/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md font-semibold shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2 animate-glow"
                      >
                        <FaFilePdf className="text-xl" /> Download CV
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.section>
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          id="home" 
          className="min-h-[calc(100vh-4rem)] flex items-center justify-center w-full px-4 bg-gradient-to-br from-blue-900 via-gray-950 to-gray-900 relative overflow-hidden"
        >
          <div className="text-center w-full max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4 animate-bounce-in"
            >
              Welcome <span className="text-blue-500">Vamsi</span>
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl font-bold mb-6 animate-bounce-in"
            >
              Full Stack Web Developer
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 w-full max-w-2xl mx-auto mb-8"
            >
              Specializing in React, Tailwind CSS, TypeScript, Redux, Express, Node.js, MongoDB, MySQL, JavaScript, JWT, NoSQL, and Sockets. Building robust, scalable, and modern web applications from front to back.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#coding" 
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors no-underline hover:no-underline animate-glow pointer"
              >
                View Coding Profiles
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors no-underline hover:no-underline pointer"
              >
                View Projects
              </motion.a>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center gap-6"
            >
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/vamsi-kotamsetti-47b302260/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-blue-500 hover:text-blue-400 pointer"
                title="LinkedIn"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/vamsi-lpu18"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-gray-300 hover:text-white pointer"
                title="GitHub"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://codolio.com/profile/vamsi@lpunow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-yellow-500 hover:text-yellow-400 pointer"
                title="Codolio"
              >
                <SiLeetcode />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.geeksforgeeks.org/user/vamsi1l1kq/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-green-500 hover:text-green-400 pointer"
                title="GeeksforGeeks"
              >
                <SiGeeksforgeeks />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://codolio.com/profile/vamsi@lpunow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-blue-500 hover:text-blue-400 pointer"
                title="Codolio"
              >
                <SiCplusplus />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.codechef.com/users/odd_book_13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-orange-500 hover:text-orange-400 pointer"
                title="CodeChef"
              >
                <SiCodechef />
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="coding" 
          className="py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-blue-900 w-full max-w-screen overflow-x-hidden box-border relative"
        >
          <div className="w-full px-2 sm:px-6 lg:px-8 max-w-screen box-border">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center animate-bounce-in"
            >
              Coding Profiles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[{
                              title: "TalentPath",
                              image: "https://raw.githubusercontent.com/vamsi-lpu18/TalentPath/main/public/logo.png",
                              description: "Comprehensive learning platform managing 6,300+ DSA problems, secure access controls, server-side rendering, and real-time evaluation engine for coding contests.",
                              tech: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma ORM", "Supabase", "WebSocket"],
                              demo: "https://talentpath.vercel.app/",
                              github: "https://github.com/vamsi-lpu18/TalentPath"
                            }, {
                              title: "Workboard",
                              image: "https://raw.githubusercontent.com/vamsi-lpu18/work_board/main/public/logo.png",
                              description: "Multi-tenant project management SaaS tool with secure endpoints, robust authorization, modular backend, and machine learning features.",
                              tech: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma ORM", "Supabase", "Redis", "Docker"],
                              demo: "https://workboard-dev.vercel.app",
                              github: "https://github.com/vamsi-lpu18/work_board"
                            }, {
                              title: "RoadHealth AI",
                              image: "https://raw.githubusercontent.com/vamsi-lpu18/RoadHealth-AI-Automated-Pavement-Condition-Assessment-from-Photographs/main/public/logo.png",
                              description: "Automated pavement condition assessment using computer vision, deep learning, and high-throughput message processing queues.",
                              tech: ["Django", "Python", "PostgreSQL", "Celery", "Redis", "Docker", "OpenCV"],
                              demo: "https://roadhealth-ai-automated-pavement-uyar.onrender.com/",
                              github: "https://github.com/vamsi-lpu18/RoadHealth-AI-Automated-Pavement-Condition-Assessment-from-Photographs"
                            }, {
                              title: "Book Store Application",
                              image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
                              description: "A modern, responsive web application for browsing, searching, and managing books and courses. Features user authentication, search, filtering, and a beautiful UI. Built for ICME Private Limited (Demo Project).",
                              tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "DaisyUI"],
                              demo: "https://book-store-application-5-v39i.onrender.com",
                              github: "https://github.com/vamsi-lpu18/Book-Store-Application"
                            }, {
                              title: "Movie Browser & Watchlist",
                              image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
                              description: "A sophisticated React application for browsing movies, managing a watchlist, and enjoying a seamless, responsive interface. Features dynamic content loading from the OMDb API, advanced filtering, and a modern UI.",
                              tech: ["React", "Vite", "Tailwind CSS", "OMDb API"],
                              demo: "https://barshaimdb.netlify.app",
                              github: null
                            }, {
                              title: "GoFood - Food Delivery App",
                              image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                              description: "A modern, full-stack food delivery web application featuring user authentication, real-time cart management, order processing, and a responsive design. Built with React frontend and Node.js backend with MongoDB.",
                              tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Bootstrap"],
                              demo: "https://food-app-front-end.onrender.com/",
                              github: "https://github.com/vamsi-lpu18/Food-app"
                            }].map((project, idx) => (
                              <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-800 rounded-lg overflow-hidden pointer animate-fade-in project-card flex flex-col shadow-2xl border-2 border-blue-500/30"
                              >
                                <div className="h-48 w-full max-w-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                                  <img src={project.image} alt={project.title + ' Logo'} className="object-contain w-32 h-32 animate-glow" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                  <p className="text-gray-400 mb-4">{project.description}</p>
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((tech, i) => (
                                      <span key={i} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">{tech}</span>
                                    ))}
                                  </div>
                                  <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full px-4 py-2 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-colors no-underline hover:no-underline"
                                  >
                                    View Project
                                  </a>
                                  {project.github && (
                                    <a
                                      href={project.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block w-full px-4 py-2 bg-gray-700 text-white text-center rounded-md hover:bg-gray-800 transition-colors no-underline hover:no-underline mt-2"
                                    >
                                      Source Code
                                    </a>
                                  )}
                                </div>
                              </motion.div>
                            ))}
              {/* LeetCode Profile */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg p-6 pointer animate-bounce-in"
              >
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">vamsi_19</h3>
                    <p className="text-gray-400">LeetCode Problem Solver</p>
                  </div>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://leetcode.com/u/vamsi_19/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-0 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors no-underline hover:no-underline animate-glow pointer"
                  >
                    Visit Profile
                  </motion.a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Problems Solved</h4>
                    <p className="text-3xl font-bold text-blue-500">850+</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Contest Rating</h4>
                    <p className="text-3xl font-bold text-blue-500">1850+</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* GeeksforGeeks Profile */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg p-6 pointer animate-bounce-in"
              >
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">vamsi1l1kq</h3>
                    <p className="text-gray-400">GeeksforGeeks Problem Solver</p>
                  </div>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.geeksforgeeks.org/user/vamsi1l1kq/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-0 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors no-underline hover:no-underline animate-glow pointer"
                  >
                    Visit Profile
                  </motion.a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Problems Solved</h4>
                    <p className="text-3xl font-bold text-green-500">450+</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Coding Score</h4>
                    <p className="text-3xl font-bold text-green-500">1450+</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Contest Rating</h4>
                    <p className="text-3xl font-bold text-green-500">1850+</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Institute Rank</h4>
                    <p className="text-3xl font-bold text-green-500">250</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* CodeChef Profile */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg p-6 pointer animate-bounce-in"
              >
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">odd_book_13</h3>
                    <p className="text-gray-400">CodeChef Problem Solver</p>
                  </div>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.codechef.com/users/odd_book_13" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-0 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors no-underline hover:no-underline animate-glow pointer"
                  >
                    Visit Profile
                  </motion.a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Rating</h4>
                    <p className="text-3xl font-bold text-orange-500">1082 (1★)</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Contests</h4>
                    <p className="text-3xl font-bold text-orange-500">11</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Global Rank</h4>
                    <p className="text-3xl font-bold text-orange-500">6700</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2">Problems Solved</h4>
                    <p className="text-3xl font-bold text-orange-500">29</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="about" 
          className="py-16 w-full bg-gradient-to-br from-gray-900 via-gray-950 to-blue-900 relative overflow-hidden"
        >
          <div className="w-full px-2 sm:px-6 lg:px-8 max-w-screen box-border">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center animate-bounce-in"
            >
              About Me
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-400 mb-4">
                  Full Stack Web Developer with expertise in both front-end and back-end technologies. Experienced in building scalable, high-performance web applications using React, Tailwind CSS, TypeScript, Redux, Express, Node.js, MongoDB, MySQL, JavaScript, JWT, NoSQL databases, and real-time communication with Sockets.
                </p>
                <p className="text-gray-400 mb-4">
                  Adept at designing and implementing robust solutions, integrating modern UI/UX practices, and ensuring seamless user experiences across the stack.
                </p>
                <p className="text-gray-400">
                  Passionate about continuous learning, open-source contributions, and solving complex problems with clean, maintainable code.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden shadow-2xl border-4 border-blue-500/40 ring-8 ring-blue-400/20 animate-pulse text-7xl md:text-9xl relative animate-float">
                  <span role="img" aria-label="avatar">🧑‍💻</span>
                </div>
              </div>
            </div>
          </div>
          {/* SVG Wave Divider */}
          <svg className="absolute left-0 bottom-0 w-full h-16" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#about-wave)" fillOpacity="1" d="M0,224L48,202.7C96,181,192,139,288,128C384,117,480,139,576,170.7C672,203,768,245,864,240C960,235,1056,181,1152,154.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          <defs>
            <linearGradient id="about-wave" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="projects" 
          className="py-16 bg-gradient-to-br from-blue-900 via-gray-950 to-gray-900 w-full max-w-screen overflow-x-hidden box-border relative animate-fade-in"
        >
          <div className="w-full px-2 sm:px-6 lg:px-8 max-w-screen box-border">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center animate-bounce-in"
            >
              Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Consistent Project Card Design */}
              {[{
                title: "TalentPath",
                image: "https://raw.githubusercontent.com/vamsi-lpu18/TalentPath/main/public/logo.png",
                description: "Comprehensive learning platform managing 6,300+ DSA problems, secure access controls, server-side rendering, and real-time evaluation engine for coding contests.",
                tech: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma ORM", "Supabase", "WebSocket"],
                demo: "https://talentpath.vercel.app/",
                github: "https://github.com/vamsi-lpu18/TalentPath"
              }, {
                title: "Workboard",
                image: "https://raw.githubusercontent.com/vamsi-lpu18/work_board/main/public/logo.png",
                description: "Multi-tenant project management SaaS tool with secure endpoints, robust authorization, modular backend, and machine learning features.",
                tech: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma ORM", "Supabase", "Redis", "Docker"],
                demo: "https://workboard-dev.vercel.app",
                github: "https://github.com/vamsi-lpu18/work_board"
              }, {
                title: "RoadHealth AI",
                image: "https://raw.githubusercontent.com/vamsi-lpu18/RoadHealth-AI-Automated-Pavement-Condition-Assessment-from-Photographs/main/public/logo.png",
                description: "Automated pavement condition assessment using computer vision, deep learning, and high-throughput message processing queues.",
                tech: ["Django", "Python", "PostgreSQL", "Celery", "Redis", "Docker", "OpenCV"],
                demo: "https://roadhealth-ai-automated-pavement-uyar.onrender.com/",
                github: "https://github.com/vamsi-lpu18/RoadHealth-AI-Automated-Pavement-Condition-Assessment-from-Photographs"
              }].map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg overflow-hidden pointer animate-fade-in project-card flex flex-col shadow-2xl border-2 border-blue-500/30"
                >
                  <div className="h-48 w-full max-w-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                    <img src={project.image} alt={project.title + ' Logo'} className="object-contain w-32 h-32 animate-glow" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">{tech}</span>
                      ))}
                    </div>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-colors no-underline hover:no-underline"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-gray-700 text-white text-center rounded-md hover:bg-gray-800 transition-colors no-underline hover:no-underline mt-2"
                    >
                      GitHub Repository
                    </a>
                  </div>
                </motion.div>
              ))}

              {/* Book Store Application */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg overflow-hidden pointer animate-bounce-in"
              >
                <div className="h-48 w-full max-w-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80" alt="Book Store Application" className="object-cover w-full h-full max-w-full animate-glow" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Book Store Application</h3>
                  <p className="text-gray-400 mb-4">A modern, responsive web application for browsing, searching, and managing books and courses. Features user authentication, search, filtering, and a beautiful UI. Built for ICME Private Limited (Demo Project).</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Node.js</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Express</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">MongoDB</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Tailwind CSS</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">DaisyUI</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a 
                      href="https://book-store-application-5-v39i.onrender.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-colors no-underline hover:no-underline"
                    >
                      View Project
                    </a>
                    <a 
                      href="https://github.com/vamsi-lpu18/Book-Store-Application" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-gray-700 text-white text-center rounded-md hover:bg-gray-800 transition-colors no-underline hover:no-underline"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Movie Browser & Watchlist */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg overflow-hidden pointer animate-bounce-in"
              >
                <div className="h-48 w-full max-w-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="Movie Browser & Watchlist" className="object-cover w-full h-full max-w-full animate-glow" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Movie Browser & Watchlist</h3>
                  <p className="text-gray-400 mb-4">A sophisticated React application for browsing movies, managing a watchlist, and enjoying a seamless, responsive interface. Features dynamic content loading from the OMDb API, advanced filtering, and a modern UI.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Vite</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Tailwind CSS</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">OMDb API</span>
                  </div>
                  <a 
                    href="https://barshaimdb.netlify.app" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-colors no-underline hover:no-underline"
                  >
                    View Project
                  </a>
                </div>
              </motion.div>

              {/* GoFood - Food Delivery Application */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg overflow-hidden pointer animate-bounce-in"
              >
                <div className="h-48 w-full max-w-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="GoFood - Food Delivery Application" className="object-cover w-full h-full max-w-full animate-glow" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">GoFood - Food Delivery App</h3>
                  <p className="text-gray-400 mb-4">A modern, full-stack food delivery web application featuring user authentication, real-time cart management, order processing, and a responsive design. Built with React frontend and Node.js backend with MongoDB.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Node.js</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Express</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">MongoDB</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">JWT</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Bootstrap</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a 
                      href="https://food-app-front-end.onrender.com/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-colors no-underline hover:no-underline"
                    >
                      View Project
                    </a>
                    <a 
                      href="https://github.com/vamsi-lpu18/Food-app" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-gray-700 text-white text-center rounded-md hover:bg-gray-800 transition-colors no-underline hover:no-underline"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="skills"
          className="py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-blue-900 w-full max-w-screen overflow-x-hidden box-border relative animate-fade-in"
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 max-w-screen box-border">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center animate-bounce-in"
            >
              Skills
            </motion.h2>
            <div className="flex flex-wrap gap-6 justify-center mt-8">
              {/* Updated Skills Section */}
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-blue-500">
                <FaReact className="text-6xl text-blue-400 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">React.js</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-orange-500">
                <FaHtml5 className="text-6xl text-orange-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">HTML5</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-blue-400">
                <FaCss3Alt className="text-6xl text-blue-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">CSS3</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-yellow-400">
                <FaJs className="text-6xl text-yellow-400 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">JavaScript</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-yellow-500">
                <FaPython className="text-6xl text-yellow-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Python</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-purple-500">
                <SiRedux className="text-6xl text-purple-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Redux</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-cyan-400">
                <SiTailwindcss className="text-6xl text-cyan-400 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-blue-700">
                <SiCplusplus className="text-6xl text-blue-700 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">C++</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-green-500">
                <FaNodeJs className="text-6xl text-green-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Node.js</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-gray-300">
                <SiExpress className="text-6xl text-gray-300 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Express.js</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-green-700">
                <SiMongodb className="text-6xl text-green-700 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">MongoDB</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-blue-500">
                <SiMysql className="text-6xl text-blue-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">MySQL</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-yellow-500">
                <SiJsonwebtokens className="text-6xl text-yellow-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">JWT</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-black">
                <SiSocketdotio className="text-6xl text-black mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Socket.IO</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-blue-600">
                <SiTypescript className="text-6xl text-blue-600 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">TypeScript</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-blue-500">
                <SiMongodb className="text-6xl text-blue-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">PostgreSQL</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-green-700">
                <SiMongodb className="text-6xl text-green-700 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Supabase</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-gray-300">
                <SiExpress className="text-6xl text-gray-300 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Prisma ORM</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-green-500">
                <FaNodeJs className="text-6xl text-green-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Docker</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-blue-500">
                <SiMysql className="text-6xl text-blue-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">Celery</span>
              </div>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-xl p-8 w-32 transition-transform duration-200 hover:scale-110 hover:shadow-2xl border-2 border-transparent hover:border-yellow-500">
                <SiJsonwebtokens className="text-6xl text-yellow-500 mb-4 drop-shadow-lg animate-float pointer" />
                <span className="text-lg font-semibold tracking-wide">OpenCV</span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="contact" 
          className="py-16 w-full"
        >
          <div className="w-full px-2 sm:px-6 lg:px-8 max-w-screen box-border">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center animate-bounce-in"
            >
              Contact Me
            </motion.h2>
            <div className="max-w-2xl mx-auto w-full">
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></motion.textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Send Message
                </motion.button>
              </motion.form>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 flex justify-center gap-6"
              >
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/vamsi-kotamsetti-47b302260/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-blue-500 hover:text-blue-400"
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/vamsi-lpu18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-300 hover:text-white"
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://codolio.com/profile/vamsi@lpunow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-yellow-500 hover:text-yellow-400"
                >
                  <SiLeetcode />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.geeksforgeeks.org/user/vamsi1l1kq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-green-500 hover:text-green-400"
                >
                  <SiGeeksforgeeks />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-8 text-center text-gray-400 w-full"
      >
        <p>© {new Date().getFullYear()} Vamsi. All rights reserved.</p>
      </motion.footer>
    </div>
  )
}

export default App
