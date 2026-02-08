import { useEffect, useState } from 'react';

export const useGithubStars = (githubUrl: string | undefined) => {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!githubUrl || githubUrl === 'none' || !githubUrl.includes('github.com')) {
      setStars(null);
      return;
    }

    const fetchStars = async () => {
      setLoading(true);
      try {
        const cleanUrl = githubUrl.trim().replace(/\/$/, '');
        const match = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);

        if (!match) {
          setStars(null);
          setLoading(false);
          return;
        }

        const [, owner, repo] = match;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

        const token = import.meta.env.VITE_API_TOKEN_GITHUB;
        const headers: HeadersInit = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(apiUrl, { headers });

        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count || 0);
        } else {
          console.error(`GitHub API error for ${githubUrl}:`, response.status, response.statusText);
          setStars(null);
        }
      } catch (error) {
        console.error('Error fetching GitHub stars for', githubUrl, ':', error);
        setStars(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, [githubUrl]);

  return { stars, loading };
};
