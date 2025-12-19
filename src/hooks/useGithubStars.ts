import { useEffect, useState } from 'react';

interface GitHubStarsCache {
  [repoUrl: string]: {
    stars: number | null;
    timestamp: number;
  };
}

const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 heure en millisecondes
const CACHE_KEY = 'github_stars_cache';

// Charger le cache depuis localStorage
const loadCache = (): GitHubStarsCache => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error('Error loading cache from localStorage:', error);
  }
  return {};
};

// Sauvegarder le cache dans localStorage
const saveCache = (cache: GitHubStarsCache) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error saving cache to localStorage:', error);
  }
};

const starsCache: GitHubStarsCache = loadCache();
let requestQueue: Array<() => void> = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  const nextRequest = requestQueue.shift();

  if (nextRequest) {
    nextRequest();
    // Attendre 500ms entre chaque requête pour éviter le rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
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

    // Vérifier le cache avec expiration
    const cached = starsCache[githubUrl];
    if (cached !== undefined) {
      const now = Date.now();
      const age = now - cached.timestamp;

      // Si le cache est encore valide (moins de 12h)
      if (age < CACHE_DURATION) {
        setStars(cached.stars);
        return;
      } else {
        // Cache expiré, on le supprime
        delete starsCache[githubUrl];
        saveCache(starsCache);
      }
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

        // Utiliser le token GitHub si disponible
        const token = import.meta.env.VITE_API_TOKEN_GITHUB;
        const headers: HeadersInit = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(apiUrl, { headers });

        if (response.ok) {
          const data = await response.json();
          const starCount = data.stargazers_count || 0;

          // Mettre en cache avec timestamp
          starsCache[githubUrl] = {
            stars: starCount,
            timestamp: Date.now()
          };
          saveCache(starsCache);
          setStars(starCount);
        } else {
          console.error(`GitHub API error for ${githubUrl}:`, response.status, response.statusText);
          // En cas d'erreur, mettre null en cache pour éviter les requêtes répétées pendant 12h
          starsCache[githubUrl] = {
            stars: null,
            timestamp: Date.now()
          };
          saveCache(starsCache);
          setStars(null);
        }
      } catch (error) {
        console.error('Error fetching GitHub stars for', githubUrl, ':', error);
        // En cas d'erreur, mettre null en cache
        starsCache[githubUrl] = {
          stars: null,
          timestamp: Date.now()
        };
        saveCache(starsCache);
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
