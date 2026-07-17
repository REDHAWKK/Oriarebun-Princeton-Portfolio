import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ContactForm from './components/ContactForm'
import Navbar from './components/Navbar'

const getCurrentYear = () => new Date().getFullYear();

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'certifications', label: 'Certs' },
  { id: 'testimonials', label: 'Praise' },
  { id: 'contact', label: 'Contact' },
];

const skills = [
  { name: 'React.js', level: '95%' },
  { name: 'JavaScript', level: '95%' },
  { name: 'TypeScript', level: '88%' },
  { name: 'Tailwind CSS', level: '99%' },
  { name: 'HTML5 & CSS3', level: '99%' },
  { name: 'Firebase', level: '85%' },
];

const projects = [
  { title: 'OsatofoGCS', category: 'Primary Schoool Website', img: '/osatofo.png', tags: ['Html5', 'TailwindCss', 'Javascript'] },
  { title: 'LandLink Solutions', category: 'Real Estate Website', img: '/landlink.png', tags: ['Html5', 'TailwindCss', 'Javascript'] },
  { title: 'Giant Stride School', category: 'School Website', img: '/Gss.png', tags: ['Html5', 'TailwindCss', 'Javascript'] },
  { title: 'Xalesflow', category: 'Documentation Website', img: '/xalesflow.png', tags: ['Html5', 'TailwindCss', 'Javascript', 'Firebase'] },
  { title: 'Prema Bakery', category: 'Online Bakery Website', img: '/prema.png', tags: ['ReactJs', 'TailwindCss', 'Firebase'] },
];

const certifications = [
  { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
  { title: 'Meta Front-End Developer', issuer: 'Meta', year: '2023' },
  { title: 'Google UX Design Certificate', issuer: 'Google', year: '2023' },
  { title: 'Firebase Official Partner', issuer: 'Google Firebase', year: '2024' },
];

const testimonials = [
  { quote: 'Princeton has an exceptional eye for detail. He transformed our legacy dashboard into a modern, intuitive experience that our users love.', author: 'Sarah Chen', role: 'Product Lead, Vercel' },
  { quote: 'The attention to animation and micro-interactions sets his work apart. Every pixel feels intentional.', author: 'David Okafor', role: 'CTO, Nova Logistics' },
  { quote: 'Reliable, creative, and technically brilliant. He delivered our design system ahead of schedule with documentation that empowered our entire team.', author: 'Victoria Mercer', role: 'Design Director, Aether' },
];

export default function OriarebunPortfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [animatedSkillLevels, setAnimatedSkillLevels] = useState(() => skills.map(() => 0));
  const [hasAnimatedSkills, setHasAnimatedSkills] = useState(false);
  const [displayedFirstName, setDisplayedFirstName] = useState('');
  const [displayedLastName, setDisplayedLastName] = useState('');

  const projectsRef = useRef(null);

  // Scroll spy + parallax + progress
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      const sections = ["hero", "skills", "projects", "certifications", "testimonials", "contact"];
      const pos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= pos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timeoutId;
    let firstIndex = 0;
    let secondIndex = 0;

    const typeFirstName = () => {
      if (firstIndex < 9) {
        setDisplayedFirstName('Oriarebun'.slice(0, firstIndex + 1));
        firstIndex += 1;
        timeoutId = setTimeout(typeFirstName, 90);
        return;
      }

      const typeLastName = () => {
        if (secondIndex < 9) {
          setDisplayedLastName('Princeton'.slice(0, secondIndex + 1));
          secondIndex += 1;
          timeoutId = setTimeout(typeLastName, 90);
          return;
        }
      };

      timeoutId = setTimeout(typeLastName, 220);
    };

    timeoutId = setTimeout(typeFirstName, 220);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const section = document.getElementById('skills');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedSkills) {
          setHasAnimatedSkills(true);

          const targets = skills.map((skill) => Number(skill.level.replace('%', '')));
          targets.forEach((target, index) => {
            const startTime = performance.now();
            const duration = 1400 + index * 180;

            const tick = (now) => {
              const progress = Math.min(1, (now - startTime) / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              const value = Math.round(target * eased);

              setAnimatedSkillLevels((prev) => {
                const next = [...prev];
                next[index] = value;
                return next;
              });

              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };

            requestAnimationFrame(tick);
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasAnimatedSkills]);

  // Project drag scroll
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.pageX - projectsRef.current.offsetLeft);
    setScrollLeft(projectsRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - projectsRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    projectsRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => setDragging(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const scrollToSection = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black font-sans overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        .reveal {
          opacity: 0;
          transform: translateY(70px);
          transition: opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1), transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 20px); }
        }
        @keyframes pulse-gold {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 18s ease-in-out infinite; }
        .animate-float-delayed { animation: float 14s ease-in-out infinite reverse; }
        .animate-pulse-gold { animation: pulse-gold 6s ease-in-out infinite; }
      `}</style>

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-0.5 bg-[#D4AF37] z-[60]" style={{ width: `${Math.min(100, scrollProgress)}%` }}></div>

      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/10 blur-[140px] animate-float"></div>
        <div className="absolute top-1/2 -right-40 w-[700px] h-[700px] rounded-full bg-amber-700/10 blur-[140px] animate-float-slow"></div>
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px] animate-float-delayed"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.03)_1px,_transparent_1px)] [background-size:32px_32px] opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      </div>

      <Navbar
        activeSection={activeSection}
        navItems={navItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollToSection={scrollToSection}
      />

      <main className="relative z-10">
        {/* HERO */}
 <section id="hero" className="relative min-h-screen flex items-center pt-24 md:pt-0">
          <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 reveal" style={{ transitionDelay: '120ms' }}>
              <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6 animate-pulse-gold">Portfolio {getCurrentYear()}</p>
              <h1 className="mb-8 text-5xl font-serif leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">
                <span className="block">
                  {displayedFirstName}
                  {displayedFirstName.length < 9 && (
                    <span className="ml-1 inline-block h-8 w-[0.5rem] animate-pulse bg-[#D4AF37] align-middle md:h-12" />
                  )}
                </span>
                <span className="mt-2 block text-[#D4AF37]">
                  {displayedLastName}
                  {displayedLastName.length < 9 && displayedFirstName.length === 9 && (
                    <span className="ml-1 inline-block h-8 w-[0.5rem] animate-pulse bg-[#D4AF37] align-middle md:h-12" />
                  )}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg mb-10 font-light">
                Frontend Developer & UI Engineer crafting immersive digital experiences with precision, performance, and poetry.
              </p>
              <div className="flex  gap-4 mb-4">
                <button onClick={() => scrollToSection("projects")} className="group relative px-4 py-3.5 bg-[#D4AF37] text-black text-xs tracking-[0.2em] uppercase font-semibold overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <span className="relative z-10">View Work</span>
                </button>
                <button onClick={() => scrollToSection("contact")} className="px-8 py-3.5 border border-white/20 text-xs tracking-[0.2em] uppercase hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 backdrop-blur-md">
                  Contact Me
 </button>
              </div>
            </div>

            <div className="order-1 md:order-2 reveal flex justify-center md:justify-end" style={{ transitionDelay: '220ms' }}>
              <div className="relative w-72 h-72 md:w-[28rem] md:h-[28rem]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/20 to-transparent blur-2xl animate-pulse-gold"></div>
                <div className="absolute inset-4 rounded-full border border-[#D4AF37]/20 backdrop-blur-3xl bg-white/[0.02] flex items-center justify-center overflow-hidden">
                  <img
                    src="/image.png"
                    alt="Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-[#D4AF37]/30 rounded-tr-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[#D4AF37]/30 rounded-bl-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-32 bg-gradient-to-b from-black to-gray-950/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 reveal">
              <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">Expertise</p>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Technical Mastery</h2>
              <div className="w-16 h-px bg-[#D4AF37] mt-6"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {skills.map((skill, i) => {
                const target = Number(skill.level.replace('%', ''));
                const currentValue = animatedSkillLevels[i] ?? 0;

                return (
                  <div key={i} className="group p-8 md:p-10 bg-black hover:bg-white/[0.02] transition-all duration-500 reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                    <h3 className="text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors duration-300 mb-4">{skill.name}</h3>
                    <div className="w-full h-px bg-white/10 mb-4 relative overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-[#D4AF37] transition-all duration-700 group-hover:w-[95%]" style={{ width: `${hasAnimatedSkills ? (currentValue / target) * 100 : 0}%` }}>
                        <div className="absolute right-0 top-0 h-full w-4 bg-[#D4AF37] blur-sm"></div>
                      </div>
                    </div>
                    <p className="text-white/40 text-sm font-mono tracking-wider">{hasAnimatedSkills ? `${currentValue}%` : '0%'}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROJECTS — Horizontal Showcase */}
        <section id="projects" className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end reveal">
            <div>
              <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">Selected Work</p>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Completed Projects</h2>
              <div className="w-16 h-px bg-[#D4AF37] mt-6"></div>
            </div>
            <div className="hidden md:flex gap-2">
              <span className="w-12 h-px bg-white/20"></span>
              <span className="w-12 h-px bg-[#D4AF37]"></span>
              <span className="w-12 h-px bg-white/20"></span>
            </div>
          </div>

          <div
            ref={projectsRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex gap-6 overflow-x-auto px-6 pb-12 snap-x snap-mandatory hide-scrollbar ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, i) => (
              <div key={i} className="flex-shrink-0 w-[85vw] md:w-[600px] snap-center group reveal">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.06] mb-6">
                  <img src={project.img} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-[10px] tracking-wider uppercase bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-1 group-hover:text-[#D4AF37] transition-colors">{project.title}</h3>
                <p className="text-white/40 text-sm tracking-widest uppercase mb-6">{project.category}</p>
                <Link
                  to={project.title === 'OsatofoGCS' ? '/projects/osatofogcs' : '#'}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#D4AF37] hover:gap-4 transition-all"
                >
                  View Case Study <span className="text-lg">→</span>
                </Link>
              </div>
            ))}
            <div className="flex-shrink-0 w-12 md:w-24"></div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="py-32 bg-gradient-to-b from-black via-gray-950/30 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 reveal">
              <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">Credentials</p>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Certifications</h2>
              <div className="w-16 h-px bg-[#D4AF37] mt-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, i) => (
                <div key={i} className="group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-[#D4AF37]/30 transition-all duration-500 reveal">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-semibold">{cert.year}</span>
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-serif mb-2 group-hover:translate-x-1 transition-transform duration-300">{cert.title}</h3>
                  <p className="text-white/40 text-sm">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 reveal">
              <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">Testimonials</p>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Client Praise</h2>
              <div className="w-16 h-px bg-[#D4AF37] mt-6"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="relative p-8 md:p-10 rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md hover:border-[#D4AF37]/20 transition-all duration-500 reveal">
                  <div className="text-[#D4AF37] text-5xl font-serif leading-none mb-6 opacity-40">"</div>
                  <p className="text-white/70 leading-relaxed mb-8 text-sm md:text-base">{t.quote}</p>
                  <div>
                    <p className="text-white font-medium tracking-wide">{t.author}</p>
                    <p className="text-white/30 text-xs tracking-wider uppercase mt-1">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <ContactForm />

        {/* FOOTER */}
        <footer className="relative z-10 border-t border-white/[0.06] py-12 bg-black">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-lg font-serif tracking-widest uppercase font-bold text-[#D4AF37]">OP.</div>
            <div className="text-white/20 text-[10px] tracking-[0.2em] uppercase">© {getCurrentYear()} Oriarebun Princeton. All Rights Reserved.</div>
            <div className="flex gap-6 text-white/30 text-xs tracking-wider uppercase">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">GitHub</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Twitter</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}