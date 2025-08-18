import { ChevronDown } from 'lucide-react';

const LandPage = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about-me') || document.querySelector('[data-section="about"]');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll by viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
  <div id="home" className="min-h-screen flex flex-col justify-center items-start px-4 md:px-16 relative">
      {/* Contenu principal */}
      <div className="max-w-4xl ml-4 md:ml-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
          Hello, I'm{' '}
          <span className="text-blue-600">Théo</span>
        </h1>
        
        <div className="space-y-6 text-lg md:text-xl lg:text-2xl text-font-color leading-relaxed">
          <p>
            Welcome to my portfolio! I am a computer science student with a passion for{' '}
            <span className="text-blue-600 font-medium">Artificial Intelligence</span>, particularly{' '}
            <span className="text-blue-600 font-medium">Deep Learning</span> and{' '}
            <span className="text-blue-600 font-medium">Machine Learning</span>.
          </p>
          <p>
            I especially enjoy working on projects that involve{' '}
            <span className="text-blue-600 font-medium">Computer Vision</span> and{' '}
            <span className="text-blue-600 font-medium">NLP</span>.
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
          aria-label="Scroll to next section"
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