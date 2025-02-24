import projectsData from "../data/projects.json";
import { Project } from "../type";

export function useProjects(): Project[] {
  return projectsData.projects.slice(0, 10);
}