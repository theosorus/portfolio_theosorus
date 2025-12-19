import { useEffect, useState } from 'react';

interface GitHubStarsCache {
  [repoUrl: string]: number;
}

const starsCache: GitHubStarsCache = {};
let requestQueue: Array<() => void> = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  const nextRequest = requestQueue.shift();

  if (nextRequest) {
    nextRequest();
    // Attendre 100ms entre chaque requête pour éviter le rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  isProcessing = false;
  processQueue();
};

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
        // Extraire owner et repo de l'URL GitHub (nettoyer l'URL)
        const cleanUrl = githubUrl.trim().replace(/\/$/, '');
        const match = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);

        if (!match) {
          console.error('Invalid GitHub URL:', githubUrl);
          setStars(null);
          setLoading(false);
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
          console.error(`GitHub API error for ${githubUrl}:`, response.status, response.statusText);
          // En cas d'erreur, mettre 0 en cache pour éviter les requêtes répétées
          starsCache[githubUrl] = 0;
          setStars(null);
        }
      } catch (error) {
        console.error('Error fetching GitHub stars for', githubUrl, ':', error);
        // En cas d'erreur, mettre 0 en cache
        starsCache[githubUrl] = 0;
        setStars(null);
      } finally {
        setLoading(false);
      }
    };

    // Ajouter la requête à la file d'attente
    requestQueue.push(fetchStars);
    processQueue();
  }, [githubUrl]);

  return { stars, loading };
};
