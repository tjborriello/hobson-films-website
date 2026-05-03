/* global React */
const { useEffect: useEffectBG, useRef: useRefBG } = React;

const HERO_BG_FRAME_COUNT = 49;
const HERO_BG_FRAME_PATH = (n) => `assets/hero-frames/frame-${String(n).padStart(4, '0')}.jpg?v=2`;

function HeroScrollBg() {
  const containerRef = useRefBG(null);
  const canvasRef = useRefBG(null);
  const framesRef = useRefBG([]);
  const lastFrameRef = useRefBG(-1);
  const rafRef = useRefBG(null);

  useEffectBG(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const wrapEl = container.closest('.hf-hero-wrap');
    if (!wrapEl) return;

    const ctx = canvas.getContext('2d');

    // Preload all frames
    const images = [];
    for (let i = 1; i <= HERO_BG_FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = HERO_BG_FRAME_PATH(i);
      images.push(img);
    }
    framesRef.current = images;

    const drawFrame = (idx) => {
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.drawImage(img, 0, 0);
      lastFrameRef.current = idx;
    };

    const findNearestLoaded = (idx) => {
      // Walk outward from idx to find the nearest loaded frame so we always show *something*
      // even if intermediate frames haven't loaded yet.
      for (let off = 0; off < HERO_BG_FRAME_COUNT; off++) {
        const a = images[idx - off];
        if (a && a.complete && a.naturalWidth > 0) return idx - off;
        const b = images[idx + off];
        if (b && b.complete && b.naturalWidth > 0) return idx + off;
      }
      return -1;
    };

    // Helper: parse a CSS length string ("200vh", "1500px") into pixels.
    const parseCssLength = (raw, vh) => {
      const s = String(raw || '').trim();
      if (s.endsWith('vh')) return (parseFloat(s) / 100) * vh;
      if (s.endsWith('px')) return parseFloat(s);
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : 0;
    };

    const update = () => {
      rafRef.current = null;
      // The hero is position:sticky inside the wrap, so the wrap is what
      // actually scrolls while the hero appears pinned. Animation progress is
      // tied to --hf-hero-anim (the animation portion of the pin) rather
      // than the entire wrap scroll length — that way an extra "hold"
      // segment after the animation can extend the pin without affecting
      // animation pacing.
      const rect = wrapEl.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 1;
      const animRaw = getComputedStyle(wrapEl).getPropertyValue('--hf-hero-anim');
      const animPx = Math.max(1, parseCssLength(animRaw, vh) || (rect.height - vh));
      const progress = Math.max(0, Math.min(1, -rect.top / animPx));
      const idx = Math.min(
        HERO_BG_FRAME_COUNT - 1,
        Math.floor(progress * HERO_BG_FRAME_COUNT)
      );
      const target = findNearestLoaded(idx);
      if (target !== -1 && target !== lastFrameRef.current) drawFrame(target);
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    // Reduced motion: pin to the assembled (final) frame, no scroll listener
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      const onLoadFinal = () => drawFrame(HERO_BG_FRAME_COUNT - 1);
      const final = images[HERO_BG_FRAME_COUNT - 1];
      if (final.complete && final.naturalWidth > 0) onLoadFinal();
      else final.addEventListener('load', onLoadFinal);
      return () => final.removeEventListener('load', onLoadFinal);
    }

    // Redraw whenever a frame finishes loading, in case the scroll position needs it
    images.forEach((img) => img.addEventListener('load', schedule));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();

    return () => {
      images.forEach((img) => img.removeEventListener('load', schedule));
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="hf-hero-scrollbg" ref={containerRef} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="hf-hero-scrollbg__canvas"
        width={1024}
        height={576}
      />
    </div>
  );
}

window.HeroScrollBg = HeroScrollBg;
