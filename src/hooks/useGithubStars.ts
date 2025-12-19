import { useEffect, useState } from 'react';

interface GitHubStarsCache {
  [repoUrl: string]: number;
}

const starsCache: GitHubStarsCache = {};

export const useGithubStars = (githubUrl: string | undefined) => {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!githubUrl || githubUrl === 'none' || !githubUrl.includes('github.com')) {
      setStars(null);
      return;
    }

    // Vérifier le cache
    if (starsCache[githubUrl] !== undefined) {
      setStars(starsCache[githubUrl]);
      return;
    }

    const fetchStars = async () => {
      setLoading(true);
      try {
        // Extraire owner et repo de l'URL GitHub
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
          setStars(null);
          return;
        }

        const [, owner, repo] = match;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const starCount = data.stargazers_count || 0;

          // Mettre en cache
          starsCache[githubUrl] = starCount;
          setStars(starCount);
        } else {
          setStars(null);
        }
      } catch (error) {
        console.error('Error fetching GitHub stars:', error);
        setStars(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, [githubUrl]);

  return { stars, loading };
};
