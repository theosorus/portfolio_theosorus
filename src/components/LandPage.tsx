import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useCV } from '../hooks/useCV';

const LandPage = () => {
  const [t] = useTranslation('global');
  const hasAnimated = useRef(false);
  const { view } = useCV();

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    gsap.fromTo(
      '.hero-block',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' },
    );
  }, []);

  return (
    <section
      id="home"
      className="min-h-[88vh] w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col justify-center"
    >
      <div className="flex flex-col items-start gap-6 sm:gap-7">
        <div
          className="hero-block inline-flex items-center gap-2 text-[11px] sm:text-xs text-fg-muted px-3 py-1 rounded-full border border-white/[0.12] bg-white/[0.03]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          {t('landpage.status')}
        </div>

        <div className="hero-block flex flex-col gap-3 w-full">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight break-words"
            style={{ fontFamily: 'var(--font-domine)' }}
          >
            {t('landpage.name_full')}
          </h1>
          <p
            className="text-xs sm:text-sm md:text-base text-fg-muted flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span>{t('landpage.role_part1')}</span>
            <span aria-hidden className="hidden sm:inline text-fg-dim">|</span>
            <span>{t('landpage.role_part2')}</span>
          </p>
          <div className="h-px w-12 sm:w-16 bg-accent/60 mt-1" />
        </div>

        <p className="hero-block text-sm sm:text-base md:text-lg text-fg-muted leading-relaxed max-w-2xl">
          {t('landpage.bio_intro')}
          <span className="text-fg font-medium">{t('landpage.bio_ai')}</span>
          {t('landpage.bio_bridge')}
          <span className="text-fg font-medium">{t('landpage.bio_research')}</span>
          {t('landpage.bio_and')}
          <span className="text-fg font-medium">{t('landpage.bio_production')}</span>
          {t('landpage.bio_end')}
        </p>

        <div
          className="hero-block flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-3 mt-2 text-xs sm:text-sm"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <a
            href="#projects"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            → {t('landpage.cta_projects')}
          </a>
          <button
            type="button"
            onClick={view}
            className="text-fg-muted hover:text-accent transition-colors"
          >
            ↓ {t('landpage.cta_cv')}
          </button>
          <a
            href="#about-me"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            ✉ {t('landpage.cta_contact')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandPage;
