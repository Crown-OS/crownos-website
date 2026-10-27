# CrownOS Website

This repository contains the landing page for CrownOS, an open source and AI ready Linux distribution based on Arch Linux. The site also hosts a catalog of plugins and themes.

## Requirements

You need [Bun](https://bun.sh) to install dependencies and run the scripts.

## Development

Install the dependencies and start the development server.

```bash
bun install
bun dev
```

The site will be available at http://localhost:3000.

## Building and Deploying

The site is built as a static export into the `out` directory and served by Cloudflare Workers.

```bash
bun run build
bun run preview
bun run deploy
```

The `preview` command serves the build locally through Wrangler, and the `deploy` command publishes it.

## Content

Plugins and themes are written as MDX files in `src/content/plugins` and `src/content/themes`. Each file becomes its own page in the catalog.

## Assets

The hero frame sequence and device images are encoded from the sources in `assets-src`.

```bash
bun run frames
bun run devices
```

## Code Quality

The project uses Biome for linting and formatting.

```bash
bun run lint
bun run format
```
