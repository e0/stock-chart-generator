# `stock-chart-generator`

Frontend for generating stock charts using [stock-chart-worker](https://github.com/e0/stock-chart-worker).

## Prerequisites

- [SvelteKit](https://kit.svelte.dev)
- [yarn](https://yarnpkg.com)

## Get started

1. Install dependencies: `yarn`
2. Add a `.env` file in the project root with the following line, replace `<API_URL>` with your own API URL from [stock-chart-worker](https://github.com/e0/stock-chart-worker).

```
VITE_API_URL=<API_URL>
```

3. Run in dev: `yarn dev`
4. For deployment, this project is designed to work with Cloudflare Pages. Follow [this guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site) for setup details.
