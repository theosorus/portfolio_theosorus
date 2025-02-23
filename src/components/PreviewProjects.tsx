import projectsData from '../data/projects_one.json'; // Adjust the path as necessary
import { Project } from '../type';

const PreviewProjects: React.FC = () => {

      return (
        <div className='w-3/4 justify-center'>
            {projectsData.projects.map((p: Project,idx) => (
            <div key={idx} className='flex mt-20 items-center'>
              <div className='bg-red-400 h-30 rounded-xl mr-[-100px] z-1'>
                <h1>{p.title}</h1>
              </div>
            
              <div className='z-0'>
              <img
                className="w-100 h-50 object-cover rounded-xl"
                src= {p.image}
                alt={p.title}
              />

              </div>
              
              
          </div>
          ))}
          </div>
    );

        
        
}
  export default PreviewProjects;