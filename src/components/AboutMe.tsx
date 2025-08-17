import { Mail, Github, Linkedin, Download, ExternalLink, Check } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useState } from 'react';

export const AboutMe = () => {
  const [t, i18n] = useTranslation('global');
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('theocastillo@yahoo.com');
      setEmailCopied(true);
      // Réinitialiser l'animation après 2 secondes
      setTimeout(() => setEmailCopied(false), 600);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
      // Fallback pour les navigateurs plus anciens
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
    // Choisit le bon CV selon la langue active (ex: 'fr', 'en', 'fr-FR')
    const lang = (i18n?.language || '').toLowerCase();
    const isFr = lang.startsWith('fr');
  const fileName = isFr ? 'cv_tcastillo_fr.pdf' : 'resume_tcastillo_en.pdf';
    const link = document.createElement('a');
    link.href = `/cv/${fileName}`;
    link.download = fileName;
    link.click();
  };

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
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <div id="about-me" className="w-full flex flex-col items-center py-0 px-4 min-h-[90vh]">
      <div className="w-full max-w-3xl">
        {/* Titre About Me */}
        <h1 className="text-4xl font-bold text-font-color text-center mb-7">
          {t('aboutme.title')}
        </h1>

        {/* Layout selon le schéma */}
        <div className="rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
            
            {/* Section Image (gauche) - Encore plus large */}
            <div className="lg:col-span-2">
              <img
                src="/theo.jpeg"
                alt="Theo"
                className="w-full h-full min-h-[450px] object-cover"
              />
            </div>

            {/* Section Description + Interest + Hobbies (droite) */}
            <div className="lg:col-span-2 p-7 space-y-5">
              
              {/* Description */}
              <div>
                <p className="text-lg">
                  {t('aboutme.description_before_name')} <b className='text-blue-600'>{t('aboutme.name')}</b>, {t('aboutme.description_before_age')} <b className='text-blue-600'>{t('aboutme.age')}</b> {t('aboutme.description_after_age')}
                </p>
              </div>

              {/* Interest et Hobbies en deux colonnes */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Interest (Expertise) */}
                <div>
                  <h3 className="text-xl font-bold mb-3">{t('aboutme.interest_title')}</h3>
                  <div className="space-y-2">
                    <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium">
                      {t('aboutme.interests.ai')}
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                      {t('aboutme.interests.ml')}
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                      {t('aboutme.interests.ds')}
                    </div>
                  </div>
                </div>

                {/* Hobbies */}
                <div>
                  <h3 className="text-xl font-bold mb-3">{t('aboutme.hobbies_title')}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-lg">
                      <span className="mr-3">🏎️</span>
                      {t('aboutme.hobbies.f1')}
                    </div>
                    <div className="flex items-center text-lg">
                      <span className="mr-3">🎴</span>
                      {t('aboutme.hobbies.ccg')}
                    </div>
                    <div className="flex items-center text-lg">
                      <span className="mr-3">♟️</span>
                      {t('aboutme.hobbies.chess')}
                    </div>
                  </div>
                </div>
              </div>

              {/* All links */}
              <div>
                <h3 className="text-xl font-bold mb-4">{t('aboutme.all_links')}</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link, index) => {
          const IconComponent = link.isEmail && emailCopied ? Check : link.icon;
                    
        if (link.action) {
                      return (
                        <button
                          key={index}
                          onClick={link.action}
                          className={`${link.color} text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-md ${
                            emailCopied && link.isEmail ? 'animate-pulse' : ''
                          }`}
                        >
                          <IconComponent size={14} />
          {link.isEmail && emailCopied ? t('aboutme.copied') : link.name}
                        </button>
                      );
                    }

                    return (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${link.color} text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 shadow-md`}
                      >
                        <IconComponent size={14} />
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
    </div>
  );
};

export default AboutMe;