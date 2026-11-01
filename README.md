# AKKÚ · The Private 3D Gallery

A personal memory museum built around a warm, marble rotunda. The gallery combines a real-time Three.js scene with a set of interactive rooms and the original photos, films, letter, and soundtrack.

## Rooms and features

- Seven rooms: Home, Memories, Cinema, Letter, Museum, Sparks, and Forever
- Twenty-six walnut-and-brass framed photos arranged around the rotunda
- Four gallery layouts, drag-to-look controls, scroll-to-walk zoom, and an optional guided tour
- A film room with eight clips, plus a soundtrack control
- A wax-sealed letter, five open-when notes, curator plaques, and memory games
- Optional photo, video, and music uploads that stay in the current browser session

## Files

- `index.html` — room markup, navigation, and page metadata
- `styles.css` — museum styling and responsive layouts
- `app.js` — Three.js architecture, controls, rooms, and interactions
- `assets/` — photographs, films, soundtrack, and video posters
- `og-cover.jpg` — social sharing preview image

There is no build step. Serve the project folder over HTTP, with `assets/` alongside `index.html`, or publish the folder contents to GitHub Pages.

## Performance notes

Artwork textures load in small batches instead of opening 26 image requests at once. Smaller screens use a lower WebGL pixel ratio, skip the mirrored frame copies, and use fewer concurrent image loads. Animation pauses while the page is hidden.

## Live version

[abivelyk.github.io/Akku-V2](https://abivelyk.github.io/Akku-V2/)