import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function ContactPage() {
  useEffect(() => {
    const title = 'Contact Oriarebun Princeton | Web Developer';
    const description = 'Get in contact with Oriarebun Princeton for thoughtful web design, development, collaborations, and digital experiences tailored to your goals.';
    const url = 'https://oriarebun-princeton-portfolio.vercel.app/contact';

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);

    return () => {
      document.title = 'Oriarebun Princeton | Web Developer Portfolio';
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Portfolio of Oriarebun Princeton, a web developer creating polished, responsive websites and digital experiences.');
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'Oriarebun Princeton | Web Developer Portfolio');
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'Explore selected web projects, skills, and experience from Oriarebun Princeton.');
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://oriarebun-princeton-portfolio.vercel.app/');
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://oriarebun-princeton-portfolio.vercel.app/');
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <header className="relative z-20 flex items-center justify-between border-b border-white/[0.06] px-6 py-6 md:px-10">
        <Link to="/" className="text-sm font-serif font-bold tracking-widest text-[#D4AF37]">
          OP.
        </Link>
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#D4AF37]">
          <span aria-hidden="true" className="mr-2">←</span>Back to portfolio
        </Link>
      </header>

      <main>
        <ContactForm />
        <section className="mx-auto max-w-3xl px-6 pt-8 pb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Prefer to talk directly?</p>
          <a href="tel:+2348149276890" className="mt-3 block text-2xl font-serif text-[#D4AF37] transition-colors hover:text-white md:text-3xl">
            +234 814 927 6890
          </a>
          <a href="https://wa.me/2348149276890" target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#D4AF37]">
            Chat on WhatsApp
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}