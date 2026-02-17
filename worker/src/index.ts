interface Env {
  GITHUB_TOKEN: string;
  ALLOWED_ORIGIN: string;
  CACHE_TTL_SECONDS: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return corsResponse(request, env, new Response(null, { status: 204 }));
    }

    const url = new URL(request.url);
    const match = url.pathname.match(/^\/stars\/([^/]+)\/([^/]+)$/);

    if (!match || request.method !== 'GET') {
      return corsResponse(
        request,
        env,
        new Response(JSON.stringify({ error: 'Not found. Use GET /stars/{owner}/{repo}' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    }

    const [, owner, repo] = match;

    // Check edge cache
    const cacheKey = new Request(`https://cache.internal/stars/${owner}/${repo}`);
    const cache = caches.default;
    const cached = await cache.match(cacheKey);

    if (cached) {
      return corsResponse(request, env, cached.clone());
    }

    // Fetch from GitHub API
    try {
      const ghResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'cloudflare-worker-github-stars-proxy',
        },
      });

      if (!ghResponse.ok) {
        return corsResponse(
          request,
          env,
          new Response(
            JSON.stringify({ error: 'GitHub API error', status: ghResponse.status }),
            { status: ghResponse.status, headers: { 'Content-Type': 'application/json' } },
          ),
        );
      }

      const data = (await ghResponse.json()) as { stargazers_count?: number };
      const stars = data.stargazers_count ?? 0;
      const ttl = parseInt(env.CACHE_TTL_SECONDS) || 600;

      const response = new Response(JSON.stringify({ stars }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `public, max-age=${ttl}`,
        },
      });

      ctx.waitUntil(cache.put(cacheKey, response.clone()));

      return corsResponse(request, env, response);
    } catch (err) {
      return corsResponse(
        request,
        env,
        new Response(JSON.stringify({ error: 'Internal error', message: String(err) }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    }
  },
};

function getAllowedOrigin(request: Request, env: Env): string {
  const origin = request.headers.get('Origin') || '';
  const allowed = [env.ALLOWED_ORIGIN, 'http://localhost:5173'];
  return allowed.includes(origin) ? origin : env.ALLOWED_ORIGIN;
}

function corsResponse(request: Request, env: Env, response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', getAllowedOrigin(request, env));
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Max-Age', '86400');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
