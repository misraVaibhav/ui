import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Github, Linkedin, Mail, Phone } from 'lucide-react';
import profileImage from './assets/vaibhav.jpg';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Handle scroll for parallax and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Find active section based on scroll position
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger load animation
    setTimeout(() => setIsLoaded(true), 100);
    
    // Custom cursor effect
    const handleMouseMove = (e) => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Hover effect for links and buttons
    const interactives = document.querySelectorAll('a, button');
    interactives.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
          cursor.style.width = '50px';
          cursor.style.height = '50px';
          cursor.style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
          cursor.style.width = '20px';
          cursor.style.height = '20px';
          cursor.style.backgroundColor = 'rgba(168, 85, 247, 0.5)';
        }
      });
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      interactives.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };
  
  // Project data
  const projects = [
    {
      id: 1,
      title: "Todo Symphony",
      description: "A beautifully animated task management application with fluid transitions and haptic feedback.",
      tags: ["React", "Framer Motion", "Firebase"]
    },
    {
      id: 2,
      title: "CineExplorer",
      description: "An immersive movie discovery platform using the TMDB API with dynamic content loading.",
      tags: ["React", "Redux", "API Integration"]
    },
    {
      id: 3,
      title: "Thought Canvas",
      description: "A personal blog platform with sophisticated typography and reading experience.",
      tags: ["React", "NextJS", "GraphQL"]
    }
  ];

  return (
    <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Background gradient */}
      <div className="background-gradient"></div>
      
      {/* Header with parallax effect */}
      <header className="header" style={{ backgroundColor: scrollY > 50 ? 'rgba(0,0,0,0.8)' : 'transparent', backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none' }}>
        <div className="container header-container">
          <h1 className="logo">DEV<span>FOLIO</span></h1>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {['about', 'projects', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-item ${activeSection === section ? 'active' : ''}`}
              >
                {section}
                {activeSection === section && (
                  <span className="nav-indicator"></span>
                )}
              </button>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="mobile-menu-button">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-items">
            {['about', 'projects', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`mobile-nav-item ${activeSection === section ? 'active' : ''}`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="hero" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="container hero-content">
        <div className="profile-photo-container animate-fadeInUp">
          <img src={profileImage} alt="Vaibhav Misra" className="profile-photo" />
        </div>
          <h1 className="hero-title">
            <span className="animate-fadeInUp">Vaibhav Misra</span>
          </h1>
          <p className="hero-tagline animate-fadeInUp animation-delay-200">
            Software Development Engineer <span className="divider">|</span> Wells Fargo
          </p>
          <div className="animate-fadeInUp animation-delay-400">
            <button 
              onClick={() => scrollToSection('about')}
              className="cta-button"
            >
              <span className="cta-button-bg"></span>
              <span className="cta-button-text">
                Explore My Work <ArrowUpRight size={18} />
              </span>
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
      </div>
      
      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title">
              About Me
              <div className="title-underline"></div>
            </h2>
            <p className="section-text">
            I am a results-driven Software Engineer with nearly 3 years of experience at Wells Fargo in financial technology, specializing in Java development and distributed systems. 
            </p>
            <p className="section-text mb-12">
            I have demonstrated expertise in designing high-performance applications, real-time data processing with Apache Storm, and implementing robust CI/CD pipelines. 
            </p>
            <p className="section-text mb-12">
            I have a strong background in multithreaded programming and object-oriented design with a track record of optimizing system performance. 
            </p>
            <p className="section-text mb-12">
            I have proven ability to architect scalable solutions for complex financial systems while maintaining code quality and operational reliability. 
            </p>
            <p className="section-text mb-12">
            I am an NIT Durgapur graduate with competitive programming achievements and a passion for building efficient, fault-tolerant software systems.
            </p>
            
            <div className="skills-grid">
              {['Springboot', 'Django', 'React', 'Machine Learning'].map((skill) => (
                <div key={skill} className="skill-card">
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="decorative-circle circle-3"></div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <h2 className="section-title">
            Projects
            <div className="title-underline"></div>
          </h2>
          
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <button className="project-link">
                    View Project <ArrowUpRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="decorative-circle circle-4"></div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title">
              Contact
              <div className="title-underline"></div>
            </h2>
            
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-card-header">
                  <Mail size={20} className="contact-icon" />
                  <h3 className="contact-card-title">Email</h3>
                </div>
                <a href="mailto:your@email.com" className="contact-link">vaibhav.misra.vkp@gmail.com</a>
              </div>
              
              <div className="contact-card">
                <div className="contact-card-header">
                  <Phone size={20} className="contact-icon" />
                  <h3 className="contact-card-title">Phone</h3>
                </div>
                <a href="tel:+916395852134" className="contact-link">+91 639 585 2134</a>
              </div>
            </div>
            
            <div className="social-links">
              <a 
                href="https://github.com/misraVaibhav" 
                target="_blank" 
                rel="noreferrer"
                className="social-link"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/misraVaibhav" 
                target="_blank" 
                rel="noreferrer"
                className="social-link"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="decorative-circle circle-5"></div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">&copy; {new Date().getFullYear()} Vaibhav Misra. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Custom cursor effect for desktop */}
      <div className="custom-cursor"></div>
      
      {/* Scroll indicator */}
      <div className={`scroll-to-top ${scrollY > 300 ? 'visible' : ''}`}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-to-top-button"
        >
          <ArrowUpRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;