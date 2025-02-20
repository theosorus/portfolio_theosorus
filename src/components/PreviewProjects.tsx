import projectsData from '../data/projects.json'; // Adjust the path as necessary
import { Project } from '../type';
import ViewProject from './ViewProject';

const PreviewProjects: React.FC = () => {

      return (
        <div>
            {projectsData.projects.map((p: Project) => (
            <ViewProject key={p.id} project={p} />
          ))}
          </div>
    );

        
        
}
  export default PreviewProjects;