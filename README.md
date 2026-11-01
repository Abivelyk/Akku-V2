# AKKÚ

A small, scroll-driven memory story made for one person. This version uses a quiet observatory setting, warm bronze photo frames, restrained motion, and the original photographs, films, letter, and soundtrack.

## Project files

- `index.html` — page structure, metadata, and story content
- `styles.css` — observatory theme, layout, and responsive styles
- `app.js` — Three.js gallery, video reel, soundtrack, lightbox, and live counter
- `assets/` — photographs, video clips, soundtrack, preview image, and generated backdrop

There is no build step. Serve the project folder over HTTP or publish its contents with the `assets/` directory at the same path.

## Story start date

Edit `STORY_START` in `app.js` to change the date used by the counter. The month value is zero-based (`5` means June).

## Share preview image

`og-cover.jpg` is the 1200 × 630 image used by the social sharing metadata.

## Live version

The currently published page is [abivelyk.github.io/Akku-V2](https://abivelyk.github.io/Akku-V2/). It is separate from this local project copy.
