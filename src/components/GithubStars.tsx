import React from 'react';
import { useGithubStars } from '../hooks/useGithubStars';

interface GithubStarsProps {
  githubUrl: string | undefined;
  className?: string;
}

const GithubStars: React.FC<GithubStarsProps> = ({ githubUrl, className = '' }) => {
  const { stars, loading } = useGithubStars(githubUrl);

  if (!stars || stars === 0 || loading) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] leading-none text-fg-dim ${className}`}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <svg
        width="9"
        height="9"
        viewBox="0 0 16 16"
        className="fill-current"
        aria-hidden
      >
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
      </svg>
      <span>{stars.toLocaleString()}</span>
    </span>
  );
};

export default GithubStars;
