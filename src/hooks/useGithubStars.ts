import { useEffect, useState } from 'react';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const CACHE_PREFIX = 'gh_stars_';

const getCached = (key: string): number | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { stars, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return stars;
  } catch {
    return null;
  }
};

const setCached = (key: string, stars: number) => {
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ stars, ts: Date.now() }));
  } catch { /* sessionStorage full or unavailable */ }
};

export const useGithubStars = (githubUrl: string | undefined) => {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!githubUrl || githubUrl === 'none' || !githubUrl.includes('github.com')) {
      setStars(null);
      return;
    }

    const cleanUrl = githubUrl.trim().replace(/\/$/, '');
    const match = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
    if (!match) {
      setStars(null);
      return;
    }

    const [, owner, repo] = match;
    const cacheKey = `${owner}/${repo}`;

    const cached = getCached(cacheKey);
    if (cached !== null) {
      setStars(cached);
      return;
    }

    const fetchStars = async () => {
      setLoading(true);
      try {
        const apiUrl = `https://api.github.com/repos/${cacheKey}`;
        const token = import.meta.env.VITE_API_TOKEN_GITHUB;
        const headers: HeadersInit = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(apiUrl, { headers });

        if (response.ok) {
          const data = await response.json();
          const count = data.stargazers_count || 0;
          setCached(cacheKey, count);
          setStars(count);
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
