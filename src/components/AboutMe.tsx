import { Mail, Github, Linkedin, Download, ExternalLink, Check } from 'lucide-react';
import hobbiesInterestData from '../data/hobbies_interest.json';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div id="about-me" className="w-full flex flex-col items-center py-0 px-4 min-h-[90vh]">
      <div className="w-full max-w-5xl">
        {/* Layout avec Flexbox au lieu de Grid */}
        <div className="rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Section Image (gauche) - Equivalent à lg:col-span-3 */}
            <div className="flex-1 lg:flex-[1_1_50%]">
              <img
                src="./island.jpeg"
                alt="Theo"
                className="w-full h-full min-h-[450px] object-cover"
              />
            </div>

            {/* Section Description + Interest + Hobbies (droite) - Equivalent à lg:col-span-3 */}
            <div className="flex-1 lg:flex-[1_1_50%] p-8 space-y-8">
              
              {/* Description */}
              <div>
                <p className="text-lg leading-relaxed text-font-color">
                  {t('aboutme.description_before_name')} <b className='text-blue-600'>{t('aboutme.name')}</b>, {t('aboutme.description_before_age')} <b className='text-blue-600'>{t('aboutme.age')}</b> {t('aboutme.description_after_age')}
                </p>
              </div>

              {/* Interest et Hobbies - Design épuré */}
              <div className="space-y-8">
                
                {/* Interests */}
                <div>
                  <h3 className="text-2xl font-semibold mb-5 border-b border-gray-500 pb-2">{t('aboutme.interest_title')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((interest) => (
                      <div key={interest.key} className="group">
                        <span className="bg-white text-gray-600 px-4 py-2.5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-default">
                          {t(`aboutme.interests.${interest.key}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hobbies */}
                <div>
                  <h3 className="text-2xl font-semibold mb-5 border-b border-gray-500 pb-2">{t('aboutme.hobbies_title')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {hobbies.map((hobby) => (
                      <div key={hobby.key} className="group bg-white text-gray-600 px-3 py-1 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-default flex items-center gap-2">
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
                <h3 className="text-2xl font-semibold mb-5 border-b border-gray-500 pb-2">{t('aboutme.all_links')}</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link, index) => {
                    const IconComponent = link.isEmail && emailCopied ? Check : link.icon;
                    
                    if (link.action) {
                      return (
                        <button
                          key={index}
                          ref={link.isEmail ? emailButtonRef : null}
                          onClick={link.action}
                          style={link.isEmail ? { width: emailButtonWidth } : {}}
                          className={`${link.color} text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-md ${
                            emailCopied && link.isEmail ? 'animate-pulse' : ''
                          }`}
                        >
                          <IconComponent size={14} />
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