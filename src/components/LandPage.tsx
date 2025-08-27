import { ChevronDown } from 'lucide-react';
import { useTranslation } from "react-i18next";

const LandPage = () => {
  const [t] = useTranslation('global');
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
  <div id="home" className="min-h-screen flex flex-col justify-center items-start px-4 md:px-16 relative">
      {/* Contenu principal */}
      <div className="max-w-4xl ml-4 md:ml-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
          {t('landpage.greeting')}{' '}
          <span className="text-blue-600">{t('landpage.name')}</span>
        </h1>
        
        <div className="space-y-6 text-lg md:text-xl lg:text-2xl text-font-color leading-relaxed">
          <p>
            {t('landpage.welcome')}{' '}
            <span className="text-blue-600 font-medium">{t('landpage.ai')}</span>, {t('landpage.particularly')}{' '}
            <span className="text-blue-600 font-medium">{t('landpage.deeplearning')}</span> {t('landpage.and')}{' '}
            <span className="text-blue-600 font-medium">{t('landpage.machinelearning')}</span>.
          </p>
          <p>
            {t('landpage.enjoy')}{' '}
            <span className="text-blue-600 font-medium">{t('landpage.computervision')}</span> {t('landpage.and')}{' '}
            <span className="text-blue-600 font-medium">{t('landpage.nlp')}</span>.
          </p>
          {/* <p>
            I have a particular interest in{' '}
            <span className="text-blue-600 font-medium">model design</span> and{' '}
            <span className="text-blue-600 font-medium">architecture</span>, 
            exploring how different neural network structures can be optimized for specific tasks and domains.
          </p> */}
        </div>

      {/* Flèche vers le bas */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
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
  </div>
  );
};

export default LandPage;