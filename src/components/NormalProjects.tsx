import React from "react";
import { useProjects } from "../hooks/useProjects";
import { Project } from "../type";
import github from "../../public/icons/github.svg";
import { useTranslation } from "react-i18next";

const NormalProjects: React.FC = () => {
  const projectsToSee = useProjects();
  const [t] = useTranslation('global');
  return (
    <div className="w-4/5 justify-center max-w-[1100px]">
      {projectsToSee.map((p: Project, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`flex items-center justify-center my-20 ${
              isEven ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div
              className={`rounded-xl z-1 gap-3 w-1/2 ${
                isEven
                  ? "mr-[-100px] justify-start text-left"
                  : "ml-[-100px] justify-end text-right"
              }`}
            >
              <h1 className="text-[#56dcfc] mb-2">
                {p.date} • {t(`projects.types.${p.type}`)}
              </h1>
              <h1 className="text-2xl mb-2">{t(`projects.${p.id}.title`)}</h1>
              <div className="bg-[rgb(41,41,85)] p-4 rounded-xl shadow-[0px_0px_20px_rgba(0,0,0,0.4)] mb-2">
                <p>{t(`projects.${p.id}.description`)}</p>
              </div>
              <div
                className={`flex mb-2 ${
                  isEven ? "justify-start" : "justify-end"
                }`}
              >
                {p.tags.map((tag, idx) => (
                  <a href={tag.url} key={idx} className="mr-2 text-[#56dcfc] hover:text-[#56dbfccb]" target="_blank">
                    {tag.name}
                  </a>
                ))}
              </div>
              <div className={`flex ${isEven ? "justify-start" : "justify-end"}`}>
              <a className="github " href={p.links[1]} target="_blank">
                  <img
                    className="w-7 h-7 fill-[rgb(181, 184, 192)] opacity-70 hover:opacity-90"
                    style={{ filter: "invert(100%)" }}
                    src={github}
                    alt="Github"
                  />
                </a>
              </div>
            </div>
            <div className="z-0 w-1/2">
              <img
                className="w-300 h-55 object-cover rounded-xl"
                src={p.image}
                alt={p.title}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NormalProjects;