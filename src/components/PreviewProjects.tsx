import projectsData from "../data/projects.json"; // Adjust the path as necessary
import { Project } from "../type";
import github from "../../public/icons/github.svg";

const PreviewProjects: React.FC = () => {
  const projectsToSee = projectsData.projects.slice(0, 10);

  return (
    <div className="w-3/4 justify-center max-w-[1000px]">
      {projectsToSee.map((p: Project, idx) => {


        return (
          <div className="w-100 h-100 bg-cover bg-center bg-no-repeat justify-center"
            style={{ backgroundImage: `url(${p.image})` ,  opacity:1}}
          >

<h1 className="text-[#56dcfc] mb-2">
                {p.date} • {p.type}
              </h1>
              <h1 className="text-2xl mb-2">{p.title}</h1>
              <div className="">
                <p>{p.description}</p>
              </div>
              <div className={`flex mb-2`}>
                {p.tags.map((t, idx) => (
                  <a href={t.url} key={idx} className="mr-2 text-[#56dcfc]" target="_blank">
                    {t.name}
                  </a>
                ))}
              </div>
              <div className={`flex`}>
              <a className="github" href={p.links[1]} target="_blank"> 
                <img className="w-7 h-7" src={github} alt="GitHub" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewProjects;

