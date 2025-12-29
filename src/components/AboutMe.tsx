import { Mail, Github, Linkedin, Download, Check } from 'lucide-react';
import hobbiesInterestData from '../data/hobbies_interest.json';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const AboutMe = () => {
  const [t, i18n] = useTranslation('global');
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
    const currentLang = i18n.language;
    console.log('Langue détectée:', currentLang);

    const fileName = currentLang === 'fr' ? 'cv_tcastillo_fr.pdf' : 'resume_tcastillo_en.pdf';

    console.log('Fichier à télécharger:', fileName);
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
      customIcon: '/icons/kaggle.png',
      href: 'https://www.kaggle.com/gazeux330000',
      color: 'bg-cyan-500 hover:bg-cyan-600',
    },
    {
      name: "Gazeux's Huggingface",
      customIcon: '/icons/huggingface-color.png',
      href: 'https://huggingface.co/Gazeux33',
      color: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
      name: t('aboutme.download_cv'),
      icon: Download,
      action: handleDownloadCV,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div id="about-me" className="w-full flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-stretch">
          
          {/* Card Image avec info personnelle */}
          <div className="lg:col-span-1 flex">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6 flex-1">
              <div className="relative">
                <img
                  src="./island.jpeg"
                  alt="Theo"
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              
              <div className="text-center space-y-3">
                <h3 className="text-xl font-bold text-font-color">{t('aboutme.name')}</h3>
                <p className="text-base text-font-color leading-relaxed">
                  {t('aboutme.description_before_age')} <span className="text-blue-600 font-semibold">{t('aboutme.age')}</span> {t('aboutme.description_after_age')}
                </p>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
            {/* Grid pour Interests/Hobbies et nouvelles sections */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Colonne gauche: Interests et I'm working on */}
              <div className="space-y-6">
                {/* Interests */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-font-color">{t('aboutme.interest_title')}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {visibleInterests.map((interest) => (
                      <span key={interest.key} className="inline-block bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium transition-all duration-300 hover:scale-105 border border-blue-500/20">
                        {t(`aboutme.interests.${interest.key}`)}
                      </span>
                    ))}
                  </div>

                  {interests.length > MAX_VISIBLE && (
                    <button
                      type="button"
                      aria-expanded={showAllInterests}
                      onClick={() => setShowAllInterests((v) => !v)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                      {showAllInterests ? 'Voir moins' : `+${interests.length - MAX_VISIBLE} autres`}
                    </button>
                  )}
                </div>

                {/* I'm working on */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-font-color">{t('aboutme.working_on_title')}</h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-font-color/80 leading-relaxed">
                    {t('aboutme.working_on_description')}
                  </p>
                </div>
              </div>

              {/* Colonne droite: Hobbies et For the future */}
              <div className="space-y-6">
                {/* Hobbies */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-font-color">{t('aboutme.hobbies_title')}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {visibleHobbies.map((hobby) => (
                      <span key={hobby.key} className="inline-flex items-center gap-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-medium transition-all duration-300 hover:scale-105 border border-purple-500/20">
                        <span className="text-sm">{hobby.emoji}</span>
                        {t(`aboutme.hobbies.${hobby.key}`)}
                      </span>
                    ))}
                  </div>

                  {hobbies.length > MAX_VISIBLE && (
                    <button
                      type="button"
                      aria-expanded={showAllHobbies}
                      onClick={() => setShowAllHobbies((v) => !v)}
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                    >
                      {showAllHobbies ? 'Voir moins' : `+${hobbies.length - MAX_VISIBLE} autres`}
                    </button>
                  )}
                </div>

                {/* For the future */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-font-color">{t('aboutme.future_title')}</h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-font-color/80 leading-relaxed">
                    {t('aboutme.future_description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Liens sociaux */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-font-color">{t('aboutme.all_links')}</h3>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.isEmail && emailCopied ? Check : link.icon;

                  if (link.action) {
                    return (
                      <button
                        key={index}
                        ref={link.isEmail ? emailButtonRef : null}
                        onClick={link.action}
                        style={link.isEmail ? { minWidth: emailButtonWidth } : {}}
                        aria-live={link.isEmail ? 'polite' : undefined}
                        className={`${link.color} text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-3 flex-shrink-0 ${
                          emailCopied && link.isEmail ? 'animate-pulse' : ''
                        }`}
                      >
                        {IconComponent && <IconComponent size={16} />}
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
                      className={`${link.color} text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-3 flex-shrink-0`}
                    >
                      {link.customIcon ? (
                        <img src={link.customIcon} alt="" className="w-4 h-4" />
                      ) : (
                        IconComponent && <IconComponent size={16} />
                      )}
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;