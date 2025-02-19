import projectsData from '../data/projects.json';

interface Project {
  date: number;
  type: string;
  title: string;
  description: string;
  tags: { name: string; url: string; image: string }[];
  links: string[];
  image: string;
  categories: string[];
}

const Projects = () => {
  return (
    <div className="w-3/4 flex flex-wrap justify-center mt-10 gap-6">
      {projectsData.projects.map((project: Project, index) => (
        <div
          key={index}
          className="max-w-75 rounded overflow-hidden shadow-lg transform transition-transform duration-100 hover:scale-101 text-gray-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
        >
          <img
            className="w-full h-40 object-cover"
            src={project.image}
            alt={project.title}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{project.title} </div>
            <p className=" text-base">
              {project.description}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
                <div key={idx} className='flex bg-gray-200 rounded-full px-3 py-1'>
                <span className="inline-block text-sm font-semibold text-gray-700">
                  {tag.name}
                </span>
                {tag.image && <img src={tag.image} alt="" className='w-5 h-5 ml-1' />}
                </div>

            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;

