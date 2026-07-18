import { useState } from 'react';

const FORM_ENDPOINT = 'https://formspree.io/f/xqalyeko';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Unable to send message right now.');
      }

      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Let's Create Together</h2>
          <p className="text-white/40 max-w-lg mx-auto">Have a project in mind? I'm currently available for select collaborations and full-time opportunities.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6 reveal">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2 group-focus-within:text-[#D4AF37] transition-colors">Name</label>
              <input required type="text" name="name" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.05] transition-all" placeholder="Your name" />
            </div>
            <div className="group">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2 group-focus-within:text-[#D4AF37] transition-colors">Email</label>
              <input required type="email" name="email" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.05] transition-all" placeholder="you@company.com" />
            </div>
          </div>
          <div className="group">
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2 group-focus-within:text-[#D4AF37] transition-colors">Message</label>
            <textarea required rows={5} name="message" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.05] transition-all resize-none" placeholder="Tell me about your project..."></textarea>
          </div>
          {submitError && <p className="text-sm text-red-400">{submitError}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#D4AF37] text-black text-xs tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? 'Sending...' : submitted ? 'Message Sent Successfully' : 'Send Message'}
            {!isSubmitting && !submitted && <span>→</span>}
          </button>
        </form>
      </div>
    </section>
  );
}
