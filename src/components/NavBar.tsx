import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const langIcons: Record<'en' | 'fr', string> = {
  en: './icons/uk.webp',
  fr: './icons/france.webp',
};

const NavBar = () => {
  const [t, i18n] = useTranslation('global');
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLang = i18n.language as 'fr' | 'en';

  return (
    <nav className="fixed top-0 left-0 w-full h-14 border-b flex items-center justify-between px-3 z-50 bg-openai-dark-blue">
      <div className="font-main text-3xl">
        <h1 className="flex items-center">Théo Castillo</h1>
      </div>
      <div className="flex items-center justify-center md:mr-6 mr-2">
        <div
          ref={langMenuRef}
          className="relative inline-block bg-openai-dark-blue md:mr-6 mr-2 font-main text-xl z-1"
        >
          <button onClick={() => setLangOpen(!langOpen)} className="flex items-center">
            <img src={langIcons[currentLang]} alt={currentLang} className="w-7 h-5 inline-block" />
            <svg
              className={`w-4 h-4 ml-1 inline-block transition-transform duration-200 ${
                langOpen ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293
                  a1 1 0 011.414 1.414l-4 4
                  a1 1 0 01-1.414 0l-4-4
                  a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {langOpen && (
            <div className="absolute left-0 top-full mt-2 border shadow z-1">
              <button
                onClick={() => {i18n.changeLanguage('fr');setLangOpen(false);}}
                className="block px-4 py-2 w-full text-left bg-openai-dark-blue mr-4 z-1"
              >
                <span>fr</span>
              </button>
              <button
                onClick={() => {i18n.changeLanguage('en');setLangOpen(false);}}
                className="block px-4 py-2 w-full text-left bg-openai-dark-blue mr-4 z-1"
              >
                <span>en</span>
              </button>
            </div>
          )}
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