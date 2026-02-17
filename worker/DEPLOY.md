# Redéployer le Worker

```bash
cd worker
npx wrangler deploy
```

## Changer le token GitHub

```bash
cd worker
npx wrangler secret put GITHUB_TOKEN
```

## Tester

```bash
curl https://github-stars-proxy.tcastillo.workers.dev/stars/theosorus/Argus
curl https://github-stars-proxy.tcastillo.workers.dev/stars/VeridisQuo-orga/VeridisQuo

```
