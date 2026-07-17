import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 200);
      }
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-500">
      <div className="w-[min(90vw,420px)]">
        <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-[#D4AF37]">
          <span>Initializing portfolio</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-center text-sm text-white/60">Loading experience · React · Tailwind · Portfolio</p>
      </div>
    </div>
  );
}
