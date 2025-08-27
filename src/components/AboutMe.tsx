import { Mail, Github, Linkedin, Download, ExternalLink, Check } from 'lucide-react';
import hobbiesInterestData from '../data/hobbies_interest.json';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type ChipProps = {
  children: React.ReactNode;
  className?: string;
};

const Chip = ({ children, className = '' }: ChipProps) => (
  <li
    role="listitem"
    tabIndex={0}
    className={`group inline-flex items-center gap-1.5 rounded-full border border-gray-200/70 bg-white/80 backdrop-blur px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition
                hover:shadow-md hover:ring-blue-300 motion-safe:hover:-translate-y-0.5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
  >
    <span
      className="h-1 w-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
      aria-hidden
    />
    {children}
  </li>
);

const EmojiChip = ({ children, className = '' }: ChipProps) => (
  <li
    role="listitem"
    tabIndex={0}
    className={`group inline-flex items-center gap-1.5 rounded-lg border border-gray-200/70 bg-white/90 backdrop-blur px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition
                hover:shadow-md hover:ring-emerald-300 motion-safe:hover:-translate-y-0.5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${className}`}
  >
    {children}
  </li>
);

export const AboutMe = () => {
  const [t] = useTranslation('global');
  const [emailCopied, setEmailCopied] = useState(false);
  const emailButtonRef = useRef<HTMLButtonElement | null>(null);
  const [emailButtonWidth, setEmailButtonWidth] = useState('auto');

  useEffect(() => {
    if (emailButtonRef.current && emailButtonWidth === 'auto') {
      const width = emailButtonRef.current.offsetWidth;
      setEmailButtonWidth(`${width}px`);
    }
  }, [emailButtonWidth]);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('theocastillo@yahoo.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 600);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
      const textArea = document.createElement('textarea');
      textArea.value = 'theocastillo@yahoo.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1000);
    }
  };

  const handleDownloadCV = () => {
    const fileName = 'resume_tcastillo_en.pdf';
    const link = document.createElement('a');
    link.href = `/cv/${fileName}`;
    link.download = fileName;
    link.click();
  };

  const { interests, hobbies } = hobbiesInterestData as {
    interests: { key: string }[];
    hobbies: { key: string; emoji: string }[];
  };

  // --- Améliorations UI/UX pour Interests & Hobbies ---
  const MAX_VISIBLE = 6; // Réduit de 8 à 6
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [showAllHobbies, setShowAllHobbies] = useState(false);

  const visibleInterests = showAllInterests ? interests : interests.slice(0, MAX_VISIBLE);
  const visibleHobbies = showAllHobbies ? hobbies : hobbies.slice(0, MAX_VISIBLE);

  const socialLinks = [
    {
      name: 'theocastillo@yahoo.com',
      icon: Mail,
      action: handleEmailClick,
      color: emailCopied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600',
      isEmail: true,
    },
    {
      name: 'theosorus',
      icon: Github,
      href: 'https://github.com/theosorus',
      color: 'bg-gray-800 hover:bg-gray-900',
    },
    {
      name: "Theo Castillo",
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/theo-castillo/',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: "Gazeux's Kaggle",
      icon: ExternalLink,
      href: 'https://www.kaggle.com/gazeux330000',
      color: 'bg-cyan-500 hover:bg-cyan-600',
    },
    {
      name: t('aboutme.download_cv'),
      icon: Download,
      action: handleDownloadCV,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div id="about-me" className="w-full flex flex-col items-center py-0 px-3 min-h-[75vh]">
      <div className="w-full max-w-4xl">
        <div className="rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="flex-1 lg:flex-[1_1_45%]">
              <img
                src="./island.jpeg"
                alt="Theo"
                className="w-full h-full min-h-[340px] lg:min-h-[380px] object-cover"
                loading="lazy"
              />
            </div>

            {/* Contenu */}
            <div className="flex-1 lg:flex-[1_1_55%] p-6 space-y-6">
              {/* Description */}
              <div>
                <p className="text-sm lg:text-base leading-relaxed text-font-color">
                  {t('aboutme.description_before_name')}{' '}
                  <b className="text-blue-600">{t('aboutme.name')}</b>, {t('aboutme.description_before_age')}{' '}
                  <b className="text-blue-600">{t('aboutme.age')}</b> {t('aboutme.description_after_age')}
                </p>
              </div>

              {/* Interests & Hobbies – version améliorée */}
              <div className="space-y-7">
                {/* Interests */}
                <section aria-labelledby="interests-title">
                  <h3
                    id="interests-title"
                    className="text-xl font-semibold mb-3 border-b border-gray-400 pb-1.5 flex items-center justify-between"
                  >
                    <span>{t('aboutme.interest_title')}</span>
                    <span className="text-xs text-gray-500">
                      <span className="sr-only">{t('aboutme.interest_title')}</span>
                      {interests.length}
                    </span>
                  </h3>

                  <ul
                    role="list"
                    aria-label={t('aboutme.interest_title')}
                    className="flex flex-wrap gap-2"
                  >
                    {visibleInterests.map((interest) => (
                      <Chip key={interest.key}>
                        {t(`aboutme.interests.${interest.key}`)}
                      </Chip>
                    ))}
                  </ul>

                  {interests.length > MAX_VISIBLE && (
                    <div className="mt-3">
                      <button
                        type="button"
                        aria-expanded={showAllInterests}
                        onClick={() => setShowAllInterests((v) => !v)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                      >
                        {showAllInterests
                          ? t('aboutme.show_less', 'Afficher moins')
                          : t('aboutme.show_more', 'Afficher plus')}
                        <span
                          aria-hidden
                          className={`transition-transform text-sm ${showAllInterests ? 'rotate-180' : ''}`}
                        >
                          ▾
                        </span>
                      </button>
                    </div>
                  )}
                </section>

                {/* Hobbies */}
                <section aria-labelledby="hobbies-title">
                  <h3
                    id="hobbies-title"
                    className="text-xl font-semibold mb-3 border-b border-gray-400 pb-1.5 flex items-center justify-between"
                  >
                    <span>{t('aboutme.hobbies_title')}</span>
                    <span className="text-xs text-gray-500">
                      <span className="sr-only">{t('aboutme.hobbies_title')}</span>
                      {hobbies.length}
                    </span>
                  </h3>

                  <ul
                    role="list"
                    aria-label={t('aboutme.hobbies_title')}
                    className="flex flex-wrap gap-2"
                  >
                    {visibleHobbies.map((hobby) => (
                      <EmojiChip key={hobby.key}>
                        <span className="text-base leading-none transition-transform group-hover:scale-110">
                          {hobby.emoji}
                        </span>
                        <span className="text-sm">
                          {t(`aboutme.hobbies.${hobby.key}`)}
                        </span>
                      </EmojiChip>
                    ))}
                  </ul>

                  {hobbies.length > MAX_VISIBLE && (
                    <div className="mt-3">
                      <button
                        type="button"
                        aria-expanded={showAllHobbies}
                        onClick={() => setShowAllHobbies((v) => !v)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                      >
                        {showAllHobbies
                          ? t('aboutme.show_less', 'Afficher moins')
                          : t('aboutme.show_more', 'Afficher plus')}
                        <span
                          aria-hidden
                          className={`transition-transform text-sm ${showAllHobbies ? 'rotate-180' : ''}`}
                        >
                          ▾
                        </span>
                      </button>
                    </div>
                  )}
                </section>
              </div>

              {/* Liens */}
              <div>
                <h3 className="text-xl font-semibold mb-3 border-b border-gray-400 pb-1.5">
                  {t('aboutme.all_links')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link, index) => {
                    const IconComponent = link.isEmail && emailCopied ? Check : link.icon;

                    if (link.action) {
                      return (
                        <button
                          key={index}
                          ref={link.isEmail ? emailButtonRef : null}
                          onClick={link.action}
                          style={link.isEmail ? { width: emailButtonWidth } : {}}
                          aria-live={link.isEmail ? 'polite' : undefined}
                          className={`${link.color} text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 hover:scale-105 flex items-center gap-1.5 shadow-md ${
                            emailCopied && link.isEmail ? 'animate-pulse' : ''
                          }`}
                        >
                          <IconComponent size={12} />
                          <span className={link.isEmail && emailCopied ? 'flex-1 text-center' : ''}>
                            {link.isEmail && emailCopied ? t('aboutme.copied') : link.name}
                          </span>
                        </button>
                      );
                    }

                    return (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${link.color} text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1.5 shadow-md`}
                      >
                        <IconComponent size={12} />
                        {link.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* /Contenu */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;