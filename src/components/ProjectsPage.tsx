import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import projectsData from '../data/projects.json';
import { Project } from '../type';
import GithubStars from './GithubStars';

const categories = ['All', 'Personal', 'School', 'AI', 'Simulations', 'Web', 'Software'];

const isGithubUrl = (url: string) => url.includes('github.com');

const Projects = () => {
  const [t] = useTranslation('global');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const currentProjects: Project[] =
    selectedCategory === 'All'
      ? (projectsData.projects as Project[])
      : (projectsData.projects as Project[]).filter((p) =>
          p.categories.includes(selectedCategory),
        );

  return (
    <section
      id="projects"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="max-w-3xl mx-auto md:mx-0">
        <h2
          className="text-2xl md:text-3xl mb-8"
          style={{ fontFamily: 'var(--font-domine)' }}
        >
          {t('projects.title')}
        </h2>
        <div className="border-t border-white/[0.10]" />

        <div
          className="pt-6 pb-8 flex flex-wrap gap-2 text-xs"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded border transition-colors ${
                selectedCategory === cat
                  ? 'text-accent bg-white/[0.06] border-accent/40'
                  : 'text-fg-dim bg-white/[0.02] border-white/[0.10] hover:text-fg-muted hover:border-white/[0.20]'
              }`}
            >
              {t(`projects.categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {currentProjects.map((project, index) => {
          const primaryUrl = project.links?.[0];
          const githubUrl = project.links?.find((l) => l && l !== 'none' && isGithubUrl(l));
          const demoUrl = project.links?.find(
            (l) => l && l !== 'none' && !isGithubUrl(l),
          );
          const tagNames = project.tags.map((tag) => tag.name);
          const cardLink = primaryUrl && primaryUrl !== 'none' ? primaryUrl : undefined;

          const card = (
            <article className="group h-full flex flex-col bg-white/[0.03] border border-white/[0.08] hover:border-accent/40 hover:bg-white/[0.05] rounded-md overflow-hidden transition-colors duration-300">
              <div className="relative overflow-hidden aspect-[16/9] bg-bg-elevated">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <div className="flex flex-col flex-1 px-4 py-4 gap-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm text-fg leading-tight font-medium truncate">
                    {t(`projects.${project.id}.title`)}
                  </h3>
                  <span
                    className="text-[10px] text-fg-dim flex-shrink-0"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {project.date}
                  </span>
                </div>

                <p className="text-xs text-fg-muted leading-relaxed line-clamp-3">
                  {t(`projects.${project.id}.description`)}
                </p>

                {tagNames.length > 0 && (
                  <p
                    className="text-[10px] text-fg-dim leading-snug line-clamp-1"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {tagNames.slice(0, 4).join(' · ')}
                  </p>
                )}

                <div
                  className="flex items-center gap-3 text-[10px] mt-auto pt-1.5"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-fg-dim hover:text-accent transition-colors"
                    >
                      github ↗
                    </a>
                  )}
                  {demoUrl && demoUrl !== githubUrl && (
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-fg-dim hover:text-accent transition-colors"
                    >
                      demo ↗
                    </a>
                  )}
                  {githubUrl && (
                    <GithubStars githubUrl={githubUrl} className="ml-auto" />
                  )}
                </div>
              </div>
            </article>
          );

          return cardLink ? (
            <a
              key={project.id || index}
              href={cardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {card}
            </a>
          ) : (
            <div key={project.id || index}>{card}</div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
