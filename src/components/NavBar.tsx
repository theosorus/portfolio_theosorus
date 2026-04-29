import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const [t, i18n] = useTranslation('global');
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const navLinks = [
    { href: '#about-me', label: t('navbar.aboutme') },
    { href: '#career', label: t('navbar.career') },
    { href: '#projects', label: t('navbar.projects') },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-14 flex items-center justify-between px-4 sm:px-6 z-50 bg-bg/85 backdrop-blur-md border-b border-white/[0.08]">
      <a
        href="#home"
        className="text-sm sm:text-base md:text-lg text-fg hover:text-accent transition-colors truncate min-w-0"
        style={{ fontFamily: 'var(--font-domine)' }}
      >
        Théo Castillo
      </a>

      <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="flex items-center gap-1 text-xs"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <button
            onClick={() => i18n.changeLanguage('fr')}
            className={`px-1.5 py-0.5 transition-colors ${
              currentLang === 'fr' ? 'text-accent' : 'text-fg-dim hover:text-fg-muted'
            }`}
            aria-label="Français"
          >
            fr
          </button>
          <span className="text-fg-dim">/</span>
          <button
            onClick={() => i18n.changeLanguage('en')}
            className={`px-1.5 py-0.5 transition-colors ${
              currentLang === 'en' ? 'text-accent' : 'text-fg-dim hover:text-fg-muted'
            }`}
            aria-label="English"
          >
            en
          </button>
        </div>

        <button
          className="md:hidden text-fg-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div
        className={`absolute top-14 right-0 left-0 flex flex-col md:hidden transition-all duration-300 overflow-hidden bg-bg border-b border-white/[0.08] ${
          menuOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="px-6 py-3 text-sm text-fg-muted hover:text-accent transition-colors border-t border-white/[0.06]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
