import { Mail, Github, Linkedin, Download, ExternalLink, Check } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import hobbiesInterestData from '../data/hobbies_interest.json';

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

  const { interests, hobbies } = hobbiesInterestData;

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
      color: 'bg-dark-purple',
    },
  ];

  return (
    <div id="about-me" className="w-full flex flex-col items-center py-0 px-4 min-h-[80vh] ">
      <div className="w-full max-w-4xl">
        {/* Titre About Me */}
        {/* <h1 className="text-4xl font-bold text-font-color text-center mb-7">
          {t('aboutme.title')}
        </h1> */}

        {/* Layout selon le schéma - Ratio plus équilibré 3:3 */}
        <div className="rounded-2xl shadow-2xl overflow-hidden  ">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
            
            {/* Section Image (gauche) - Plus grande : 3/6 au lieu de 2/6 */}
            <div className="lg:col-span-3">
              <img
                src="./theo.jpeg"
                alt="Theo"
                className="w-full h-full min-h-[450px] object-cover"
              />
            </div>

            {/* Section Description + Interest + Hobbies (droite) - 3/6 au lieu de 4/6 */}
            <div className="lg:col-span-3 p-8 space-y-8">
              
              {/* Description */}
              <div>
                <p className="text-lg leading-relaxed text-font-color ">
                  {t('aboutme.description_before_name')} <b className='text-blue-600'>{t('aboutme.name')}</b>, {t('aboutme.description_before_age')} <b className='text-blue-600'>{t('aboutme.age')}</b> {t('aboutme.description_after_age')}
                </p>
              </div>

              {/* Interest et Hobbies - Design épuré */}
              <div className="space-y-8">
                
                {/* Interests */}
                <div>
                  <h3 className="text-2xl font-semibold mb-5  border-b border-gray-500 pb-2">{t('aboutme.interest_title')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((interest) => (
                      <div key={interest.key} className="group">
                        <span className={`bg-white text-gray-600 px-4 py-2.5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-default `}>
                          {t(`aboutme.interests.${interest.key}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hobbies */}
                <div>
                  <h3 className="text-2xl font-semibold mb-5  border-b border-gray-500 pb-2">{t('aboutme.hobbies_title')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {hobbies.map((hobby) => (
                      <div key={hobby.key} className={`group bg-white text-gray-600 px-3 py-1 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-default flex items-center gap-2`}>
                        <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                          {hobby.emoji}
                        </span>
                        <span className="text-sm font-medium">
                          {t(`aboutme.hobbies.${hobby.key}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* All links */}
              <div>
                <h3 className="text-2xl font-semibold mb-5  border-b border-gray-500 pb-2">{t('aboutme.all_links')}</h3>
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