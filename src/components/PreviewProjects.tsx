import projectsData from "../data/projects.json"; // Adjust the path as necessary
import { Project } from "../type";

const PreviewProjects: React.FC = () => {
  const projectsToSee = projectsData.projects.slice(0, 10);

  return (
    <div className="w-1/2 justify-center">
      {projectsToSee.map((p: Project, idx) => {
        const isEven = idx % 2 === 0;

        return (
          <div
            key={idx}
            className={`flex mt-20 items-center justify-center ${
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
                {p.date} • {p.type}
              </h1>
              <h1 className="text-2xl mb-2">{p.title}</h1>
              <div className="bg-[rgb(41,41,85)] p-4 rounded-xl shadow-[0px_0px_20px_rgba(0,0,0,0.4)] mb-2">
                <p>{p.description}</p>
              </div>
              <div className={`flex mb-2 ${isEven ? "justify-start" : "justify-end"}`}>
                {p.tags.map((t, idx) => (
                  <a href={t.url} key={idx} className="mr-2 text-[#56dcfc]">
                    {t.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="z-0 w-1/2">
              <img
                className="w-full h-50 object-cover rounded-xl"
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

export default PreviewProjects;