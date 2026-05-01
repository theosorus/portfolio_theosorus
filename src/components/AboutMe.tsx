import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Eye, Github, Linkedin, Mail, Check } from 'lucide-react';
import hobbiesInterestData from '../data/hobbies_interest.json';
import { useCV } from '../hooks/useCV';
import { useAge } from '../hooks/useAge';

const AboutMe = () => {
  const [t] = useTranslation('global');
  const { download, view } = useCV();
  const { age, countdown } = useAge();
  const [emailCopied, setEmailCopied] = useState(false);
  const email = 'theocastillo@yahoo.com';

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1500);
  };

  const { interests, hobbies } = hobbiesInterestData as {
    interests: { key: string }[];
    hobbies: { key: string; emoji?: string }[];
  };

  type LinkRow = {
    key: string;
    label: string;
    icon: typeof Github;
    href?: string;
    onClick?: () => void;
    isEmail?: boolean;
  };

  const links: LinkRow[] = [
    { key: 'github', label: 'theosorus', icon: Github, href: 'https://github.com/theosorus' },
    { key: 'linkedin', label: 'theo-castillo', icon: Linkedin, href: 'https://www.linkedin.com/in/theo-castillo/' },
    {
      key: 'huggingface',
      label: 'Gazeux33',
      icon: ({ size }: { size: number }) => (
        <img src="/icons/huggingface-color.png" alt="" width={size} height={size} className="object-contain" />
      ),
      href: 'https://huggingface.co/Gazeux33',
    } as unknown as LinkRow,
    {
      key: 'kaggle',
      label: 'gazeux330000',
      icon: ({ size }: { size: number }) => (
        <img src="/icons/kaggle.png" alt="" width={size} height={size} className="object-contain" />
      ),
      href: 'https://www.kaggle.com/gazeux330000',
    } as unknown as LinkRow,
    {
      key: 'email',
      label: emailCopied ? t('aboutme.copied') : email,
      icon: emailCopied ? Check : Mail,
      onClick: handleEmailCopy,
      isEmail: true,
    },
  ];

  return (
    <section
      id="about-me"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24"
    >
      <h2
        className="text-2xl md:text-3xl mb-8"
        style={{ fontFamily: 'var(--font-domine)' }}
      >
        {t('aboutme.section_title')}
      </h2>
      <div className="border-t border-white/[0.10]" />

      <div className="pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:items-stretch">

          {/* Left column — Photo card */}
          <div className="lg:col-span-1 flex">
            <div className="bg-white/[0.04] border border-white/[0.10] rounded-xl p-5 sm:p-6 space-y-5 flex-1 flex flex-col">
              <img
                src="./island.jpeg"
                alt="Théo Castillo"
                className="w-full aspect-square object-cover rounded-lg border border-white/[0.10]"
                loading="lazy"
              />

              <div className="text-center space-y-2">
                <h3
                  className="text-lg font-semibold text-fg-muted"
                  style={{ fontFamily: 'var(--font-domine)' }}
                >
                  {t('aboutme.name')}
                </h3>
                <p className="text-sm text-fg-muted">
                  {t('aboutme.description_before_age')}{' '}
                  <span className="text-accent font-semibold">{age} {t('aboutme.years_old')}</span>{' '}
                  <span className="text-fg-dim text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                    ({t('aboutme.countdown_prefix')} {countdown.days}{t('aboutme.countdown_days')} {String(countdown.hours).padStart(2, '0')}h{String(countdown.minutes).padStart(2, '0')}m{String(countdown.seconds).padStart(2, '0')}s)
                  </span>
                </p>
                <p className="text-xs text-fg-dim">
                  {t('aboutme.description_after_age')}
                </p>
              </div>

              <div className="flex-1" />

              <div
                className="flex flex-wrap gap-2 text-sm"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.10] hover:border-accent/40 rounded-md text-fg-muted hover:text-accent transition-colors flex-1 justify-center"
                >
                  <Download size={14} />
                  cv
                </button>
                <button
                  type="button"
                  onClick={view}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.10] hover:border-accent/40 rounded-md text-fg-muted hover:text-accent transition-colors flex-1 justify-center"
                >
                  <Eye size={14} />
                  {t('aboutme.view_cv')}
                </button>
              </div>
            </div>
          </div>

          {/* Right column — Content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* 2x2 grid: row-aligned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Row 1 — Interests */}
              <div className="bg-white/[0.04] border border-white/[0.10] rounded-xl p-5 sm:p-6">
                <h3
                  className="text-xs uppercase tracking-wider text-fg-dim mb-4"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t('aboutme.interest_title')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest.key}
                      className="inline-flex items-center text-xs text-fg-muted bg-white/[0.04] hover:bg-white/[0.08] hover:text-accent border border-white/[0.10] hover:border-accent/40 px-2.5 py-1 rounded-md transition-colors"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {t(`aboutme.interests.${interest.key}`)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 1 — Hobbies */}
              <div className="bg-white/[0.04] border border-white/[0.10] rounded-xl p-5 sm:p-6">
                <h3
                  className="text-xs uppercase tracking-wider text-fg-dim mb-4"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t('aboutme.hobbies_title')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hobbies.map((hobby) => (
                    <span
                      key={hobby.key}
                      className="inline-flex items-center text-xs text-fg-muted bg-white/[0.04] hover:bg-white/[0.08] hover:text-accent border border-white/[0.10] hover:border-accent/40 px-2.5 py-1 rounded-md transition-colors"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {t(`aboutme.hobbies.${hobby.key}`)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 2 — Working on */}
              <div className="bg-white/[0.04] border border-white/[0.10] rounded-xl p-5 sm:p-6">
                <h3
                  className="text-xs uppercase tracking-wider text-fg-dim mb-4"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t('aboutme.working_on_title')}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {t('aboutme.working_on_description')}
                </p>
              </div>

              {/* Row 2 — Future */}
              <div className="bg-white/[0.04] border border-white/[0.10] rounded-xl p-5 sm:p-6">
                <h3
                  className="text-xs uppercase tracking-wider text-fg-dim mb-4"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t('aboutme.future_title')}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {t('aboutme.future_description')}
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="bg-white/[0.04] border border-white/[0.10] rounded-xl p-5 sm:p-6 flex-1">
              <h3
                className="text-xs uppercase tracking-wider text-fg-dim mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {t('aboutme.all_links')}
              </h3>
              <ul
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {links.map((link) => {
                  const Icon = link.icon as React.ComponentType<{ size: number }>;
                  const inner = (
                    <span className="inline-flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 w-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.10] hover:border-accent/40 rounded-md transition-colors group">
                      <Icon size={14} />
                      <span className="text-fg-dim w-16 sm:w-20 flex-shrink-0 text-[10px] sm:text-xs uppercase tracking-wider">
                        {link.key}
                      </span>
                      <span className="text-fg-muted group-hover:text-accent transition-colors truncate text-xs sm:text-sm min-w-0">
                        {link.label}
                      </span>
                      {link.href && (
                        <span className="ml-auto text-fg-dim group-hover:text-accent transition-colors text-xs flex-shrink-0" aria-hidden>
                          ↗
                        </span>
                      )}
                    </span>
                  );

                  return (
                    <li key={link.key}>
                      {link.href ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {inner}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={link.onClick}
                          className="block w-full text-left"
                          aria-live="polite"
                        >
                          {inner}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
