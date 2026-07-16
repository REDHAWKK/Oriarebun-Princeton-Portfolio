import { useEffect, useRef, useState } from 'react';

export default function Expertise({ skills }) {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState(() => skills.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const targets = skills.map((skill) => Number(skill.level.replace('%', '')));

          targets.forEach((target, index) => {
            const startTime = performance.now();
            const duration = 1600 + index * 220;

            const tick = (now) => {
              const progress = Math.min(1, (now - startTime) / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              const value = Math.round(target * eased);

              setAnimatedLevels((prev) => {
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
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasAnimated, skills]);

  return (
    <section ref={sectionRef} id="skills" className="py-32 bg-gradient-to-b from-black to-gray-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 reveal">
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">Expertise</p>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Technical Mastery</h2>
          <div className="w-16 h-px bg-[#D4AF37] mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {skills.map((skill, i) => {
            const target = Number(skill.level.replace('%', ''));
            const currentValue = animatedLevels[i] ?? 0;

            return (
              <div key={i} className="group p-8 md:p-10 bg-black hover:bg-white/[0.02] transition-all duration-500 reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <h3 className="text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors duration-300 mb-4">{skill.name}</h3>
                <div className="w-full h-px bg-white/10 mb-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-[#D4AF37] transition-all duration-700" style={{ width: `${hasAnimated ? (currentValue / target) * 100 : 0}%` }}>
                    <div className="absolute right-0 top-0 h-full w-4 bg-[#D4AF37] blur-sm"></div>
                  </div>
                </div>
                <p className="text-white/40 text-sm font-mono tracking-wider">{hasAnimated ? `${currentValue}%` : '0%'}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
