import React from "react";
import { useProjects } from "../hooks/useProjects";
import { Project } from "../type";
import github from "../../public/icons/github.svg";
import { useTranslation } from "react-i18next";

const MinimizedProject: React.FC = () => {
  const projectsToSee = useProjects();
  const [t] = useTranslation('global');
  return (
    <div className="w-3/4 mx-auto max-w-[500px] ">
      {projectsToSee.map((p: Project, idx) => (
        <div
          key={idx}
          className="relative mb-6 flex justify-center bg-center bg-cover bg-no-repeat rounded-xl"
          style={{ backgroundImage: `url(${p.image})`, height: "400px" }}
        >
          <div className="absolute inset-0 bg-black opacity-70 rounded-xl" />
          <div className="relative p-4 text-white z-10">
            <h1 className="text-[#56dcfc]  mb-2">
              {p.date} • {t(`projects.types.${p.type}`)}
            </h1>
            <h1 className="text-2xl mb-2">{t(`projects.${p.id}.title`)}</h1>
            <p className="my-5">{t(`projects.${p.id}.description`)}</p>
            <div className="flex mb-3">
              {p.tags.map((tag, i) => (
                <a
                  href={tag.url}
                  key={i}
                  className="mr-2 text-paradise-blue hover:text-paradise-blue-dark"
                  target="_blank"
                >
                  {tag.name}
                </a>
              ))}
            </div>
            <div className="flex">
              <a className="github" href={p.links[1]} target="_blank">
              <img
                    className="w-7 h-7 fill-[rgb(181, 184, 192)] opacity-90 hover:opacity-100"
                    style={{ filter: "invert(100%)" }}
                    src={github}
                    alt="Github"
                  />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MinimizedProject;