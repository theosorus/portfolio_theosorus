import { useState, useEffect, useRef } from 'react';

const langIcons: Record<'en' | 'fr', string> = {
  en: '/icons/uk.webp',
  fr: '/icons/france.webp',
};

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('en');
  const langMenuRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    setLangOpen(false);
  };

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

  return (
    <nav className="w-full h-14 border-b flex items-center justify-between px-3">
      <div className="font-main text-3xl">
        <h1 className="flex items-center">Theo Castillo</h1>
      </div>
      <div className="flex items-center justify-center mr-4">
        <div ref={langMenuRef} className="relative inline-block bg-openai-dark-blue mr-6 font-main text-xl z-1">
          <button onClick={() => setLangOpen(!langOpen)}>
            <img
              src={langIcons[language]}
              alt={language}
              className="w-8 h-6 inline-block"
            />
          </button>
          {langOpen && (
            <div className="absolute left-0 top-full mt-2 border shadow z-1">
              <button
                onClick={() => toggleLanguage('fr')}
                className="block px-4 py-2 w-full text-left bg-openai-dark-blue mr-4 z-1"
              >
                <span>fr</span>
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className="block px-4 py-2 w-full text-left"
              >
                <span>en</span>
              </button>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-4 items-center justify-center">
          <a href="#" className="text-xl a-underline">home</a>
          <a href="#" className="text-xl a-underline">about me</a>
          <a href="#" className="text-xl a-underline">projects</a>
          <a href="#" className="text-xl a-underline">contact</a>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <img
            src="/public/icons/menu.svg"
            alt="Menu"
            className="w-8 h-8"
            style={{ filter: 'invert(1)' }}
          />
        </button>
        <div
          className={`absolute top-14 right-0 w-full flex flex-col items-center md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <a href="#" className="p-3 text-xl  w-full text-center">home</a>
          <a href="#" className="p-3 text-xl border-t w-full text-center z-0">about me</a>
          <a href="#" className="p-3 text-xl border-t w-full text-center z-0">projects</a>
          <a href="#" className="p-3 text-xl border-y w-full text-center z-0">contact</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;