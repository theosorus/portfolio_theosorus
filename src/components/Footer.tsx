import { ChevronUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-darker-blue border-gray-200 py-8 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Contenu principal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          
          {/* Informations personnelles */}
          <div className="space-y-2">
            <p className="font-medium text-gray-900">Théo</p>
            <p className="text-sm text-gray-600">Étudiant en informatique - Bordeaux, France</p>
            <a 
              href="mailto:theo@example.com" 
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              theo@example.com
            </a>
          </div>

          {/* Mentions légales courtes */}
          <div className="text-sm text-gray-500 text-center md:text-right space-y-1">
            <p>© {currentYear} Théo - Tous droits réservés</p>
            <p>Portfolio personnel - Données non collectées</p>
          </div>
        </div>

        {/* Ligne de séparation et liens */}
        <div className="border-t border-gray-300 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs text-gray-400">
              Développé avec React & TypeScript
            </p>
            
            <div className="flex space-x-4 text-xs">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                Retour en haut
              </button>
              <a 
                href="mailto:theo@example.com" 
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;