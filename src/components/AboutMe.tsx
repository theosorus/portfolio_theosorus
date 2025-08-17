import { Mail, Github, Linkedin, Download, ExternalLink } from 'lucide-react';

export const AboutMe = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:theo@example.com'; // Remplacez par votre email
  };

  const handleDownloadCV = () => {
    // Remplacez par le chemin vers votre CV
    const link = document.createElement('a');
    link.href = '/cv/theo-cv.pdf';
    link.download = 'Theo_CV.pdf';
    link.click();
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      action: handleEmailClick,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/votre-username',
      color: 'bg-gray-800 hover:bg-gray-900',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/votre-profile',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Kaggle',
      icon: ExternalLink,
      href: 'https://kaggle.com/votre-profile',
      color: 'bg-cyan-500 hover:bg-cyan-600',
    },
    {
      name: 'Download CV',
      icon: Download,
      action: handleDownloadCV,
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <div className="w-full flex flex-col items-center py-16 px-4 min-h-screen">
      <div className="w-full max-w-4xl">
        {/* Titre About Me */}
        <h1 className="text-4xl font-bold text-font-color mb-8 ">
          About Me
        </h1>

        {/* Layout selon le schéma */}
        <div className=" rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
            
            {/* Section Image (gauche) - Encore plus large */}
            <div className="lg:col-span-2">
              <img
                src="/theo.jpeg"
                alt="Theo"
                className="w-full h-full min-h-[500px] object-cover"
              />
            </div>

            {/* Section Description + Interest + Hobbies (droite) */}
            <div className="lg:col-span-2 p-8 space-y-6">
              
              {/* Description */}
              <div>
                <h3 className="text-xl font-bold mb-3">Description</h3>
                <p className="text-lg">
                  My name is <b>Theo</b>, I'm <b>19 years old </b> and I'm studying <b>computer science</b> at the Gradignan Institute in Bordeaux
                </p>
              </div>

              {/* Interest et Hobbies en deux colonnes */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Interest (Expertise) */}
                <div>
                  <h3 className="text-xl font-bold  mb-3">Interest</h3>
                  <div className="space-y-2">
                    <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium">
                      Intelligence Artificielle
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                      Machine Learning
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                      Data Science
                    </div>
                  </div>
                </div>

                {/* Hobbies */}
                <div>
                  <h3 className="text-xl font-bold  mb-3">Hobbies</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-lg ">
                      <span className="mr-3">🏎️</span>
                      Formule 1
                    </div>
                    <div className="flex items-center text-lg ">
                      <span className="mr-3">🎴</span>
                      Jeux de cartes à collectionner
                    </div>
                    <div className="flex items-center text-lg ">
                      <span className="mr-3">♟️</span>
                      Échecs
                    </div>
                  </div>
                </div>
              </div>

              {/* All links */}
              <div>
                <h3 className="text-xl font-bold mb-4">All links</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    
                    if (link.action) {
                      return (
                        <button
                          key={index}
                          onClick={link.action}
                          className={`${link.color} text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 shadow-md`}
                        >
                          <IconComponent size={16} />
                          {link.name}
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
                        <IconComponent size={16} />
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