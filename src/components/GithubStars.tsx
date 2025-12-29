import React from 'react';
import { useGithubStars } from '../hooks/useGithubStars';
import github from '../icons/github.svg';

interface GithubStarsProps {
  githubUrl: string | undefined;
  className?: string;
}

const GithubStars: React.FC<GithubStarsProps> = ({ githubUrl, className = '' }) => {
  const { stars, loading } = useGithubStars(githubUrl);

  // Ne rien afficher si pas de stars ou si stars = 0
  if (!stars || stars === 0 || loading) {
    return null;
  }

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 bg-slate-900/70 backdrop-blur-sm rounded-md border border-slate-800/50 transition-all duration-200 hover:bg-slate-800/80 hover:border-slate-700/60 ${className}`}>
      <img
        src={github}
        alt="GitHub"
        className="w-3 h-3 opacity-80"
        style={{ filter: "invert(100%)" }}
      />
      <svg
        className="w-3 h-3 fill-yellow-400"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
      </svg>
      <span className="text-[10px] font-medium text-slate-100">{stars.toLocaleString()}</span>
    </div>
  );
};

export default GithubStars;
