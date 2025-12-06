import { useTranslation } from 'react-i18next';
import projectsData from '../data/projects.json';
import { useEffect, useState } from 'react';
import { Project } from '../type';

const categories = ["All" ,"Personal","School","AI","Simulations","Web","Software"];

const Projects = () => {
  const [t] = useTranslation('global');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentProjects, setcurrentProjects] = useState<Project[]>([]);

  useEffect(() => {
    if(selectedCategory === "All"){
      setcurrentProjects(projectsData.projects)
    }
    else {
      setcurrentProjects(projectsData.projects.filter((p) => p.categories.includes(selectedCategory)));
    }
  }, [selectedCategory])

  return (
    <div id="projects" className='flex flex-col items-center w-full mt-12'>
      <h1 className="text-4xl font-bold text-font-color mb-8">{t("projects.title")}</h1>
      {/* Filtres de catégories */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              selectedCategory === cat 
                ? 'bg-purple-500 text-white border-purple-400 shadow-sm' 
                : 'bg-transparent text-white border-purple-500 hover:text-white hover:border-purple-400'
            }`}
          >
            {t(`projects.categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Galerie scrollable verticale */}
      <div className="w-full max-w-7xl px-4">
        <div 
          className="max-h-[650px] overflow-y-auto pr-3 scrollbar-thin scrollbar-track-slate-700/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          style={{
            scrollbarColor: 'var(--color-openai-purple) transparent',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-2">
            {currentProjects.map((project: Project, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  // Ouvre le premier lien s'il existe et n'est pas "none"
                  if (project.links && project.links[0] && project.links[0] !== "none") {
                    window.open(project.links[0], '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-2 text-slate-100 leading-tight">
                    {t(`projects.${project.id}.title`)}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3 line-clamp-3">
                    {t(`projects.${project.id}.description`)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <div 
                        key={idx} 
                        className='flex items-center bg-slate-800/60 backdrop-blur-sm rounded-lg px-2.5 py-1 border border-slate-700/50 transition-colors duration-200 hover:bg-purple-800/40'
                        onClick={(e) => e.stopPropagation()} // Empêche le clic sur le tag de déclencher le lien du projet
                      >
                        <span className="text-xs font-medium text-slate-200">
                          {tag.name}
                        </span>
                        {tag.image && (
                          <img 
                            src={tag.image} 
                            alt="" 
                            className='w-3.5 h-3.5 ml-1 rounded opacity-80' 
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicateur de scroll */}
        {currentProjects.length > 6 && (
          <div className="text-center text-white text-xs mt-4 opacity-60">
            {t('projects.scrollMessage')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;