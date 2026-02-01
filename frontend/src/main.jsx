import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // <--- UNCOMMENT THIS LINE LOCALLY to load Tailwind styles
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, 
  Code2, Terminal, Moon, Sun, Menu, X, 
  Globe, Cpu, MapPin, Clock, ArrowUpRight,
  Briefcase, Send, Loader2, Star, GitFork, 
  Home, Folder, PlayCircle, Database, Server, 
  Cloud, Box, Layers, Layout, Maximize2
} from 'lucide-react';

// --- CONFIGURATION ---
const PROFILE_IMAGE_URL = "/static/profile.jpg"; 
// Placeholder video - replace with your own URL later
const FEATURED_VIDEO_URL = "https://res.cloudinary.com/dhajxlbko/video/upload/v1769945029/featured_jr6bvl.mp4";
// ---------------------

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isVisible, setIsVisible] = useState(false); // For smooth entry animation
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // For sticky header effect
  const [isVideoOpen, setIsVideoOpen] = useState(false); // Video Modal State
  const [time, setTime] = useState(new Date()); // Added back time state for desktop clock
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  // Trigger animation on mount
  useEffect(() => {
    setIsVisible(true);
    
    // Handle scroll for sticky header style
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Clock (Restored for Desktop view)
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiError(null);
        const [projectsRes, skillsRes, expRes] = await Promise.all([
          fetch('/api/projects/'),
          fetch('/api/skills/'),
          fetch('/api/experiences/')
        ]);

        if (!projectsRes.ok || !skillsRes.ok || !expRes.ok) throw new Error("API failed");

        setProjects(await projectsRes.json());
        setSkills(await skillsRes.json());
        setExperience(await expRes.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setApiError("Demo Mode Active");
        // Fallback Demo Data
        setProjects([
            { id: 1, title: 'Nexus E-Commerce', description: 'Headless commerce solution with high-performance React frontend.', tech: [{name: 'Next.js'}, {name: 'GraphQL'}, {name: 'AWS'}], repo_url: '#', live_url: '#' },
            { id: 2, title: 'Sentient AI', description: 'Natural Language Processing dashboard for sentiment analysis.', tech: [{name: 'Python'}, {name: 'FastAPI'}, {name: 'PyTorch'}], repo_url: '#', live_url: '#' },
            { id: 3, title: 'Crypto Watch', description: 'Real-time cryptocurrency tracker with websocket integration.', tech: [{name: 'Vue'}, {name: 'Firebase'}, {name: 'D3.js'}], repo_url: '#', live_url: '#' }
        ]);
        setSkills([
            { id: 1, name: 'Python', proficiency: 95 },
            { id: 2, name: 'JavaScript', proficiency: 90 },
            { id: 3, name: 'React', proficiency: 88 },
            { id: 4, name: 'Django', proficiency: 92 },
            { id: 5, name: 'AWS', proficiency: 75 },
            { id: 6, name: 'Docker', proficiency: 80 },
        ]);
        setExperience([
            { id: 1, title: 'Senior Developer', company: 'TechCorp', start_date: '2022', end_date: 'Present', description: 'Leading backend architecture.' },
            { id: 2, title: 'Full Stack Dev', company: 'StartupX', start_date: '2020', end_date: '2022', description: 'Built MVP from scratch.' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const response = await fetch('/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) { 
      el.scrollIntoView({ behavior: 'smooth' }); 
      setIsMenuOpen(false); 
    }
  };

  // Helper to map skill names to Lucide icons
  const getSkillIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('react') || lowerName.includes('js')) return <Code2 size={20} />;
    if (lowerName.includes('python') || lowerName.includes('django')) return <Terminal size={20} />;
    if (lowerName.includes('aws') || lowerName.includes('cloud')) return <Cloud size={20} />;
    if (lowerName.includes('docker') || lowerName.includes('container')) return <Box size={20} />;
    if (lowerName.includes('sql') || lowerName.includes('data')) return <Database size={20} />;
    if (lowerName.includes('html') || lowerName.includes('css')) return <Layout size={20} />;
    return <Layers size={20} />; // Default icon
  };

  // Desktop Header Link
  const HeaderLink = ({ id, label }) => (
    <button 
        onClick={() => scrollToSection(id)}
        className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
    >
        {label}
    </button>
  );

  // Mobile Menu Link
  const NavLink = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`text-base font-medium px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 w-full sm:w-auto ${
        isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
      }`}
    >
      {Icon && <Icon size={18} />}
      {label}
    </button>
  );

  // Reusable Bento Card Component
  // Modified to remove hover scale/translation animations
  const BentoCard = ({ children, className = "", title, delay = 0, onClick }) => (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-indigo-500/30 hover:bg-white/[0.08] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform, background-color, border-color' // Exclude generic 'all' to prevent movement
      }}
    >
      {title && <div className="absolute top-4 left-6 text-xs font-bold uppercase tracking-wider text-gray-400 z-10">{title}</div>}
      <div className="h-full w-full p-5 sm:p-6">{children}</div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full max-w-[100vw] overflow-x-hidden font-sans selection:bg-indigo-500 selection:text-white bg-[#030712] text-gray-100`}>
      
      {/* Custom Styles */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          /* Removed pulse-glow keyframes as requested */
        `}
      </style>

      {/* Dynamic Background */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
          {/* Removed animate-pulse from background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      {/* VIDEO MODAL POPUP */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-[fadeInUp_0.3s_ease-out]">
            <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"
            >
                <X size={32} />
            </button>
            <div className="w-full max-w-5xl aspect-video relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <video 
                    src={FEATURED_VIDEO_URL} 
                    className="w-full h-full object-cover"
                    controls 
                    autoPlay
                />
            </div>
        </div>
      )}

      {/* STICKY HEADER */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-600/20">T</div>
                <div className="hidden sm:block">
                    <h1 className="text-lg font-bold leading-none tracking-tight">Tushar.dev</h1>
                </div>
            </div>

            {/* Desktop Navigation Links - Fixed IDs */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-xl border border-white/5 backdrop-blur-md">
                <HeaderLink id="home" label="Home" />
                <HeaderLink id="projects" label="Work" />
                <HeaderLink id="stats" label="Stats" /> {/* Maps to Tech/Exp section */}
                <HeaderLink id="contact" label="Contact" />
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Status Indicator */}
              <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-300">Open to Work</span>
              </div>

              {/* Mobile Menu Toggle (Sticky) */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors md:hidden"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030712]/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center animate-[fadeInUp_0.3s_ease-out]">
          <div className="w-full max-w-xs space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
            <div className="text-center mb-6 text-gray-400 text-xs uppercase tracking-widest font-semibold">Menu</div>
            <NavLink id="home" label="Home" icon={Home} />
            <NavLink id="projects" label="Projects" icon={Folder} />
            <NavLink id="stats" label="About / Stats" icon={Cpu} />
            <NavLink id="contact" label="Contact" icon={Mail} />
          </div>
        </div>
      )}

      <main className="max-w-[1400px] mx-auto p-4 sm:p-6 md:p-8 pt-24 sm:pt-32">
        
        {/* BENTO GRID HERO */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:h-[750px] mb-20" id="home">
            
            {/* 1. Main Intro (Large) - increased vertical space on mobile */}
            <BentoCard className="min-h-[400px] md:min-h-0 order-1 md:order-none md:col-span-2 md:row-span-2 flex flex-col justify-between group" delay={100}>
                <div className="mt-4 sm:mt-8">
                    <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-tight">
                        Building the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Digital Future.</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
                        I craft high-performance web experiences that blend aesthetic perfection with robust engineering.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                    <a href="#contact" className="px-5 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm sm:text-base">
                        Start a Project <ArrowUpRight size={18} />
                    </a>
                    <a href="#projects" className="px-5 py-2.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-sm sm:text-base">
                        View Work
                    </a>
                </div>
            </BentoCard>

            {/* 2. Profile Image (Refined: Completely Static) */}
            <BentoCard className="min-h-[400px] md:min-h-0 order-2 md:order-none md:col-span-1 md:row-span-2 p-0 relative group" delay={200}>
                <img 
                    src={PROFILE_IMAGE_URL} 
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Tushar+Dev&background=random&size=512"; }}
                    alt="Profile" 
                    className="absolute inset-0 w-full h-full object-cover" // Fixed: Removed all transition classes
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="font-bold text-xl text-white">Tushar Sune</span>
                    <span className="text-sm text-gray-300">Creator & Developer</span>
                </div>
            </BentoCard>

            {/* 3. Tech Stack - REFINED */}
            <BentoCard className="min-h-[180px] md:min-h-0 order-3 md:order-none md:col-span-1 md:row-span-1 flex flex-col justify-center" title="Core Stack" delay={300}>
                <div className="flex flex-wrap content-center gap-2 h-full pt-4">
                    {['React', 'Django', 'Python', 'AWS', 'Next.js', 'PostgreSQL', 'Docker'].map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium border border-white/5 text-gray-300 hover:bg-white/20 transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </BentoCard>

            {/* 4. VIDEO WIDGET (Refined: Static Overlay) */}
            <BentoCard 
                onClick={() => setIsVideoOpen(true)}
                className="min-h-[250px] md:min-h-0 cursor-pointer order-6 md:order-none md:col-span-1 md:row-span-1 p-0 relative group" 
                delay={400}
            >
                <div className="absolute inset-0 w-full h-full bg-black/50">
                    <video 
                        className="w-full h-full object-cover opacity-60" // Fixed: Static opacity
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        src={FEATURED_VIDEO_URL}
                    />
                    
                    {/* Centered Play Button - Static */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                            <PlayCircle size={24} className="text-white fill-white/20" /> {/* Removed animate-pulse */}
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <div className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                            <span>Watch Reel</span>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 5. Experience / Stats */}
            <BentoCard className="min-h-[150px] md:min-h-0 order-4 md:order-none md:col-span-1 md:row-span-1" title="Experience" delay={500}>
                <div className="flex justify-between items-end h-full pb-1">
                    <div>
                        <span className="text-4xl sm:text-5xl font-bold text-white">3+</span>
                        <span className="text-gray-400 ml-2 text-sm">Years</span>
                    </div>
                    <div className="text-right">
                        <div className="text-xl sm:text-2xl font-bold text-white">15+</div>
                        <div className="text-[10px] sm:text-xs text-gray-400 uppercase">Projects</div>
                    </div>
                </div>
            </BentoCard>

            {/* 6. Social Links */}
            <BentoCard className="min-h-[120px] md:min-h-0 order-5 md:order-none md:col-span-2 md:row-span-1 flex items-center" delay={600}>
                <div className="flex gap-3 w-full h-full items-center">
                    <a href="#" className="flex-1 h-14 sm:h-16 bg-black/40 hover:bg-black/60 rounded-xl flex items-center justify-center text-xl transition-all border border-white/5 hover:border-white/20 group">
                        <Github className="text-gray-300 group-hover:text-white transition-colors" size={24} />
                    </a>
                    <a href="#" className="flex-1 h-14 sm:h-16 bg-[#0077b5]/10 hover:bg-[#0077b5]/30 rounded-xl flex items-center justify-center text-xl transition-all border border-white/5 hover:border-[#0077b5]/30 group">
                        <Linkedin className="text-[#0077b5]" size={24} />
                    </a>
                    <a href="#" className="flex-1 h-14 sm:h-16 bg-[#1da1f2]/10 hover:bg-[#1da1f2]/30 rounded-xl flex items-center justify-center text-xl transition-all border border-white/5 hover:border-[#1da1f2]/30 group">
                        <Twitter className="text-[#1da1f2]" size={24} />
                    </a>
                </div>
            </BentoCard>
        </div>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <Terminal size={24} />
                </div>
                <h3 className="text-2xl font-bold">Featured Projects</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-20 text-center text-gray-500 bg-white/5 rounded-3xl border border-white/5">
                        <Loader2 className="animate-spin mx-auto mb-2" />
                        Loading modules...
                    </div>
                ) : (
                    projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-indigo-900/20"
                            style={{ 
                                opacity: isVisible ? 1 : 0, 
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)', 
                                transitionDelay: `${(index * 100) + 700}ms`,
                                transitionDuration: '700ms'
                            }}
                        >
                            {/* Clickable Image Area - Links to Live Site */}
                            <a href={project.live_url || '#'} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden h-48 sm:h-56 cursor-pointer">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black group-hover:from-indigo-950/30 group-hover:to-black transition-colors">
                                        <Code2 size={48} className="text-gray-700 group-hover:text-indigo-500 transition-colors" />
                                    </div>
                                )}
                                
                                {/* Overlay Badge */}
                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    Visit Live <ExternalLink size={10} />
                                </div>
                            </a>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <a href={project.live_url || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                                        <h4 className="text-xl font-bold">{project.title}</h4>
                                    </a>
                                    
                                    {/* GitHub Link (Distinct Button) */}
                                    {project.repo_url && (
                                        <a 
                                            href={project.repo_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all"
                                            title="View Source Code"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                                
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech && project.tech.map((t, i) => (
                                        <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded border border-white/5 text-gray-400">
                                            {t.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>

        {/* INFO GRID (Skills & Exp) - Linked via "stats" id */}
        <div id="stats" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 scroll-mt-24">
            {/* Skills */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/[0.07] transition-colors">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Cpu size={20} className="text-indigo-400"/> Technical Arsenal</h3>
                <div className="grid grid-cols-1 gap-5">
                    {skills.map(skill => (
                        <div key={skill.id} className="group flex items-center gap-4">
                            <div className="p-2.5 bg-white/5 rounded-xl text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-300">
                                {getSkillIcon(skill.name)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1.5 text-sm">
                                    <span className="font-medium text-gray-200">{skill.name}</span>
                                    <span className="text-gray-500 font-mono text-xs">{skill.proficiency}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-0 transition-all duration-1000 group-hover:w-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{width: `${skill.proficiency}%`}}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/[0.07] transition-colors">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Briefcase size={20} className="text-pink-400"/> Career Timeline</h3>
                <div className="space-y-8 border-l border-white/10 pl-6 ml-2">
                    {experience.map(exp => (
                        <div key={exp.id} className="relative group">
                            <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-black border-2 border-indigo-500 group-hover:scale-125 transition-transform"></div>
                            <h4 className="text-lg font-bold group-hover:text-indigo-300 transition-colors">{exp.title}</h4>
                            <div className="text-indigo-400 text-sm mb-1">{exp.company}</div>
                            <div className="text-xs text-gray-500 mb-2 font-mono bg-white/5 inline-block px-2 py-0.5 rounded">{exp.start_date} — {exp.end_date || 'Present'}</div>
                            <p className="text-sm text-gray-400">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-12 scroll-mt-24">
            <div className="bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20 border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Collaborate?</h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">Send me a message and let's discuss how we can build something extraordinary together.</p>
                
                <form onSubmit={handleFormSubmit} className="max-w-md mx-auto space-y-4 text-left">
                    <div>
                        <input type="text" placeholder="Your Name" required 
                            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" />
                    </div>
                    <div>
                        <input type="email" placeholder="Your Email" required 
                            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" />
                    </div>
                    <div>
                        <textarea rows="4" placeholder="Your Message" required 
                            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"></textarea>
                    </div>
                    <button disabled={formStatus !== 'idle'} className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-all flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                        {formStatus === 'sending' ? <Loader2 className="animate-spin" /> : formStatus === 'success' ? "Message Sent!" : <>Send Message <Send size={18} /></>}
                    </button>
                </form>
            </div>
        </section>

      </main>

      <footer className="text-center py-8 text-gray-600 text-sm border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Tushar.dev. Built with Django & React.</p>
      </footer>
    </div>
  );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);