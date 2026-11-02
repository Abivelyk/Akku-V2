# AKKÚ · A 3D Scroll Story

A small universe, made for one person. A scroll-driven 3D story built with Three.js:

- **26 photographs** (`assets/p01.jpg` – `p26.jpg`) floating as glass frames; tap any to view up close
- **8 short films** in a private screening room (`v02`, `v03`, `clip02`, `clip03`, `clip04`, `clip06`, `clip07`, `clip08`)
- **"Jaavedaan Hai"** as the background soundtrack (`assets/audio_3.mp3`), auto-pausing while a clip plays
- **A letter** with four "open when…" envelopes
- **A live counter** that counts up from **24 June 2026**

Live site: https://abivelyk.github.io/Akku-V2/

## Changing the start date
In `index.html`, find `STORY_START` and edit the `new Date(year, month, day)` line
(months are 0-based: January = 0, June = 5).

## Link preview
`assets/og-cover.jpg` (1200×630) is the card shown when the link is shared on WhatsApp, Instagram, etc.

## Graphics
Physically based rendering on Three.js r128: bevelled rose-gold frames with glass sheen, a real mirror reflection on
veined black-marble slabs, a procedural sky (stars, Milky Way, moon), GPU fireflies with depth-of-field bokeh, light
shafts, and an HDR post chain (bloom, filmic tone-mapping, vignette, grain).
Quality adapts automatically (high → med → low) if a device can't hold ~30 fps. To force a tier, add `?q=high`, `?q=med`
or `?q=low` to the URL.

## Deploying
Upload `index.html` and the `assets/` folder to the root of the `abivelyk/Akku-V2` repository.
GitHub Pages will publish it at the URL above.
