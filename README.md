# crownos-website

The landing page for [CrownOS](https://github.com/Crown-OS) — an Arch-based,
Wayland-native Linux distribution with a Rust desktop shell.

## Stack

| | |
|---|---|
| Framework | Next.js 16, App Router |
| React | 19, with the React Compiler enabled |
| Styling | Tailwind CSS v4 — `@import "tailwindcss"` plus `@theme` tokens |
| Lint / format | [Biome](https://biomejs.dev/) 2.2. No ESLint, no Prettier. |
| Package manager | **Bun** |

## Getting started

```bash
bun install
bun run dev       # http://localhost:3000
```

Bun is the project's package manager and `bun.lock` is the committed lockfile.
npm and pnpm work fine — `npm install && npm run build` produces the same site —
but they write a competing lockfile, so do not commit one.

> `bun.lock` records the workspace name as `crowncrate-website` while
> `package.json` says `crownos-website`. Harmless, but it should be regenerated.

```bash
bun run lint      # biome check
bun run format    # biome format --write
bun run build     # next build — also type-checks
```

There is no `check-types` script and no test framework. Type errors surface
through `bun run build`.

## Deployment

**There is none configured.** `next.config.ts` sets only `reactCompiler: true` —
no `output: "export"`, no adapter, no CI. Every route already prerenders as
static HTML, so adding the export line would be a one-line change and the `out/`
directory could go straight onto any static host.

There is also an **unmerged `cloudflare/workers-autoconfig` branch** carrying a
real deploy story that nothing else mentions: `open-next.config.ts`,
`wrangler.jsonc`, `public/_headers`, and `preview`/`deploy`/`upload` scripts
built on `@opennextjs/cloudflare`. It is one commit ahead of `main`. Decide
between that and static export rather than inventing a third path.

## Structure

```
src/
  app/
    page.tsx            /
    changelog/  community/  docs/  download/  features/
    globals.css         Tailwind v4 tokens, monochromatic palette
  components/
    landing/            Navbar, HeroSection, MarqueeSection, PrinciplesSection,
                        AIShowcaseSection, EcosystemSection, ArchitectureSection,
                        TestimonialsSection, FAQSection, DownloadSection, Footer
    icons.tsx
  data/
    landing-page.ts     ecosystemFeatures, principles, heroMetrics, marqueeItems
```

Content is data-driven from `src/data/landing-page.ts`. For copy changes, edit
the data rather than the components.

The palette lives as tokens in `globals.css` — pitch `#050505` through a grey
scale, `--color-accent: #ffffff`, with a light-theme override under
`prefers-color-scheme`.

## Design language

Read [`AGENTS.md`](AGENTS.md) before making visual changes. In short: a
monochromatic, minimalistic, professional look; smooth transitions and parallax
between sections; a consistent language across every page.

Biome config notes: 2-space indent, recommended rules plus the `next` and `react`
domains, import organisation on, and `suspicious.noUnknownAtRules` disabled
because Tailwind v4 uses `@theme` and `@apply`.

## ⚠ Content accuracy

Much of the current copy is placeholder and **contradicts the actual software**.
If you are working on this site, these are known and worth fixing rather than
propagating:

| The site says | Reality |
|---|---|
| "TOML profiles" | Configuration is **RON** |
| "Hyprcrown" compositor | The compositor is [`crownpositor`](https://github.com/Crown-OS/crownpositor) |
| A `crownos` CLI (`sync`, `snapshot`, `rollback`, `pair`, `ask`) | No such binary exists in any repository |
| btrfs/snapper rollback, ggml/ONNX runtime, BORE-EEVDF scheduler | None ship in the ISO profile |
| Three ISO editions, five download mirrors | The profile builds one unbranded x86_64 Arch rescue image; no mirrors exist |
| "12.4k GitHub stars", "8.2k Discord members", "320+ contributors" | Placeholder values |

### The `/docs` route

`src/app/docs/page.tsx` renders eight cards with four sub-links each — and **all
32 links point back at `/docs`**. The "Open the SDK reference" CTA does too.

Real documentation now lives in
[the CrownOS documentation](https://github.com/Crown-OS/crownOs/tree/main/docs).
Wiring `/docs` to it is worthwhile work.

## Contributing

See the organization-wide
[contribution guide](https://github.com/Crown-OS/crownOs/blob/main/CONTRIBUTING.md).
Default branch here is **`main`**; use the `website` commit scope.

## License

Licensed under the [MIT License](LICENSE).
