# CrownOS image prompts (Sigma-style art direction)

The art direction follows sigmabrowser.com: near-black page (#040404). Imagery is either
(a) soft, defocused colour-mesh wallpapers that fade into near-black at one corner, or
(b) dark, tinted 3D squircle icons with a soft white "inflated" glyph.

The gradients are already built in CSS (`aurora`, `glow`, `icon-tile` in `src/styles/base.css`).
Generate these only to swap a CSS approximation for a richer raster. Export as WebP at quality 82
into `public/images/`.

**Shared style suffix.** Append it to every wallpaper prompt:

> Ultra-smooth defocused gradient, extreme gaussian blur, no hard edges, no objects, no text, no
> logos, no noise, no banding, subtle film grain only, photographic colour, 16-bit depth, the
> top-left corner falls off into deep blue-black #16151c, overall dark and premium, Apple
> wallpaper quality.

---

## 1. Hero backdrop: `public/images/aurora-dawn.webp` (2880×1800)

Replaces the `data-tone="dawn"` layer in `Hero.tsx`.

> Wide cinematic abstract wallpaper. The top 35% is pure black. Below it, a luminous aurora
> blooms upward from the bottom edge: electric cyan (#1fb0e6) pools on the lower left, melts into
> saturated indigo (#4a3fdc) at centre and into soft orchid violet (#9257d6) on the right. The light
> feels like stage light seen through frosted glass, brightest just under the centre where a
> laptop will sit, and the edges fade back to black. [shared style suffix]

## 2. Showcase wallpapers (Sigma "product card" backgrounds)

Each one replaces the `aurora` utility on its card in `Showcase.tsx`.

### 2a. `public/images/aurora-ember.webp` (2560×1100), wide spotlight card

> Panoramic abstract wallpaper, deep blue-black in the top-left third. A warm sunset bloom
> spreads diagonally: rose pink (#e2577a) glows in the lower left, burnt terracotta (#c9502f) in
> the centre, and it opens into a bright apricot orange (#eb9d4c) that fills the right edge. Soft
> like out-of-focus city lights at dusk. [shared style suffix]

### 2b. `public/images/aurora-iris.webp` (1250×1760), tall card

> Portrait abstract wallpaper. Blue-black at the top left. A violet haze (#9a5ae0) glows at the
> top right and flows down into rich indigo (#5a58e2) in the middle. A cool cyan (#26b6dc) pool
> sits in the lower left. Calm, nocturnal, luminous. [shared style suffix]

### 2c. `public/images/aurora-lagoon.webp` (1250×1760), tall card

> Portrait abstract wallpaper. Blue-black across the top quarter. Below it, a tropical lagoon
> glow: teal (#2fb3b8) along the left edge and a vivid emerald core (#3fd27a) in the lower centre,
> fading to deep sea teal (#1f9fb0) on the right. Like sunlight under shallow water, defocused.
> [shared style suffix]

## 3. Interactions wallpaper: `public/images/glass-tide.webp` (1440×1200)

This one CSS can't reproduce (it is Sigma's "advantages" background). Replaces the
`data-tone="tide"` aurora behind the four Interactions visuals.

> Abstract macOS-style 3D wallpaper. Smooth translucent glass ribbons sweep in a large S-curve
> from the lower left to the upper right, like a frozen ocean wave made of tinted glass. Pale
> sky blue (#8fd0ff) highlights run along the crests, saturated cobalt (#1f6fe0) fills the body
> and deep navy (#0b2a8f) shadows sit in the folds. Soft caustic light passes through the glass,
> with a gentle depth of field on the far ribbons. Clean studio lighting, no objects, no text,
> 3D render in the Octane/Redshift style, ultra smooth, premium.

## 4. Flip-card hero renders (Sigma "Stay protected" cards)

These sit at the bottom of each flip card, above the `glow` tint, in place of the SVG visual.
Use a transparent PNG at 1200×900, exported to WebP with alpha.

**Shared 3D style suffix:**

> Isometric-leaning front view, 3D render, soft studio lighting from the top, frosted
> glass and satin plastic materials, gentle subsurface glow, soft contact shadow, transparent
> background, centred with generous padding, no text, minimal, premium Apple keynote style.

### 4a. `public/images/card-config.webp`: violet tone, "One folder runs the whole system"

> A single rounded folder icon made of frosted violet glass, floating above a faint perspective
> grid of thin glowing purple lines (#8138ff), like a holographic floor. Three small paper sheets
> peek out of the folder, each with an embossed "{ }" bracket mark. A deep violet glow (#3b0099)
> rises from underneath. [shared 3D style suffix]

### 4b. `public/images/card-theme.webp`: crimson tone, "System apps that match your taste"

> A fan of five rounded colour-swatch cards made of satin glass, spread like a paint fan deck.
> The tones run from soft coral (#ff8a7a) through signal red (#ff3e3e) to deep oxblood (#932c2c),
> and the front swatch is pearl white. A soft red glow sits underneath. [shared 3D style suffix]

### 4c. `public/images/card-accessories.webp`: indigo tone, "Accessories that just work"

> A small matte graphite USB-C hub with a single braided cable that curves out of frame. Three
> tiny accessories orbit it: a drawing-tablet pen, a game controller and a webcam. Each is
> rendered in frosted cobalt glass (#1d47ff) with a soft indigo rim light (#4f1fae). Thin
> glowing connection arcs link each accessory to the hub. [shared 3D style suffix]

## 5. 3D icon tiles (Sigma flip-card and advantages icons)

These replace the CSS `icon-tile` + SVG glyph in `IconTile.tsx`. Export a 512×512 transparent
PNG to `public/icons/<key>.webp`. Generate all 11 in one session so they stay consistent.

**Base prompt** (replace `<GLYPH>` and `<TINT>`):

> A single app-icon tile, front-facing orthographic view. The tile is a rounded superellipse
> squircle with a dark matte body tinted <TINT>, a vertical gradient from slightly lighter at
> the top to near-black at the bottom, a crisp 1px bright bevel along the top edge, a soft
> darker bevel at the bottom and a faint outer rim. Centred on it is <GLYPH> as a puffy,
> inflated, soft-white (#f2f2f4) 3D shape with rounded edges, a subtle top highlight and soft
> ambient-occlusion shadow onto the tile. Minimal, no text, transparent background, 3D render,
> Apple SF Symbols proportions, premium.

| key      | `<GLYPH>`                                                   | `<TINT>` (card tone)       |
| -------- | ----------------------------------------------------------- | -------------------------- |
| folder   | a rounded folder with a tab                                 | violet-black #1e1530       |
| swatches | three fanned rounded colour swatches                        | warm oxblood-black #2a1616 |
| plug     | a USB-C plug with a short cable                             | indigo-black #151a33       |
| layout   | a window split into one tall and two stacked tiles          | graphite #1c1c20           |
| spring   | a coiled spring with a bounce arc                           | graphite #1c1c20           |
| tablet   | a tablet beside a laptop, both outlined                     | graphite #1c1c20           |
| server   | two stacked server units with dot indicators                | graphite #1c1c20           |
| shield   | a shield with a check mark cut out                          | graphite #1c1c20           |
| code     | angle brackets `< />`                                       | graphite #1c1c20           |
| link     | two interlocking chain links                                | graphite #1c1c20           |
| rewind   | a circular arrow turning counter-clockwise around a clock   | graphite #1c1c20           |

## 6. Download app icon: `public/images/crown-app-icon.webp` (512×512)

Replaces the CSS gradient tile in `Beta.tsx` (Sigma's footer app icon).

> A glossy app icon: a rounded superellipse squircle with a diagonal gradient from ice blue
> (#a1d2ff) at the top left through vivid azure (#148eff) to deep royal blue (#0852e7) at the
> bottom right, with a glassy specular highlight across the top third and a soft inner shadow.
> Centred on it is a stylised three-point crown mark as a flat white cut-out with a very subtle
> emboss. Soft blue glow beneath, transparent background, 3D render, Apple app icon quality.

## 7. Footer band: `public/images/aurora-dusk.webp` (2880×900)

Replaces the `data-tone="dusk"` aurora behind the CrownOS wordmark.

> Ultra-wide abstract wallpaper. Black on the far left fades into a deep royal blue band
> (#1d7fe8) across the lower left, rich indigo (#3b4fe0) at centre and a soft lavender violet
> glow (#7b52d6) rising in the upper right. Like the last light of dusk over the sea, seen
> through frosted glass. [shared style suffix]

---

**Not generated on purpose:** the UI inside the cards (plugin sandbox, device mesh, migration,
etc.) stays as live SVG. Sigma uses real product screenshots there, so swap in real CrownOS
screenshots once the desktop exists. A generated fake UI would undercut the product.
