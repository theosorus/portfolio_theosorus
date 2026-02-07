import { ChevronDown } from 'lucide-react';
import { useTranslation } from "react-i18next";
import ASCIIHuman from './ASCIIHuman';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LandPage = () => {
  const [t] = useTranslation('global');
  const hasAnimated = useRef(false);
  const showColoredBackground = false; // Variable pour activer/désactiver les fonds colorés

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. "Bonjour, je suis Théo"
    tl.fromTo('.hero-title',
      { y: 60, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9 }
    )
    // 2. Les deux paragraphes de description
    .fromTo('.hero-description',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
      '-=0.2'
    )
    // 3. Le bonhomme ASCII + scroll indicator
    .fromTo('.ascii-container, .scroll-indicator',
      { scale: 0.8, opacity: 0, filter: 'blur(15px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1 },
      '-=0.3'
    );
  }, []);

  const scrollToNext = () => {
  const aboutSection = document.getElementById('about-me') || document.querySelector('[data-section="about"]');
  if (aboutSection) {
    const elementRect = aboutSection.getBoundingClientRect();
    const elementTop = elementRect.top + window.pageYOffset;
    const elementHeight = elementRect.height;
    const windowHeight = window.innerHeight;
    
    const targetPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);
    
    window.scrollTo({ 
      top: targetPosition, 
      behavior: 'smooth' 
    });
  } else {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }
};

  return (
  <div id="home" className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 relative">
      {/* Container avec arrière-plan */}
      <div className={`w-full max-w-6xl ${showColoredBackground ? 'bg-gradient-to-br from-amber-200 to-amber-300 rounded-3xl shadow-2xl' : ''} p-6 md:p-8`}>
        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Section texte - Rectangle bleu */}
          <div className={`flex-1 ${showColoredBackground ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : ''} rounded-2xl p-6 md:p-8`}>
            <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('landpage.greeting')}{' '}
              <span className={showColoredBackground ? "text-blue-200" : "text-blue-600"}>{t('landpage.name')}</span>
            </h1>
            
            <div className="space-y-4 text-base md:text-lg lg:text-xl leading-relaxed">
              <p className="hero-description">
                {t('landpage.welcome')}{' '}
                <span className={`${showColoredBackground ? "text-blue-200" : "text-blue-600"} font-medium`}>{t('landpage.ai')}</span>, {t('landpage.particularly')}{' '}
                <span className={`${showColoredBackground ? "text-blue-200" : "text-blue-600"} font-medium`}>{t('landpage.deeplearning')}</span> {t('landpage.and')}{' '}
                <span className={`${showColoredBackground ? "text-blue-200" : "text-blue-600"} font-medium`}>{t('landpage.machinelearning')}</span>.
              </p>
              <p className="hero-description">
                {t('landpage.enjoy')}{' '}
                <span className={`${showColoredBackground ? "text-blue-200" : "text-blue-600"} font-medium`}>{t('landpage.computervision')}</span> {t('landpage.and')}{' '}
                <span className={`${showColoredBackground ? "text-blue-200" : "text-blue-600"} font-medium`}>{t('landpage.nlp')}</span>.
              </p>
            </div>
          </div>
          
          {/* ASCII Human Component - Rectangle rouge Desktop */}
          <div className={`ascii-container hidden lg:flex flex-shrink-0 ${showColoredBackground ? 'bg-gradient-to-br from-red-500 to-red-600' : ''} rounded-2xl p-6 items-center justify-center min-h-[400px] min-w-[300px]`}>
            <div className="flex items-center justify-center w-full h-full">
              <ASCIIHuman className="scale-125" />
            </div>
          </div>
        </div>
        
        {/* ASCII Human Component Mobile - En dessous du texte */}
        <div className={`ascii-container lg:hidden flex justify-center mt-6 ${showColoredBackground ? 'bg-gradient-to-br from-red-500 to-red-600' : ''} rounded-2xl p-6`}>
          <ASCIIHuman className="scale-100" isMobile={true} />
        </div>
      </div>

      {/* Flèche vers le bas */}
      <div className="scroll-indicator hidden lg:block absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
          aria-label={t('landpage.scrollNextSection')}
        >
          <div className="animate-bounce">
            <ChevronDown 
              size={32} 
              className="group-hover:scale-110 transition-transform duration-300" 
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default LandPage;