import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectCaseStudy } from '../data/projectCaseStudies';
import Footer from '../components/Footer';

export default function ProjectCaseStudyPage() {
  const { slug } = useParams();
  const project = getProjectCaseStudy(slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    document.title = project ? `${project.title} | Portfolio` : 'Project Not Found | Portfolio';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project]);

  useEffect(() => {
    if (!project?.galleryImages?.length) return;

    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % project.galleryImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">404</p>
          <h1 className="mt-4 text-3xl font-serif">Project not found</h1>
          <p className="mt-4 text-white/70">This case study page does not exist yet.</p>
          <Link to="/" className="mt-8 inline-flex rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 md:px-10 md:py-12">
        <Link to="/" className="w-fit text-sm uppercase tracking-[0.25em] text-[#D4AF37] transition hover:opacity-80">
          ← Back to portfolio
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#D4AF37]/15 via-black to-black p-8 shadow-[0_0_80px_rgba(212,175,55,0.12)] md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">{project.heroBadge}</p>
              <h1 className="mt-4 text-4xl font-serif leading-tight md:text-5xl lg:text-6xl">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{project.shortDescription}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={project.website} target="_blank" rel="noreferrer" className="rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90">
                  Visit website
                </a>
                <span className="rounded-full border border-white/15 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white/60">
                  {project.year} • {project.stack.join(' • ')}
                </span>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-6 backdrop-blur">
              <img src={project.coverImage} alt={project.title} className="h-[280px] w-full rounded-[1rem] object-cover" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Project summary</p>
            <p className="mt-5 text-lg leading-8 text-white/70">{project.summary}</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">The challenge</p>
            <p className="mt-5 text-lg leading-8 text-white/70">{project.challenge}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Approach</p>
            <p className="mt-5 text-lg leading-8 text-white/70">{project.approach}</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Overview</p>
            <p className="mt-5 text-lg leading-8 text-white/70">{project.overview}</p>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Featured sections</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {project.features.map((feature) => (
              <div key={feature} className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-white/85">{feature}</p>
              </div>
            ))}
          </div>
        </section>


        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#D4AF37]/10 to-black p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Results</p>
            <ul className="mt-5 space-y-3 text-white/75">
              {project.results.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#D4AF37]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Project gallery</p>
            <div className="mt-6 overflow-hidden rounded-[1rem] border border-white/10">
              <img
                src={project.galleryImages[activeImageIndex].src}
                alt={project.galleryImages[activeImageIndex].alt}
                className="h-[280px] w-full object-cover"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex gap-2">
                {project.galleryImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${activeImageIndex === index ? 'w-8 bg-[#D4AF37]' : 'w-2.5 bg-white/25'}`}
                    aria-label={`Show slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((current) => (current - 1 + project.galleryImages.length) % project.galleryImages.length)}
                  className="rounded-full border border-white/15 px-3 py-2 text-sm text-white/70 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((current) => (current + 1) % project.galleryImages.length)}
                  className="rounded-full border border-white/15 px-3 py-2 text-sm text-white/70 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">{project.videoTitle}</p>
          <p className="mt-4 text-lg leading-8 text-white/70">{project.videoDescription}</p>
          {project.videoUrl ? (
            <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/50">
              <video controls className="h-full w-full" src={project.videoUrl} />
            </div>
          ) : (
            <div className="mt-6 rounded-[1.25rem] border border-dashed border-white/15 bg-black/30 p-10 text-center text-white/60">
              No available yet.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
