import React from 'react';
import { Project } from '../type';

interface ViewProjectProps {
  project: Project;
  featured?: boolean;
  inverted?: boolean;
}

const ViewProject: React.FC<ViewProjectProps> = ({ project, featured, inverted }) => {
  if (featured) {
    return (
      <div
        className="in_animation project"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="project_text">
          <div className="type">
            <span>{project.type}</span>
            <span>•</span>
            <span>{project.date}</span>
          </div>
          <a
            className="project_title"
            href={project.links[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.title}
          </a>
          <div className="text">
            <p>{project.description}</p>
          </div>
          <div className="tags">
            {project.tags.map((tag, index) => (
              <a key={index} href={tag.url} target="_blank" rel="noopener noreferrer">
                {tag.name}
              </a>
            ))}
          </div>
          <div className="links">
            {project.links[1] !== 'none' && (
              <a
                className="github"
                href={project.links[1]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31">
                  <g>
                    <path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47" />
                    <path d="M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19" />
                  </g>
                </svg>
                <span className="bubble">See the code</span>
              </a>
            )}
            {project.links[2] !== 'none' && (
              <a
                className="test"
                href={project.links[2]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.09 18.64">
                  <g>
                    <path d="M14.55 7.52L4.62 1.78A2.08 2.08 0 0 0 1.5 3.58V15.05a2.08 2.08 0 0 0 3.12 1.8l9.93-5.73A2.08 2.08 0 0 0 14.55 7.52Z" />
                  </g>
                </svg>
                <span className="bubble">Test the program</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="in_animation other_project">
        <div className="other_project_content">
          <div className="header">
            <div className="logos">
              <img
                src={project.logo}
                alt={`${project.title.toLowerCase()} logo`}
                width="45px"
                height="45px"
              />
              <div className="links">
                {project.links[1] !== 'none' && (
                  <a
                    className="github"
                    href={project.links[1]}
                    aria-label="github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31">
                      <g>
                        <path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47" />
                        <path d="M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19" />
                      </g>
                    </svg>
                  </a>
                )}
                {project.links[2] !== 'none' && (
                  <a
                    className="test"
                    href={project.links[2]}
                    aria-label="test"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.09 18.64">
                      <g>
                        <path d="M14.55 7.52L4.62 1.78A2.08 2.08 0 0 0 1.5 3.58V15.05a2.08 2.08 0 0 0 3.12 1.8l9.93-5.73A2.08 2.08 0 0 0 14.55 7.52Z" />
                      </g>
                    </svg>
                  </a>
                )}
              </div>
            </div>
            <a
              className="project_title"
              href={project.links[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
            </a>
            <p className="text">{project.description}</p>
          </div>
          <div className="tags">
            {project.tags.map((tag, index) => (
              <span key={index}>{tag.name}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default ViewProject;