import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const langs = [
  { code: 'fr' as const, icon: './icons/france.webp' },
  { code: 'en' as const, icon: './icons/uk.webp' },
];

const NavBar = () => {
  const [t, i18n] = useTranslation('global');
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLang = i18n.language as 'fr' | 'en';

  return (
    <nav className="fixed top-0 left-0 w-full h-14 border-b flex items-center justify-between px-3 z-50 bg-openai-dark-blue">
      <div className="font-main text-3xl">
        <h1 className="flex items-center">Théo Castillo</h1>
      </div>
      <div className="flex items-center justify-center md:mr-6 mr-2">
        <div className="relative flex items-center md:mr-6 mr-2 rounded-full bg-white/5 border border-white/10 p-0.5">
          {/* Sliding highlight */}
          <div
            className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-openai-purple/20 border border-openai-purple/40 transition-all duration-300 ease-out"
            style={{ left: currentLang === 'fr' ? '2px' : 'calc(50% + 0px)' }}
          />
          {langs.map(({ code, icon }) => (
            <button
              key={code}
              onClick={() => i18n.changeLanguage(code)}
              className={`relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                currentLang === code ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <img src={icon} alt={code} className="w-5 h-3.5 rounded-sm object-cover" />
              <span className="text-xs font-medium uppercase tracking-wider">{code}</span>
            </button>
          ))}
        </div>
        <div className="hidden md:flex space-x-4 items-center justify-center">
          <a href="#home" className="text-xl a-underline">{t("navbar.home")}</a>
          <a href="#about-me" className="text-xl a-underline">{t("navbar.aboutme")}</a>
          <a href="#career" className="text-xl a-underline">{t("navbar.career")}</a>
          <a href="#projects" className="text-xl a-underline">{t("navbar.projects")}</a>
          
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <img
            src="./icons/menu.svg"
            alt="Menu"
            className="w-8 h-8"
            style={{ filter: 'invert(1)' }}
          />
        </button>
        <div
          className={`absolute top-14 right-0 w-full flex flex-col items-center md:hidden transition-all duration-700 overflow-hidden bg-openai-dark-blue ${
            menuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <a href="#home" className="p-3 text-xl w-full text-center">{t("navbar.home")}</a>
          <a href="#about-me" className="p-3 text-xl border-t w-full text-center z-0">{t("navbar.aboutme")}</a>
          <a href="#career" className="p-3 text-xl border-t w-full text-center z-0">{t("navbar.career")}</a>
          <a href="#projects" className="p-3 text-xl border-t w-full text-center z-0">{t("navbar.projects")}</a>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;