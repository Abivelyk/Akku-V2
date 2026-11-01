(function () {
      const ASSET_BASE = new URL('./assets/', document.baseURI);
      const isCompactDevice = window.matchMedia('(max-width: 760px)').matches;

      function assetUrl(file) {
        if (!file) return '';
        if (/^(blob:|data:|https?:)/i.test(file)) return file;
        return new URL(file, ASSET_BASE).href;
      }

      const artworkImageQueue = [];
      let artworkImagesLoading = 0;
      function pumpArtworkImageQueue() {
        const maxConcurrent = isCompactDevice ? 2 : 4;
        while (artworkImagesLoading < maxConcurrent && artworkImageQueue.length) {
          const task = artworkImageQueue.shift();
          const image = new Image();
          image.crossOrigin = 'anonymous';
          artworkImagesLoading++;
          image.onload = () => {
            try { task.onLoad(image); }
            finally { artworkImagesLoading--; pumpArtworkImageQueue(); }
          };
          image.onerror = () => { artworkImagesLoading--; pumpArtworkImageQueue(); };
          image.src = task.url;
        }
      }
      function queueArtworkImage(url, onLoad) {
        artworkImageQueue.push({ url, onLoad });
        pumpArtworkImageQueue();
      }
      const PHOTOS = [
        { id: 1, file: 'p01.jpg', title: '01: The first little universe', note: 'Where the archive begins — one frame that quietly changed the gravity of ordinary days.' },
        { id: 2, file: 'p02.jpg', title: '02: Quiet light', note: 'Soft light that did not need to try hard to make everything around it calmer.' },
        { id: 3, file: 'p03.jpg', title: '03: One of those days', note: 'The kind of day that looks simple on the calendar and stays forever in your head.' },
        { id: 4, file: 'p04.jpg', title: '04: A soft moment', note: 'Unrushed, unscripted, and gentler than everything else happening that week.' },
        { id: 5, file: 'p05.jpg', title: '05: The kind worth keeping', note: 'If memories had a shelf, this one would sit right at eye level.' },
        { id: 6, file: 'p06.jpg', title: '06: A frame that stayed', note: 'Long after the moment passed, the feeling of this frame refused to fade.' },
        { id: 7, file: 'p07.jpg', title: '07: A tiny piece of summer', note: 'Warmth stored away for whenever the evenings turn a little too cold.' },
        { id: 8, file: 'p08.jpg', title: '08: A little chaos', note: 'Because the best laughs always arrive right in the middle of unscripted chaos.' },
        { id: 9, file: 'p09.jpg', title: '09: A memory in focus', note: 'Everything in the background blurs out; only the warmth stays sharp.' },
        { id: 10, file: 'p10.jpg', title: '10: The face behind the feeling', note: 'FOR YOU · ALWAYS. The exact expression that turns a normal hour into a favorite one.' },
        { id: 11, file: 'p11.jpg', title: '11: A day I would replay', note: 'No edits, no fast-forwarding — just pressing replay from the very first minute.' },
        { id: 12, file: 'p12.jpg', title: '12: Warmth, somehow', note: 'Even through a screen, some photographs carry their own temperature.' },
        { id: 13, file: 'p13.jpg', title: '13: Another ordinary miracle', note: 'Proof that magic is mostly just two people paying attention to the small things.' },
        { id: 14, file: 'p14.jpg', title: '14: A picture with a heartbeat', note: 'Still on the outside, completely alive if you know the story behind it.' },
        { id: 15, file: 'p15.jpg', title: '15: The details matter', note: 'The little expressions in the corner of a second that nobody else noticed.' },
        { id: 16, file: 'p16.jpg', title: '16: Nothing loud, just real', note: 'No grand announcement needed — honesty always looks better in quiet light.' },
        { id: 17, file: 'p17.jpg', title: '17: The smile that wins', note: 'Every single argument with a bad mood loses the second this smile shows up.' },
        { id: 18, file: 'p18.jpg', title: '18: A frame for later', note: 'Tucked into the archive for future us to open and smile at.' },
        { id: 19, file: 'p19.jpg', title: '19: The calm between things', note: 'A deep breath captured in the middle of a fast-moving world.' },
        { id: 20, file: 'p20.jpg', title: '20: This one feels like home', note: 'Home is rarely a building; most of the time it looks a lot like this.' },
        { id: 21, file: 'p21.jpg', title: '21: A little closer', note: 'When the distance disappears and the conversation doesn’t need words.' },
        { id: 22, file: 'p22.jpg', title: '22: A day worth remembering', note: 'Marked with a glowing pin on the map of everything good.' },
        { id: 23, file: 'p23.jpg', title: '23: The part I kept', note: 'Out of a thousand fleeting minutes, this is the one that stayed behind.' },
        { id: 24, file: 'p24.jpg', title: '24: The softest proof', note: 'Gentle evidence that what we shared was real, unforced, and rare.' },
        { id: 25, file: 'p25.jpg', title: '25: Saved for forever', note: '“I was so wrong not to doubt your Medellin, tangerine dreams.”', overlay: 'I was so wrong not to doubt your Medellin, tangerine dreams' },
        { id: 26, file: 'p26.jpg', title: '26: The last photograph', note: 'The last frame in the gallery, and the doorway back to the very beginning.' }
      ];

      const OPEN_WHEN_ENVELOPES = [
        {
          label: 'Open when you need a smile',
          title: 'When you need a quick smile',
          img: 'p17.jpg',
          body: 'Remember the jokes that made zero sense to anyone else on earth and still had us laughing until we couldn’t breathe? That version of you is my favorite thing in the universe.'
        },
        {
          label: 'Open when it’s late at night',
          title: 'For the quiet 2 AM hours',
          img: 'p19.jpg',
          body: 'The late-night conversations that wandered everywhere and nowhere somehow made the night smaller. Close your eyes knowing you are deeply cared for.'
        },
        {
          label: 'Open when today felt heavy',
          title: 'When the day took too much out of you',
          img: 'p04.jpg',
          body: 'You don’t have to fix everything tonight. Take a slow breath, let "Jaavedaan Hai" play softly, and remember that you are allowed to just rest.'
        },
        {
          label: 'Open when you miss our talks',
          title: 'Whenever the silence feels loud',
          img: 'p20.jpg',
          body: 'Some connections don’t fade when the room goes quiet. Every random check-in and shared look is safely stored right here.'
        },
        {
          label: 'Open when you doubt yourself',
          title: 'Look at how much light you carry',
          img: 'p10.jpg',
          body: 'Someone built an entire seven-wing 3D architectural gallery just because ordinary words weren’t big enough for you. Never forget how rare your heart is.'
        },
        {
          label: 'Open for a tangerine dream',
          title: 'Saved for forever',
          img: 'p25.jpg',
          body: '“I was so wrong not to doubt your Medellin, tangerine dreams.” Keep the ordinary details and let the good parts stay good.'
        }
      ];

      const JAR_REASONS = [
        '“Because even the quietest five minutes with you feel warmer than a whole crowded room.”',
        '“Because our inside jokes make zero sense to anyone else and yet they are the funniest things alive.”',
        '“Because you made ordinary days glow without even realizing you were doing it.”',
        '“Because listening properly and showing up gently is rarer than any grand gesture.”',
        '“Because Frame 17 — the smile that wins — really does win every single time.”',
        '“Because late-night conversations with you always made the night feel smaller and kinder.”',
        '“Because learning the shape of your heart slowly and imperfectly was worth every second.”',
        '“Because a normal paragraph felt too small for you, so only a private 3D museum would do.”'
      ];

      const CONSTELLATION_NOTES = [
        'Curator Note 01 · “The first little universe — where ordinary minutes began turning into gold.”',
        'Curator Note 02 · “The jokes that made absolutely no sense and became unforgettable.”',
        'Curator Note 03 · “Jaavedaan Hai playing softly while the gallery slows down.”',
        'Curator Note 04 · “I was so wrong not to doubt your Medellin, tangerine dreams.”',
        'Curator Note 05 · “Listening properly. Being gentle. Showing up consistently.”',
        'Curator Note 06 · “The late-night conversations that wandered everywhere and nowhere.”',
        'Curator Note 07 · “Thank you for being real with me — the last door is another beginning.”'
      ];

      function loadSaved(key, fallback) {
        try {
          const raw = localStorage.getItem('akku_v2_' + key);
          return raw ? JSON.parse(raw) : fallback;
        } catch (err) {
          return fallback;
        }
      }
      function saveState(key, val) {
        try {
          localStorage.setItem('akku_v2_' + key, JSON.stringify(val));
        } catch (err) {}
      }

      let favorites = new Set(loadSaved('favorites', [1, 10, 17, 25]));
      let currentFilter = 'all';
      let currentLayout = 'grid';
      let photoOrder = PHOTOS.map(p => p.id);
      let lightboxIndex = 0;
      let slideshowInterval = null;
      let chimesEnabled = true;
      let musicWasPlayingBeforeVideo = false;
      let discoveredStars = new Set(loadSaved('stars', []));
      let capsuleNotes = loadSaved('capsule_notes', [
        { text: '“The little minutes became the memories. Somehow, that was the whole point.”', date: 'Archive Seed' }
      ]);

      // Set initial static images to use inline base64 immediately
      document.getElementById('vinylThumb').src = assetUrl('p01.jpg');
      document.getElementById('letterPortraitImg').src = assetUrl('p10.jpg');
      document.getElementById('scratchPrizeBg').style.backgroundImage =
        `linear-gradient(to top, rgba(9,8,15,0.92), rgba(9,8,15,0.25)), url('${assetUrl('p25.jpg')}')`;

      let audioCtx = null;
      function playChime(type) {
        if (!chimesEnabled) return;
        try {
          if (!audioCtx) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return;
            audioCtx = new Ctx();
          }
          if (audioCtx.state === 'suspended') audioCtx.resume();
          const now = audioCtx.currentTime;
          const notes = type === 'win' ? [523.25, 659.25, 783.99, 1046.5] :
                        type === 'star' ? [587.33, 880] : [440, 659.25];
          notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.001, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.06, now + idx * 0.08 + 0.025);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.42);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.45);
          });
        } catch (e) {}
      }

      let toastTimer = null;
      function showToast(msg, icon) {
        const banner = document.getElementById('toastBanner');
        const msgEl = document.getElementById('toastMessage');
        const iconEl = document.getElementById('toastIcon');
        if (!banner || !msgEl || !iconEl) return;
        iconEl.textContent = icon || '✦';
        msgEl.textContent = msg;
        banner.classList.remove('translate-x-[130%]');
        banner.classList.add('translate-x-0');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          banner.classList.remove('translate-x-0');
          banner.classList.add('translate-x-[130%]');
        }, 3200);
      }

      // ===================================================================
      // PHOTOREALISTIC ARCHITECTURAL PBR 3D GALLERY ENGINE (Three.js r128)
      // ===================================================================
      const webglCanvas = document.getElementById('webgl3dCanvas');
      let scene, camera, renderer;
      let galleryLights = [];
      let sculptureGroup, armillaryRing1, armillaryRing2, armillaryRing3;
      let monolithMeshes = [];
      let reflectionMeshes = []; // Inverted planar mirror reflection meshes beneath the marble floor!
      let monolithTargets = [];
      let currentFormation = 'helix';
      let isWarpDrive = false;
      let isDroneTour = false;
      let droneTourIndex = 0;
      let droneTourTimer = 0;
      let selectedMonolithIndex = -1;

      const FLOOR_Y = -5.5;
      const camLookTarget = new THREE.Vector3(0, 0.2, 0);
      const camLookCurrent = new THREE.Vector3(0, 0.2, 0);
      let camSpherical = { radius: 22, theta: 0.15, phi: Math.PI / 2.02 };
      let camSphericalTarget = { radius: 22, theta: 0.15, phi: Math.PI / 2.02 };
      let isDragging3D = false;
      let pointerDownPos = { x: 0, y: 0 };
      let prevPointerPos = { x: 0, y: 0 };

      // 1. Procedural High-Dynamic-Range Museum Atrium Environment Map (PBR Reflections)
      function createMuseumEnvMap() {
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 256;
        const ctx = c.getContext('2d');
        const g = ctx.createLinearGradient(0, 0, 0, 256);
        g.addColorStop(0, '#1c1915');
        g.addColorStop(0.45, '#2b241c');
        g.addColorStop(0.5, '#0c0b09');
        g.addColorStop(1, '#050506');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 512, 256);

        // Warm 3000K gallery track light strips in reflection map
        ctx.fillStyle = '#ffdfb0';
        for (let i = 0; i < 8; i++) {
          ctx.fillRect(i * 64 + 18, 28, 28, 6);
          ctx.fillRect(i * 64 + 10, 95, 42, 4);
        }
        const tex = new THREE.CanvasTexture(c);
        tex.mapping = THREE.EquirectangularReflectionMapping;
        return tex;
      }

      // 2. Procedural Nero Marquina Veined Black Marble Floor Texture + Roughness Map
      function createMarbleTextures() {
        const c = document.createElement('canvas');
        c.width = 1024;
        c.height = 1024;
        const ctx = c.getContext('2d');

        const rCanvas = document.createElement('canvas');
        rCanvas.width = 1024;
        rCanvas.height = 1024;
        const rCtx = rCanvas.getContext('2d');

        // Deep polished Nero Marquina obsidian base
        ctx.fillStyle = '#0b0b0d';
        ctx.fillRect(0, 0, 1024, 1024);
        rCtx.fillStyle = '#242424'; // Very low roughness (glossy stone)
        rCtx.fillRect(0, 0, 1024, 1024);

        // Subtle stone tile joints (large format architectural slabs)
        ctx.strokeStyle = 'rgba(212, 180, 131, 0.12)';
        ctx.lineWidth = 2;
        for (let i = 0; i <= 1024; i += 256) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
        }

        // Organic Calacatta / Nero gold & warm ivory marble veins
        for (let v = 0; v < 42; v++) {
          let x = Math.random() * 1024;
          let y = Math.random() * 1024;
          ctx.beginPath();
          ctx.moveTo(x, y);
          rCtx.beginPath();
          rCtx.moveTo(x, y);
          for (let step = 0; step < 26; step++) {
            x += (Math.random() - 0.35) * 45;
            y += (Math.random() - 0.35) * 45;
            ctx.lineTo(x, y);
            rCtx.lineTo(x, y);
          }
          ctx.strokeStyle = v % 3 === 0 ? 'rgba(212, 180, 131, 0.16)' : 'rgba(255, 250, 240, 0.08)';
          ctx.lineWidth = Math.random() * 2.4 + 0.5;
          ctx.stroke();

          rCtx.strokeStyle = '#686868';
          rCtx.lineWidth = 3;
          rCtx.stroke();
        }

        const colorTex = new THREE.CanvasTexture(c);
        colorTex.wrapS = THREE.RepeatWrapping;
        colorTex.wrapT = THREE.RepeatWrapping;
        colorTex.repeat.set(6, 6);

        const roughTex = new THREE.CanvasTexture(rCanvas);
        roughTex.wrapS = THREE.RepeatWrapping;
        roughTex.wrapT = THREE.RepeatWrapping;
        roughTex.repeat.set(6, 6);

        return { colorTex, roughTex };
      }

      // 3. Photorealistic Museum Frame + Ivory Passe-Partout Mat Board + Brass Plaque Texture
      function createMonolithTexture(photoItem, onReady) {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 760;
        const ctx = canvas.getContext('2d');

        function drawRealisticMuseumMat(imgElement) {
          // 1. Warm Ivory Museum Passe-Partout Mat Board (#f3efe6)
          const matGrad = ctx.createLinearGradient(0, 0, 600, 760);
          matGrad.addColorStop(0, '#f6f3ec');
          matGrad.addColorStop(1, '#e6e0d4');
          ctx.fillStyle = matGrad;
          ctx.fillRect(0, 0, 600, 760);

          // Subtle inner 45-degree bevel cut around photograph opening [46, 46, 508, 594]
          ctx.fillStyle = '#c8c0b0';
          ctx.fillRect(42, 42, 516, 602);
          ctx.fillStyle = '#fdfbf7';
          ctx.fillRect(45, 45, 510, 596);

          if (imgElement) {
            const iw = imgElement.width || 504;
            const ih = imgElement.height || 590;
            const targetRatio = 504 / 590;
            const imgRatio = iw / ih;
            let sx = 0, sy = 0, sw = iw, sh = ih;
            if (imgRatio > targetRatio) {
              sw = ih * targetRatio;
              sx = (iw - sw) / 2;
            } else {
              sh = iw / targetRatio;
              sy = (ih - sh) / 2;
            }
            ctx.drawImage(imgElement, sx, sy, sw, sh, 48, 48, 504, 590);

            // Subtle museum glass diagonal specular sheen
            const glassGrad = ctx.createLinearGradient(48, 48, 552, 638);
            glassGrad.addColorStop(0, 'rgba(255,255,255,0.08)');
            glassGrad.addColorStop(0.45, 'rgba(255,255,255,0.0)');
            glassGrad.addColorStop(0.55, 'rgba(255,255,255,0.04)');
            glassGrad.addColorStop(1, 'rgba(0,0,0,0.08)');
            ctx.fillStyle = glassGrad;
            ctx.fillRect(48, 48, 504, 590);
          }

          // Engraved Brushed Brass Museum Plaque mounted on bottom mat
          const plaqueGrad = ctx.createLinearGradient(140, 666, 460, 732);
          plaqueGrad.addColorStop(0, '#c8a971');
          plaqueGrad.addColorStop(0.5, '#e2c997');
          plaqueGrad.addColorStop(1, '#a6854b');
          ctx.fillStyle = plaqueGrad;
          ctx.fillRect(110, 666, 380, 64);

          ctx.strokeStyle = '#5c4622';
          ctx.lineWidth = 2;
          ctx.strokeRect(114, 670, 372, 56);

          ctx.fillStyle = '#1c1408';
          ctx.font = '600 13px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText('EXHIBIT ' + String(photoItem.id).padStart(2, '0') + ' · AKKÚ COLLECTION', 300, 692);

          ctx.font = 'italic 21px "Cormorant Garamond", Georgia, serif';
          const cleanTitle = photoItem.title.replace(/^\d+:\s*/, '');
          ctx.fillText(cleanTitle.slice(0, 34), 300, 716);
        }

        drawRealisticMuseumMat(null);
        const tex = new THREE.CanvasTexture(canvas);
        tex.anisotropy = 4;
        tex.needsUpdate = true;

        queueArtworkImage(assetUrl(photoItem.file), (img) => {
          drawRealisticMuseumMat(img);
          tex.needsUpdate = true;
          if (onReady) onReady();
        });

        return {
          texture: tex,
          redrawWithUrl: (newUrl) => {
            const customImg = new Image();
            customImg.crossOrigin = 'anonymous';
            customImg.onload = function () {
              drawRealisticMuseumMat(customImg);
              tex.needsUpdate = true;
            };
            customImg.src = newUrl;
          }
        };
      }

      // 4. Compute Realistic Architectural Exhibition Layouts
      function computeFormationTargets(formationName) {
        monolithTargets = [];
        const total = PHOTOS.length;

        for (let i = 0; i < total; i++) {
          const pos = new THREE.Vector3();
          const lookAtTarget = new THREE.Vector3(0, 0, 0);

          if (formationName === 'helix') {
            // GRAND CIRCULAR MUSEUM ROTUNDA (All 26 paintings hung at eye-level around the colonnade)
            const angle = (i / total) * Math.PI * 2;
            const radius = 31.5;
            pos.set(Math.cos(angle) * radius, 0.2, Math.sin(angle) * radius);
            lookAtTarget.set(0, 0.2, 0);
          } else if (formationName === 'corridor') {
            // LONG LOUVRE ARCHITECTURAL GALLERY HALL (13 works on Left Wall, 13 on Right Wall)
            const side = i % 2 === 0 ? -1 : 1;
            const row = Math.floor(i / 2);
            const z = 34 - row * 5.8;
            pos.set(side * 13.5, 0.2, z);
            lookAtTarget.set(0, 0.2, z);
          } else if (formationName === 'ring') {
            // DOUBLE-TIER MEZZANINE ATRIUM (16 Lower Gallery + 10 Upper Mezzanine Balcony)
            const isUpper = i >= 16;
            const countInTier = isUpper ? 10 : 16;
            const idxInTier = isUpper ? (i - 16) : i;
            const angle = (idxInTier / countInTier) * Math.PI * 2;
            const radius = isUpper ? 25.5 : 28.5;
            const y = isUpper ? 6.2 : -0.4;
            pos.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
            lookAtTarget.set(0, y, 0);
          } else if (formationName === 'heart') {
            // CURVED COLLECTOR'S PAVILION
            const t = (i / total) * Math.PI * 2;
            const hx = 16 * Math.pow(Math.sin(t), 3);
            const hz = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            pos.set(hx * 1.45, 0.2, hz * 1.45);
            lookAtTarget.set(0, 0.2, 0);
          }

          const dummy = new THREE.Object3D();
          dummy.position.copy(pos);
          // Every painting faces INWARD toward the gallery visitor standing in the hall!
          dummy.lookAt(lookAtTarget);
          monolithTargets.push({
            pos,
            quat: dummy.quaternion.clone()
          });
        }
      }

      function initThreeJSWorld() {
        if (typeof THREE === 'undefined') return;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x070709);
        scene.fog = new THREE.FogExp2(0x070709, 0.0095);
        scene.environment = createMuseumEnvMap();

        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 400);

        renderer = new THREE.WebGLRenderer({
          canvas: webglCanvas,
          antialias: !isCompactDevice,
          powerPreference: isCompactDevice ? 'low-power' : 'high-performance',
          alpha: false
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCompactDevice ? 1.15 : 1.55));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;

        // Warm Architectural Gallery Lighting (3000K Tungsten + Soft Skylight Fill)
        const hemiLight = new THREE.HemisphereLight(0xffe8c8, 0x181512, 0.85);
        scene.add(hemiLight);

        const centerSpot = new THREE.PointLight(0xffdfb0, 2.4, 65);
        centerSpot.position.set(0, 14, 0);
        scene.add(centerSpot);

        const wallFill1 = new THREE.PointLight(0xffd296, 1.8, 70);
        wallFill1.position.set(22, 8, 22);
        scene.add(wallFill1);

        const wallFill2 = new THREE.PointLight(0xffd296, 1.8, 70);
        wallFill2.position.set(-22, 8, -22);
        scene.add(wallFill2);

        const wallFill3 = new THREE.PointLight(0xffd296, 1.6, 70);
        wallFill3.position.set(-22, 8, 22);
        scene.add(wallFill3);

        const wallFill4 = new THREE.PointLight(0xffd296, 1.6, 70);
        wallFill4.position.set(22, 8, -22);
        scene.add(wallFill4);

        galleryLights = [centerSpot, wallFill1, wallFill2, wallFill3, wallFill4];

        // ===============================================================
        // 1. POLISHED NERO MARQUINA MARBLE FLOOR + REAL-TIME MIRROR PASS
        // ===============================================================
        const marble = createMarbleTextures();
        const floorGeo = new THREE.PlaneGeometry(180, 180);
        const floorMat = new THREE.MeshStandardMaterial({
          map: marble.colorTex,
          roughnessMap: marble.roughTex,
          bumpMap: marble.roughTex,
          bumpScale: 0.015,
          metalness: 0.15,
          roughness: 0.22,
          transparent: true,
          opacity: 0.83
        });
        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.rotation.x = -Math.PI / 2;
        floorMesh.position.y = FLOOR_Y;
        scene.add(floorMesh);

        // Deep sub-floor backing plane so reflection depth looks physically grounded
        const subFloor = new THREE.Mesh(
          new THREE.PlaneGeometry(180, 180),
          new THREE.MeshBasicMaterial({ color: 0x030304 })
        );
        subFloor.rotation.x = -Math.PI / 2;
        subFloor.position.y = FLOOR_Y - 8.5;
        scene.add(subFloor);

        // ===============================================================
        // 2. ARCHITECTURAL ROTUNDA COLONNADE (16 FLUTED STONE COLUMNS)
        // ===============================================================
        const archGroup = new THREE.Group();
        scene.add(archGroup);

        const stoneMat = new THREE.MeshStandardMaterial({
          color: 0x1e1c1a,
          roughness: 0.65,
          metalness: 0.08
        });
        const bronzeTrimMat = new THREE.MeshStandardMaterial({
          color: 0xc5a059,
          roughness: 0.26,
          metalness: 0.84
        });
        const darkWalnutMat = new THREE.MeshStandardMaterial({
          color: 0x22160e,
          roughness: 0.35,
          metalness: 0.15
        });

        const colRadius = 35.2;
        const colHeight = 18;
        const shaftGeo = new THREE.CylinderGeometry(0.68, 0.78, colHeight, 24);
        const plinthGeo = new THREE.BoxGeometry(2.1, 0.9, 2.1);
        const capitalGeo = new THREE.BoxGeometry(1.95, 0.55, 1.95);
        const ringCollarGeo = new THREE.TorusGeometry(0.76, 0.07, 12, 32);

        for (let c = 0; c < 16; c++) {
          const angle = (c / 16) * Math.PI * 2 + (Math.PI / 16);
          const cx = Math.cos(angle) * colRadius;
          const cz = Math.sin(angle) * colRadius;

          const colUnit = new THREE.Group();
          colUnit.position.set(cx, FLOOR_Y, cz);

          const basePlinth = new THREE.Mesh(plinthGeo, stoneMat);
          basePlinth.position.y = 0.45;
          colUnit.add(basePlinth);

          const brassCollar = new THREE.Mesh(ringCollarGeo, bronzeTrimMat);
          brassCollar.rotation.x = Math.PI / 2;
          brassCollar.position.y = 0.95;
          colUnit.add(brassCollar);

          const shaft = new THREE.Mesh(shaftGeo, stoneMat);
          shaft.position.y = colHeight / 2 + 0.5;
          colUnit.add(shaft);

          const cap = new THREE.Mesh(capitalGeo, bronzeTrimMat);
          cap.position.y = colHeight + 0.6;
          colUnit.add(cap);

          archGroup.add(colUnit);
        }

        // Upper Coffered Rotunda Entablature Ring & Brushed-Bronze Track Lighting Rail
        const entablatureRing = new THREE.Mesh(
          new THREE.TorusGeometry(colRadius, 0.85, 16, 96),
          stoneMat
        );
        entablatureRing.rotation.x = Math.PI / 2;
        entablatureRing.position.y = FLOOR_Y + colHeight + 1.1;
        archGroup.add(entablatureRing);

        const lightTrackRail = new THREE.Mesh(
          new THREE.TorusGeometry(28.5, 0.09, 12, 96),
          bronzeTrimMat
        );
        lightTrackRail.rotation.x = Math.PI / 2;
        lightTrackRail.position.y = 5.4;
        archGroup.add(lightTrackRail);

        // ===============================================================
        // 3. CENTERPIECE MARBLE PEDESTAL, GLASS VITRINE & GALLERY BENCHES
        // ===============================================================
        sculptureGroup = new THREE.Group();
        sculptureGroup.position.set(0, FLOOR_Y, 0);
        scene.add(sculptureGroup);

        // Stepped Black Marble Pedestal
        const step1 = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.5, 0.45, 48), stoneMat);
        step1.position.y = 0.225;
        sculptureGroup.add(step1);

        const step2 = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 2.6, 36), stoneMat);
        step2.position.y = 1.6;
        sculptureGroup.add(step2);

        const pedestalBrassCap = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 0.12, 36), bronzeTrimMat);
        pedestalBrassCap.position.y = 2.95;
        sculptureGroup.add(pedestalBrassCap);

        // Smoked Museum Glass Vitrine Case over Pedestal
        const vitrineGlass = new THREE.Mesh(
          new THREE.CylinderGeometry(2.15, 2.15, 4.2, 36),
          new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.16,
            roughness: 0.05,
            metalness: 0.1,
            reflectivity: 0.9
          })
        );
        vitrineGlass.position.y = 5.1;
        sculptureGroup.add(vitrineGlass);

        const vitrineTopRim = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.06, 12, 48), bronzeTrimMat);
        vitrineTopRim.rotation.x = Math.PI / 2;
        vitrineTopRim.position.y = 7.2;
        sculptureGroup.add(vitrineTopRim);

        // Brushed-Brass Celestial Armillary Sphere Sculpture inside the Vitrine
        armillaryRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.045, 16, 64), bronzeTrimMat);
        armillaryRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.04, 16, 64), bronzeTrimMat);
        armillaryRing3 = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.035, 16, 64), bronzeTrimMat);
        armillaryRing1.position.y = 5.0;
        armillaryRing2.position.y = 5.0;
        armillaryRing3.position.y = 5.0;
        sculptureGroup.add(armillaryRing1, armillaryRing2, armillaryRing3);

        // 4 Charcoal-Velvet & Walnut Gallery Benches around the Rotunda
        const benchCushionGeo = new THREE.BoxGeometry(4.4, 0.38, 1.45);
        const benchBaseGeo = new THREE.BoxGeometry(4.2, 0.15, 1.3);
        const benchLegGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.65, 12);
        const velvetCushionMat = new THREE.MeshStandardMaterial({
          color: 0x19171a,
          roughness: 0.85,
          metalness: 0.05
        });

        for (let b = 0; b < 4; b++) {
          const bAngle = (b / 4) * Math.PI * 2;
          const bench = new THREE.Group();
          const bDist = 9.2;
          bench.position.set(Math.cos(bAngle) * bDist, FLOOR_Y, Math.sin(bAngle) * bDist);
          bench.lookAt(0, FLOOR_Y, 0);

          const cushion = new THREE.Mesh(benchCushionGeo, velvetCushionMat);
          cushion.position.y = 0.82;
          bench.add(cushion);

          const woodFrame = new THREE.Mesh(benchBaseGeo, darkWalnutMat);
          woodFrame.position.y = 0.58;
          bench.add(woodFrame);

          [[-1.8, -0.5], [1.8, -0.5], [-1.8, 0.5], [1.8, 0.5]].forEach(([lx, lz]) => {
            const leg = new THREE.Mesh(benchLegGeo, bronzeTrimMat);
            leg.position.set(lx, 0.32, lz);
            bench.add(leg);
          });

          scene.add(bench);
        }

        // Subtle Night Sky Pinpoint Stars visible above the Open Skylight
        const starCount = 1800;
        const starPos = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
          const r = 90 + Math.random() * 80;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI * 0.48; // Upper hemisphere sky only
          starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          starPos[i * 3 + 1] = r * Math.cos(phi) + 12;
          starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        }
        const skyGeo = new THREE.BufferGeometry();
        skyGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const skyStars = new THREE.Points(
          skyGeo,
          new THREE.PointsMaterial({ color: 0xfff4e0, size: 0.35, transparent: true, opacity: 0.7 })
        );
        scene.add(skyStars);

        // ===============================================================
        // 4. ALL 26 PHOTOREALISTIC FRAMED ARTWORKS + FLOOR REFLECTIONS
        // ===============================================================
        const outerFrameGeo = new THREE.BoxGeometry(4.4, 5.55, 0.24);
        const brassInnerLipGeo = new THREE.BoxGeometry(4.12, 5.28, 0.26);
        const artworkPlaneGeo = new THREE.PlaneGeometry(3.98, 5.12);
        const spotFixtureGeo = new THREE.CylinderGeometry(0.11, 0.14, 0.42, 16);

        PHOTOS.forEach((item, idx) => {
          const group = new THREE.Group();
          group.userData = { monolithIndex: idx, photoId: item.id };

          // Outer Dark Walnut Museum Frame
          const walnutBox = new THREE.Mesh(outerFrameGeo, darkWalnutMat.clone());
          walnutBox.userData = { monolithIndex: idx };
          group.add(walnutBox);

          // Brushed Champagne Brass Bezel Trim
          const brassLip = new THREE.Mesh(brassInnerLipGeo, bronzeTrimMat.clone());
          brassLip.userData = { monolithIndex: idx };
          group.add(brassLip);

          // High-Res Passe-Partout Mat + Real Photograph + Brass Plaque
          const texBundle = createMonolithTexture(item);
          const artMat = new THREE.MeshStandardMaterial({
            map: texBundle.texture,
            roughness: 0.18,
            metalness: 0.04
          });

          const frontArt = new THREE.Mesh(artworkPlaneGeo, artMat);
          frontArt.position.z = 0.14;
          frontArt.userData = { monolithIndex: idx };
          group.add(frontArt);

          const backArt = new THREE.Mesh(artworkPlaneGeo, artMat);
          backArt.position.z = -0.14;
          backArt.rotation.y = Math.PI;
          backArt.userData = { monolithIndex: idx };
          group.add(backArt);

          // Overhead Track Spotlight Fixture above each painting
          const spotCan = new THREE.Mesh(spotFixtureGeo, bronzeTrimMat);
          spotCan.position.set(0, 3.4, 1.1);
          spotCan.rotation.x = Math.PI / 4;
          group.add(spotCan);

          group.userData.frameBox = brassLip;
          group.userData.redrawWithUrl = texBundle.redrawWithUrl;

          scene.add(group);
          monolithMeshes.push(group);

          // Create a softened mirrored frame echo for desktop displays.
          if (!isCompactDevice) {
            const reflGroup = new THREE.Group();
            const reflWalnut = new THREE.Mesh(outerFrameGeo, darkWalnutMat);
            const reflArt = new THREE.Mesh(artworkPlaneGeo, artMat);
            reflArt.position.z = 0.14;
            reflGroup.add(reflWalnut, reflArt);
            reflGroup.scale.y = -1;
            scene.add(reflGroup);
            reflectionMeshes.push(reflGroup);
          } else {
            reflectionMeshes.push(null);
          }
        });

        computeFormationTargets('helix');
        monolithMeshes.forEach((m, i) => {
          m.position.copy(monolithTargets[i].pos);
          m.quaternion.copy(monolithTargets[i].quat);
          if (reflectionMeshes[i]) {
            reflectionMeshes[i].position.set(
              m.position.x,
              FLOOR_Y * 2 - m.position.y,
              m.position.z
            );
            reflectionMeshes[i].quaternion.copy(m.quaternion);
          }
        });

        setup3DInteractions();
      }

      // ===================================================================
      // 3D CAMERA WALKTHROUGH, ORBIT, RAYCASTING & WING MORPHING
      // ===================================================================
      function focus3DMonolith(index) {
        if (!monolithTargets[index]) return;
        selectedMonolithIndex = index;
        const target = monolithTargets[index];
        const item = PHOTOS[index];

        monolithMeshes.forEach((m, idx) => {
          if (m.userData.frameBox) {
            m.userData.frameBox.material.emissive.setHex(idx === index ? 0x6b4c1b : 0x000000);
          }
        });

        // Smoothly walk visitor camera right in front of the selected painting at eye-level!
        camLookTarget.copy(target.pos);
        const normalForward = new THREE.Vector3(0, 0, 1).applyQuaternion(target.quat);
        const desiredCamPos = target.pos.clone().add(normalForward.multiplyScalar(7.6));
        const offset = desiredCamPos.clone().sub(camLookTarget);
        const r = Math.max(6.5, offset.length());
        camSphericalTarget.radius = r;
        camSphericalTarget.theta = Math.atan2(offset.x, offset.z);
        camSphericalTarget.phi = Math.PI / 2.0; // Eye level

        const hud = document.getElementById('holoInspectorHud');
        document.getElementById('holoFrameBadge').textContent = 'EXHIBIT #' + String(item.id).padStart(2, '0') + ' // 26';
        document.getElementById('holoFrameTitle').textContent = item.title;
        document.getElementById('holoFrameNote').textContent = '“' + item.note + '”';
        hud.classList.remove('hidden');
        playChime('star');
      }

      function reset3DCameraToCenter() {
        selectedMonolithIndex = -1;
        isDroneTour = false;
        document.getElementById('droneTourToggleBtn').textContent = '🚁 Auto-Fly Tour';
        document.getElementById('holoInspectorHud').classList.add('hidden');
        camLookTarget.set(0, 0.2, 0);
        camSphericalTarget.radius = currentFormation === 'corridor' ? 20 : 22;
        camSphericalTarget.phi = Math.PI / 2.02;
        monolithMeshes.forEach((m) => {
          if (m.userData.frameBox) m.userData.frameBox.material.emissive.setHex(0x000000);
        });
      }

      function set3DFormation(formationName) {
        currentFormation = formationName;
        computeFormationTargets(formationName);
        document.querySelectorAll('.formation-3d-btn').forEach(btn => {
          const f = btn.getAttribute('data-3d-formation');
          btn.className = (f === formationName)
            ? 'formation-3d-btn px-2.5 py-1 rounded-xl font-mono-tech text-[11px] bg-amber-500/25 text-amber-100 border border-amber-400/40'
            : 'formation-3d-btn px-2.5 py-1 rounded-xl font-mono-tech text-[11px] bg-white/5 text-gray-300 hover:text-white border border-transparent';
        });
        reset3DCameraToCenter();
        playChime('tap');
      }

      function setup3DInteractions() {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        webglCanvas.addEventListener('pointerdown', (e) => {
          isDragging3D = true;
          pointerDownPos = { x: e.clientX, y: e.clientY };
          prevPointerPos = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('pointermove', (e) => {
          if (!isDragging3D) return;
          const dx = e.clientX - prevPointerPos.x;
          const dy = e.clientY - prevPointerPos.y;
          prevPointerPos = { x: e.clientX, y: e.clientY };

          camSphericalTarget.theta -= dx * 0.0055;
          // Clamp vertical tilt so camera never clips below the marble floor!
          camSphericalTarget.phi = Math.max(0.55, Math.min(Math.PI * 0.56, camSphericalTarget.phi - dy * 0.0045));
        });

        window.addEventListener('pointerup', (e) => {
          if (!isDragging3D) return;
          isDragging3D = false;
          const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
          if (moveDist < 6) {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const hits = raycaster.intersectObjects(monolithMeshes, true);
            if (hits.length > 0) {
              const idx = hits[0].object.userData.monolithIndex;
              if (typeof idx === 'number') {
                focus3DMonolith(idx);
              }
            }
          }
        });

        webglCanvas.addEventListener('wheel', (e) => {
          camSphericalTarget.radius = Math.max(6, Math.min(48, camSphericalTarget.radius + e.deltaY * 0.025));
        }, { passive: true });
      }

      document.querySelectorAll('.formation-3d-btn').forEach(btn => {
        btn.addEventListener('click', () => set3DFormation(btn.getAttribute('data-3d-formation')));
      });

      document.getElementById('droneTourToggleBtn').addEventListener('click', () => {
        isDroneTour = !isDroneTour;
        const btn = document.getElementById('droneTourToggleBtn');
        btn.textContent = isDroneTour ? '❚❚ Stop Tour' : '🚁 Auto-Fly Tour';
        if (isDroneTour) {
          document.body.classList.add('pure-3d-mode');
          document.getElementById('pure3dBtnLabel').textContent = 'Show Panels';
          focus3DMonolith(droneTourIndex);
          showToast('Guided 3D Gallery Walkthrough started', '✦');
        }
      });

      document.getElementById('warpSpeedToggleBtn').addEventListener('click', () => {
        isWarpDrive = !isWarpDrive;
        const btn = document.getElementById('warpSpeedToggleBtn');
        btn.textContent = isWarpDrive ? 'Normal Pace' : '⚡ Warp Drive';
        playChime('star');
      });

      document.getElementById('reset3dCameraBtn').addEventListener('click', () => {
        reset3DCameraToCenter();
        playChime('tap');
      });

      document.getElementById('holoCloseBtn').addEventListener('click', reset3DCameraToCenter);
      document.getElementById('holoPrev3dBtn').addEventListener('click', () => {
        const nextIdx = (selectedMonolithIndex - 1 + PHOTOS.length) % PHOTOS.length;
        focus3DMonolith(nextIdx);
      });
      document.getElementById('holoNext3dBtn').addEventListener('click', () => {
        const nextIdx = (selectedMonolithIndex + 1) % PHOTOS.length;
        focus3DMonolith(nextIdx);
      });
      document.getElementById('holoExpandHdBtn').addEventListener('click', () => {
        if (selectedMonolithIndex >= 0) openLightboxById(PHOTOS[selectedMonolithIndex].id);
      });

      function togglePure3DMode(forceState) {
        const isPure = typeof forceState === 'boolean'
          ? (document.body.classList.toggle('pure-3d-mode', forceState), forceState)
          : document.body.classList.toggle('pure-3d-mode');
        document.getElementById('pure3dBtnLabel').textContent = isPure ? 'Show Panels' : 'Pure 3D View';
        playChime('tap');
        if (isPure) {
          showToast('Walkthrough Mode: Drag to look 360°, click any framed painting on the wall!', '✦');
        }
      }

      document.getElementById('togglePure3dBtn').addEventListener('click', () => togglePure3DMode());
      document.getElementById('quickPure3dHeroBtn').addEventListener('click', () => togglePure3DMode(true));
      document.getElementById('enterPure3dFlightBtn').addEventListener('click', () => {
        togglePure3DMode(true);
        focus3DMonolith(0);
      });

      // ===================================================================
      // CUSTOM MEDIA STUDIO
      // ===================================================================
      const customMediaModal = document.getElementById('customMediaModal');
      document.getElementById('openCustomMediaModalBtn').addEventListener('click', () => {
        customMediaModal.classList.remove('hidden');
        customMediaModal.classList.add('flex');
      });
      document.getElementById('closeCustomMediaModalBtn').addEventListener('click', () => {
        customMediaModal.classList.add('hidden');
        customMediaModal.classList.remove('flex');
      });
      document.getElementById('applyCustomMediaDoneBtn').addEventListener('click', () => {
        customMediaModal.classList.add('hidden');
        customMediaModal.classList.remove('flex');
        showToast('Gallery updated!', '✦');
      });

      document.getElementById('customPhotosInput').addEventListener('change', (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        files.slice(0, 26).forEach((file, idx) => {
          const url = URL.createObjectURL(file);
          PHOTOS[idx].file = url;
          if (monolithMeshes[idx] && monolithMeshes[idx].userData.redrawWithUrl) {
            monolithMeshes[idx].userData.redrawWithUrl(url);
          }
        });
        setHeroPhoto(0);
        renderMemories();
        renderMuseum();
        initMemoryGame();
        showToast(`Mounted ${Math.min(26, files.length)} photos into the 3D frames!`, '✦');
      });

      document.getElementById('customVideosInput').addEventListener('change', (e) => {
        const files = Array.from(e.target.files || []);
        if (files[0]) document.getElementById('cinemaVideo1').src = URL.createObjectURL(files[0]);
        if (files[1]) document.getElementById('cinemaVideo2').src = URL.createObjectURL(files[1]);
        showToast(`Loaded ${Math.min(2, files.length)} video clip(s)!`, '✦');
      });

      document.getElementById('customAudioInput').addEventListener('change', (e) => {
        const file = (e.target.files || [])[0];
        if (!file) return;
        bgMusic.src = URL.createObjectURL(file);
        toggleBackgroundMusic(true);
        showToast('Custom soundtrack playing!', '✦');
      });

      // ===================================================================
      // 1. PRE-ENTRY INTRO MODAL
      // ===================================================================
      let introStep = 1;
      const introModal = document.getElementById('introModal');
      const introStep1 = document.getElementById('introStep1');
      const introStep2 = document.getElementById('introStep2');
      const introStep3 = document.getElementById('introStep3');
      const introStepBadge = document.getElementById('introStepBadge');
      const introBackBtn = document.getElementById('introBackBtn');
      const introNextBtn = document.getElementById('introNextBtn');
      const introSkipBtn = document.getElementById('introSkipBtn');
      const introDot1 = document.getElementById('introDot1');
      const introDot2 = document.getElementById('introDot2');
      const introDot3 = document.getElementById('introDot3');

      function renderIntroStep() {
        introStep1.classList.toggle('hidden', introStep !== 1);
        introStep2.classList.toggle('hidden', introStep !== 2);
        introStep3.classList.toggle('hidden', introStep !== 3);
        introStepBadge.textContent = '0' + introStep + ' / 03';
        introBackBtn.classList.toggle('hidden', introStep === 1);
        introNextBtn.textContent = introStep === 3 ? 'Enter The Gallery ✦' : 'Next →';

        [introDot1, introDot2, introDot3].forEach((dot, idx) => {
          dot.className = (idx + 1 === introStep)
            ? 'w-6 h-1.5 rounded-full bg-amber-300 transition-all'
            : 'w-2.5 h-1.5 rounded-full bg-white/25 transition-all';
        });
      }

      function enterUniverse() {
        playChime('win');
        introModal.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => { introModal.classList.add('hidden'); }, 450);
        toggleBackgroundMusic(true);
      }

      introNextBtn.addEventListener('click', () => {
        if (introStep < 3) {
          introStep++;
          playChime('tap');
          renderIntroStep();
        } else {
          enterUniverse();
        }
      });
      introBackBtn.addEventListener('click', () => {
        if (introStep > 1) {
          introStep--;
          playChime('tap');
          renderIntroStep();
        }
      });
      introSkipBtn.addEventListener('click', enterUniverse);
      introDot1.addEventListener('click', () => { introStep = 1; renderIntroStep(); });
      introDot2.addEventListener('click', () => { introStep = 2; renderIntroStep(); });
      introDot3.addEventListener('click', () => { introStep = 3; renderIntroStep(); });

      // ===================================================================
      // 2. ROOM NAVIGATION & GALLERY LIGHTING TEMPERATURE
      // ===================================================================
      const ROOM_NAMES = ['home', 'memories', 'cinema', 'letter', 'museum', 'play', 'forever'];

      function switchRoom(roomId) {
        if (!ROOM_NAMES.includes(roomId)) return;
        document.body.classList.remove('pure-3d-mode');
        document.getElementById('pure3dBtnLabel').textContent = 'Pure 3D View';

        ROOM_NAMES.forEach(r => {
          const sec = document.getElementById('room-' + r);
          if (sec) sec.classList.toggle('active', r === roomId);
        });
        document.querySelectorAll('.room-nav-btn').forEach(btn => {
          const target = btn.getAttribute('data-room-target');
          btn.className = (target === roomId)
            ? 'room-nav-btn px-2.5 py-1.5 rounded-xl font-mono-tech text-[11px] uppercase tracking-wider bg-amber-500/20 text-amber-200 border border-amber-400/40 shrink-0 transition'
            : 'room-nav-btn px-2.5 py-1.5 rounded-xl font-mono-tech text-[11px] uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/5 border border-transparent shrink-0 transition';
        });

        if (roomId === 'home') set3DFormation('helix');
        else if (roomId === 'memories') set3DFormation('ring');
        else if (roomId === 'cinema') set3DFormation('corridor');
        else if (roomId === 'letter') set3DFormation('heart');
        else if (roomId === 'museum') set3DFormation('corridor');
        else if (roomId === 'play') set3DFormation('ring');
        else if (roomId === 'forever') set3DFormation('helix');

        if (roomId !== 'cinema') {
          document.body.classList.remove('theater-dimmed');
          const dimLabel = document.getElementById('theaterDimLabel');
          if (dimLabel) dimLabel.textContent = 'Dim Theater Lights';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playChime('tap');
      }

      document.querySelectorAll('.room-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchRoom(btn.getAttribute('data-room-target')));
      });
      document.querySelectorAll('[data-room-jump]').forEach(btn => {
        btn.addEventListener('click', () => switchRoom(btn.getAttribute('data-room-jump')));
      });
      document.getElementById('brandHomeBtn').addEventListener('click', () => switchRoom('home'));

      const THEMES = [
        { id: 'cosmic', label: 'Warm 3000K', hex: 0xffdfb0 },
        { id: 'golden', label: 'Candlelight', hex: 0xffb86c },
        { id: 'aurora', label: 'Moonlight', hex: 0xcbe4ff },
        { id: 'velvet', label: 'Rose Lounge', hex: 0xffc2d1 }
      ];
      let currentThemeIdx = 0;

      function applyTheme(themeId) {
        const idx = THEMES.findIndex(t => t.id === themeId);
        if (idx !== -1) currentThemeIdx = idx;
        if (themeId === 'cosmic') {
          document.documentElement.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', themeId);
        }
        const labelEl = document.getElementById('themeNameLabel');
        if (labelEl) labelEl.textContent = THEMES[currentThemeIdx].label;

        galleryLights.forEach(l => l.color.setHex(THEMES[currentThemeIdx].hex));

        document.querySelectorAll('.theme-pill').forEach(pill => {
          const pillTheme = pill.getAttribute('data-set-theme');
          pill.className = (pillTheme === themeId)
            ? 'theme-pill px-2.5 py-1 rounded-lg text-[11px] font-mono-tech bg-amber-500/25 text-amber-100 border border-amber-400/40'
            : 'theme-pill px-2.5 py-1 rounded-lg text-[11px] font-mono-tech bg-white/5 text-gray-300 hover:text-white';
        });
        playChime('tap');
      }

      document.getElementById('themeCycleBtn').addEventListener('click', () => {
        currentThemeIdx = (currentThemeIdx + 1) % THEMES.length;
        applyTheme(THEMES[currentThemeIdx].id);
        showToast('Gallery Lighting: ' + THEMES[currentThemeIdx].label, '✦');
      });

      document.querySelectorAll('.theme-pill').forEach(pill => {
        pill.addEventListener('click', () => applyTheme(pill.getAttribute('data-set-theme')));
      });

      // ===================================================================
      // 3. SOUNDTRACK PLAYER ("Jaavedaan Hai")
      // ===================================================================
      const bgMusic = document.getElementById('bgMusic');
      const musicToggleBtn = document.getElementById('musicToggleBtn');
      const vinylThumb = document.getElementById('vinylThumb');
      const musicPlayIcon = document.getElementById('musicPlayIcon');
      const eqBars = document.getElementById('eqBars');
      const musicStatusSub = document.getElementById('musicStatusSub');
      const musicVolumeSlider = document.getElementById('musicVolumeSlider');
      const chimeSoundToggleBtn = document.getElementById('chimeSoundToggleBtn');

      bgMusic.src = assetUrl('audio_3.mp3');

      function updateMusicUI(playing) {
        if (playing) {
          vinylThumb.classList.remove('vinyl-paused');
          vinylThumb.classList.add('vinyl-spinning');
          musicPlayIcon.textContent = '❚❚';
          eqBars.classList.remove('hidden');
          eqBars.classList.add('flex');
          musicStatusSub.textContent = 'NOW PLAYING · JAAVEDAAN HAI';
        } else {
          vinylThumb.classList.remove('vinyl-spinning');
          vinylThumb.classList.add('vinyl-paused');
          musicPlayIcon.textContent = '▶';
          eqBars.classList.add('hidden');
          eqBars.classList.remove('flex');
          musicStatusSub.textContent = 'PAUSED · TAP TO PLAY';
        }
      }

      function toggleBackgroundMusic(forcePlay) {
        if (forcePlay === true || bgMusic.paused) {
          bgMusic.play().then(() => updateMusicUI(true)).catch(() => updateMusicUI(false));
        } else {
          bgMusic.pause();
          updateMusicUI(false);
        }
      }

      musicToggleBtn.addEventListener('click', () => toggleBackgroundMusic());
      document.getElementById('heroSoundtrackCardBtn').addEventListener('click', () => {
        toggleBackgroundMusic();
        showToast(bgMusic.paused ? 'Soundtrack paused' : 'Playing "Jaavedaan Hai" ♫', '✦');
      });
      musicVolumeSlider.addEventListener('input', (e) => {
        bgMusic.volume = parseFloat(e.target.value);
      });
      chimeSoundToggleBtn.addEventListener('click', () => {
        chimesEnabled = !chimesEnabled;
        chimeSoundToggleBtn.textContent = chimesEnabled ? '🔔 Chimes On' : '🔕 Chimes Muted';
        if (chimesEnabled) playChime('tap');
      });

      // ===================================================================
      // 4. HOME HERO FRAME SHUFFLER & LIVE COUNTER
      // ===================================================================
      let heroPhotoIdx = 0;
      const heroFeatureImg = document.getElementById('heroFeatureImg');
      const heroPhotoIndex = document.getElementById('heroPhotoIndex');
      const heroPhotoTitle = document.getElementById('heroPhotoTitle');
      const heroPhotoSub = document.getElementById('heroPhotoSub');

      function setHeroPhoto(idx) {
        heroPhotoIdx = (idx + PHOTOS.length) % PHOTOS.length;
        const item = PHOTOS[heroPhotoIdx];
        heroFeatureImg.src = assetUrl(item.file);
        heroPhotoIndex.textContent = 'FRAME ' + String(item.id).padStart(2, '0') + ' // 26';
        heroPhotoTitle.textContent = item.title.replace(/^\d+:\s*/, '');
        heroPhotoSub.textContent = item.note;
      }
      setHeroPhoto(0);

      document.getElementById('heroShufflePhotoBtn').addEventListener('click', () => {
        setHeroPhoto(heroPhotoIdx + 1);
        focus3DMonolith(heroPhotoIdx);
        playChime('tap');
      });

      const specialDateInput = document.getElementById('specialDateInput');
      specialDateInput.value = loadSaved('anchor_date', '2024-01-01');

      function updateLiveCounter() {
        const start = new Date(specialDateInput.value || '2024-01-01').getTime();
        const diffMs = Math.max(0, Date.now() - start);
        document.getElementById('counterDays').textContent = Math.floor(diffMs / 86400000).toLocaleString();
        document.getElementById('counterHours').textContent = Math.floor(diffMs / 3600000).toLocaleString();
        document.getElementById('counterMinutes').textContent = Math.floor(diffMs / 60000).toLocaleString();
        document.getElementById('counterHeartbeats').textContent = Math.floor((diffMs / 1000) * 1.2).toLocaleString();
      }
      specialDateInput.addEventListener('change', () => {
        saveState('anchor_date', specialDateInput.value);
        updateLiveCounter();
        showToast('Anchor date updated!', '✦');
      });
      updateLiveCounter();
      setInterval(updateLiveCounter, 1000);

      // ===================================================================
      // 5. ROOM 02: MEMORIES GALLERY & POLAROID FLIP TABLE
      // ===================================================================
      const memoriesGrid = document.getElementById('memoriesGrid');
      const favCountBadge = document.getElementById('favCountBadge');

      function getFilteredPhotos() {
        return photoOrder
          .map(id => PHOTOS.find(p => p.id === id))
          .filter(Boolean)
          .filter(p => {
            if (currentFilter === 'first') return p.id <= 13;
            if (currentFilter === 'second') return p.id >= 14;
            if (currentFilter === 'fav') return favorites.has(p.id);
            return true;
          });
      }

      function renderMemories() {
        favCountBadge.textContent = String(favorites.size);
        const list = getFilteredPhotos();
        memoriesGrid.innerHTML = '';

        if (list.length === 0) {
          memoriesGrid.innerHTML = `
            <div class="col-span-full glass-card rounded-3xl p-10 text-center space-y-3">
              <p class="font-serif-display text-2xl italic text-white">No favorite frames selected yet.</p>
              <p class="text-xs text-gray-400">Tap the ♥ heart on any photograph to keep it in your Favorites list.</p>
            </div>
          `;
          return;
        }

        list.forEach((item) => {
          const isFav = favorites.has(item.id);
          const card = document.createElement('div');

          if (currentLayout === 'polaroid') {
            card.className = 'perspective-1000 h-96 cursor-pointer';
            card.innerHTML = `
              <div class="flip-card-inner w-full h-full">
                <div class="flip-card-front glass-card p-3 pb-4 rounded-2xl flex flex-col justify-between border border-white/15">
                  <div class="relative h-64 w-full rounded-xl overflow-hidden bg-black/50">
                    <img src="${assetUrl(item.file)}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover" />
                    <button type="button" data-fav-id="${item.id}" class="mem-fav-btn absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-sm ${isFav ? 'text-amber-300' : 'text-white/70'}">
                      ${isFav ? '♥' : '♡'}
                    </button>
                  </div>
                  <div class="pt-3 px-1 flex items-center justify-between gap-2">
                    <div>
                      <h3 class="font-serif-display text-xl italic text-white leading-tight">${item.title}</h3>
                      <span class="font-mono-tech text-[10px] text-amber-200/80 uppercase">Tap Polaroid to Flip ↻</span>
                    </div>
                    <button type="button" data-open-id="${item.id}" class="mem-open-btn px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 font-mono-tech text-[10px] text-white">
                      Zoom ⤢
                    </button>
                  </div>
                </div>
                <div class="flip-card-back glass-card p-6 rounded-2xl flex flex-col justify-between border border-amber-400/40 bg-zinc-950/95">
                  <div class="flex items-center justify-between">
                    <span class="font-mono-tech text-xs text-amber-200">BACK OF POLAROID // #${String(item.id).padStart(2, '0')}</span>
                    <span class="text-amber-200">✦</span>
                  </div>
                  <div class="space-y-2 my-auto">
                    <h4 class="font-serif-display text-2xl italic text-white">${item.title}</h4>
                    <p class="text-sm text-gray-300 italic leading-relaxed">“${item.note}”</p>
                  </div>
                  <div class="flex items-center justify-between pt-3 border-t border-white/10">
                    <span class="font-mono-tech text-[10px] text-gray-400">Tap to flip back ↻</span>
                    <button type="button" data-open-id="${item.id}" class="mem-open-btn px-3 py-1 rounded-lg bg-amber-500/20 text-amber-100 font-mono-tech text-xs">
                      Open Fullscreen ⤢
                    </button>
                  </div>
                </div>
              </div>
            `;
            card.addEventListener('click', (e) => {
              if (e.target.closest('.mem-fav-btn') || e.target.closest('.mem-open-btn')) return;
              card.classList.toggle('flipped');
              playChime('tap');
            });
          } else {
            card.className = 'glass-card rounded-2xl overflow-hidden group flex flex-col justify-between border border-white/10';
            card.innerHTML = `
              <div class="relative aspect-[4/5] w-full overflow-hidden bg-black/50 cursor-pointer mem-img-trigger" data-open-id="${item.id}">
                <img src="${assetUrl(item.file)}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-90"></div>
                ${item.overlay ? `<div class="absolute inset-x-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/65 backdrop-blur-sm text-center font-serif-display italic text-base text-amber-200 border border-amber-300/25">“${item.overlay}”</div>` : ''}
                <button type="button" data-fav-id="${item.id}" class="mem-fav-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md flex items-center justify-center text-base transition ${isFav ? 'text-amber-300' : 'text-white/75'}" aria-label="Favorite ${item.title}">
                  ${isFav ? '♥' : '♡'}
                </button>
                <div class="absolute bottom-3 left-3 right-3">
                  <span class="font-mono-tech text-[10px] uppercase tracking-widest text-amber-200">FRAME ${String(item.id).padStart(2, '0')} / 26</span>
                  <h3 class="font-serif-display text-xl italic text-white leading-snug">${item.title}</h3>
                </div>
              </div>
              <div class="p-3.5 flex items-center justify-between gap-2 bg-black/25">
                <p class="text-xs text-gray-400 truncate">${item.note}</p>
                <button type="button" data-open-id="${item.id}" class="mem-open-btn shrink-0 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 font-mono-tech text-[10px] text-amber-200">
                  Open ⤢
                </button>
              </div>
            `;
          }

          memoriesGrid.appendChild(card);
        });

        memoriesGrid.querySelectorAll('.mem-fav-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-fav-id'), 10);
            toggleFavorite(id, e.clientX, e.clientY);
          });
        });

        memoriesGrid.querySelectorAll('.mem-open-btn, .mem-img-trigger').forEach(el => {
          el.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(el.getAttribute('data-open-id'), 10);
            openLightboxById(id);
          });
        });
      }

      function toggleFavorite(id, clientX, clientY) {
        if (favorites.has(id)) {
          favorites.delete(id);
          showToast('Removed from Favorites', '♡');
        } else {
          favorites.add(id);
          showToast('Saved to Favorites ♥', '♥');
          if (clientX && clientY) spawnHeartBurst(clientX, clientY, 10);
        }
        saveState('favorites', Array.from(favorites));
        renderMemories();
        updateLightboxFavUI();
      }

      document.querySelectorAll('.mem-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          currentFilter = btn.getAttribute('data-mem-filter');
          document.querySelectorAll('.mem-filter-btn').forEach(b => {
            b.className = (b.getAttribute('data-mem-filter') === currentFilter)
              ? 'mem-filter-btn px-3.5 py-2 rounded-xl font-mono-tech text-xs uppercase bg-amber-500/25 text-amber-100 border border-amber-400/40'
              : 'mem-filter-btn px-3.5 py-2 rounded-xl font-mono-tech text-xs uppercase bg-white/5 text-gray-300 hover:text-white border border-white/10';
          });
          renderMemories();
          playChime('tap');
        });
      });

      const layoutGridBtn = document.getElementById('layoutGridBtn');
      const layoutPolaroidBtn = document.getElementById('layoutPolaroidBtn');
      layoutGridBtn.addEventListener('click', () => {
        currentLayout = 'grid';
        layoutGridBtn.className = 'px-3 py-1.5 rounded-lg font-mono-tech text-xs bg-amber-500/20 text-amber-100 border border-amber-400/30';
        layoutPolaroidBtn.className = 'px-3 py-1.5 rounded-lg font-mono-tech text-xs bg-white/5 text-gray-300 hover:text-white';
        renderMemories();
      });
      layoutPolaroidBtn.addEventListener('click', () => {
        currentLayout = 'polaroid';
        layoutPolaroidBtn.className = 'px-3 py-1.5 rounded-lg font-mono-tech text-xs bg-amber-500/20 text-amber-100 border border-amber-400/30';
        layoutGridBtn.className = 'px-3 py-1.5 rounded-lg font-mono-tech text-xs bg-white/5 text-gray-300 hover:text-white';
        renderMemories();
        showToast('Tap any Polaroid to flip it over!', '✦');
      });

      document.getElementById('shuffleMemoriesBtn').addEventListener('click', () => {
        photoOrder = [...photoOrder].sort(() => Math.random() - 0.5);
        renderMemories();
        showToast('Shuffled the 26 frames!', '✦');
      });

      // ===================================================================
      // 6. LIGHTBOX & AUTO SLIDESHOW
      // ===================================================================
      const lightboxModal = document.getElementById('lightboxModal');
      const lightboxImg = document.getElementById('lightboxImg');
      const lightboxTitle = document.getElementById('lightboxTitle');
      const lightboxIndexBadge = document.getElementById('lightboxIndexBadge');
      const lightboxSubNote = document.getElementById('lightboxSubNote');
      const lightboxLyricOverlay = document.getElementById('lightboxLyricOverlay');
      const lightboxFavBtn = document.getElementById('lightboxFavBtn');
      const lightboxSlideToggleBtn = document.getElementById('lightboxSlideToggleBtn');

      function openLightboxById(id) {
        const idx = PHOTOS.findIndex(p => p.id === id);
        lightboxIndex = idx !== -1 ? idx : 0;
        updateLightboxContent();
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        playChime('tap');
      }

      function updateLightboxContent() {
        const item = PHOTOS[lightboxIndex];
        lightboxImg.src = assetUrl(item.file);
        lightboxIndexBadge.textContent = 'FRAME ' + String(item.id).padStart(2, '0') + ' / 26';
        lightboxTitle.textContent = item.title;
        lightboxSubNote.textContent = '“' + item.note + '”';
        if (item.overlay) {
          lightboxLyricOverlay.textContent = '“' + item.overlay + '”';
          lightboxLyricOverlay.classList.remove('hidden');
        } else {
          lightboxLyricOverlay.classList.add('hidden');
        }
        updateLightboxFavUI();
      }

      function updateLightboxFavUI() {
        const item = PHOTOS[lightboxIndex];
        if (!item) return;
        lightboxFavBtn.textContent = favorites.has(item.id) ? '♥ Favorited' : '♡ Favorite';
      }

      function stopSlideshow() {
        if (slideshowInterval) {
          clearInterval(slideshowInterval);
          slideshowInterval = null;
        }
        lightboxSlideToggleBtn.textContent = '▶ Auto Play';
      }

      function closeLightbox() {
        stopSlideshow();
        lightboxModal.classList.add('hidden');
        lightboxModal.classList.remove('flex');
      }

      document.getElementById('lightboxCloseBtn').addEventListener('click', closeLightbox);
      document.getElementById('lightboxPrevBtn').addEventListener('click', () => {
        lightboxIndex = (lightboxIndex - 1 + PHOTOS.length) % PHOTOS.length;
        updateLightboxContent();
      });
      document.getElementById('lightboxNextBtn').addEventListener('click', () => {
        lightboxIndex = (lightboxIndex + 1) % PHOTOS.length;
        updateLightboxContent();
      });
      lightboxFavBtn.addEventListener('click', () => {
        const item = PHOTOS[lightboxIndex];
        toggleFavorite(item.id, window.innerWidth / 2, window.innerHeight / 2);
      });
      lightboxSlideToggleBtn.addEventListener('click', () => {
        if (slideshowInterval) {
          stopSlideshow();
        } else {
          lightboxSlideToggleBtn.textContent = '❚❚ Pause Slideshow';
          slideshowInterval = setInterval(() => {
            lightboxIndex = (lightboxIndex + 1) % PHOTOS.length;
            updateLightboxContent();
          }, 3000);
        }
      });
      document.getElementById('startSlideshowBtn').addEventListener('click', () => {
        openLightboxById(PHOTOS[0].id);
        lightboxSlideToggleBtn.click();
      });

      window.addEventListener('keydown', (e) => {
        if (lightboxModal.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') {
          lightboxIndex = (lightboxIndex + 1) % PHOTOS.length;
          updateLightboxContent();
        }
        if (e.key === 'ArrowLeft') {
          lightboxIndex = (lightboxIndex - 1 + PHOTOS.length) % PHOTOS.length;
          updateLightboxContent();
        }
      });

      // ===================================================================
      // 7. ROOM 03: CINEMA CONTROLS & 8-CLIP SWITCHER
      // ===================================================================
      function setupCinemaPlayer(videoNum, file, posterFile) {
        const video = document.getElementById('cinemaVideo' + videoNum);
        const playBtn = document.getElementById('videoPlayBtn' + videoNum);
        const muteBtn = document.getElementById('videoMuteBtn' + videoNum);
        const seekSlider = document.getElementById('videoSeek' + videoNum);
        const fullBtn = document.getElementById('videoFullBtn' + videoNum);
        const otherVideo = document.getElementById('cinemaVideo' + (videoNum === 1 ? 2 : 1));

        video.src = assetUrl(file);
        video.poster = assetUrl(posterFile);

        playBtn.addEventListener('click', () => {
          if (video.paused) {
            if (otherVideo && !otherVideo.paused) otherVideo.pause();
            video.play();
          } else {
            video.pause();
          }
        });

        video.addEventListener('play', () => {
          playBtn.textContent = '❚❚ Pause Film 0' + videoNum;
          if (!bgMusic.paused) {
            musicWasPlayingBeforeVideo = true;
            bgMusic.pause();
            updateMusicUI(false);
            musicStatusSub.textContent = 'AUTO-PAUSED FOR CINEMA';
          }
        });

        function handleVideoStop() {
          playBtn.textContent = '▶ Play Film 0' + videoNum;
          if (otherVideo.paused && musicWasPlayingBeforeVideo) {
            musicWasPlayingBeforeVideo = false;
            toggleBackgroundMusic(true);
          }
        }

        video.addEventListener('pause', handleVideoStop);
        video.addEventListener('ended', handleVideoStop);
        video.addEventListener('timeupdate', () => {
          if (video.duration) seekSlider.value = String((video.currentTime / video.duration) * 100);
        });
        seekSlider.addEventListener('input', () => {
          if (video.duration) video.currentTime = (parseFloat(seekSlider.value) / 100) * video.duration;
        });
        muteBtn.addEventListener('click', () => {
          video.muted = !video.muted;
          muteBtn.textContent = video.muted ? '🔇 Muted' : '🔊 Sound On';
        });
        fullBtn.addEventListener('click', () => {
          if (video.requestFullscreen) video.requestFullscreen();
          else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
        });
      }

      setupCinemaPlayer(1, 'v02.mp4', 'v02.webp');
      setupCinemaPlayer(2, 'v03.mp4', 'v03.webp');

      document.querySelectorAll('.clip-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const deck = btn.getAttribute('data-clip-deck');
          const file = btn.getAttribute('data-clip-file');
          const title = btn.getAttribute('data-clip-title');
          const videoEl = document.getElementById('cinemaVideo' + deck);
          const badgeEl = document.getElementById('video' + deck + 'ClipBadge');
          videoEl.src = assetUrl(file);
          badgeEl.textContent = '"' + title + '"';
          videoEl.play().catch(() => {});
        });
      });

      document.getElementById('theaterDimBtn').addEventListener('click', () => {
        const dimmed = document.body.classList.toggle('theater-dimmed');
        document.getElementById('theaterDimLabel').textContent = dimmed ? 'Restore Lights ☀' : 'Dim Theater Lights';
      });

      // ===================================================================
      // 8. ROOM 04: WAX SEAL LETTER, TYPEWRITER & "OPEN WHEN..." ENVELOPES
      // ===================================================================
      const letterEnvelopeGate = document.getElementById('letterEnvelopeGate');
      const letterUnfoldedContent = document.getElementById('letterUnfoldedContent');
      const letterMainParagraph = document.getElementById('letterMainParagraph');
      const FULL_LETTER_TEXT = "You do not have to do anything with these. Just keep them as tiny reminders that there was softness here. The jokes. The silence. The random conversations. The days that looked ordinary until they became impossible to forget.";
      let typewriterTimer = null;

      function runTypewriterEffect() {
        if (typewriterTimer) clearInterval(typewriterTimer);
        letterMainParagraph.textContent = '';
        let i = 0;
        typewriterTimer = setInterval(() => {
          letterMainParagraph.textContent += FULL_LETTER_TEXT.charAt(i);
          i++;
          if (i >= FULL_LETTER_TEXT.length) {
            clearInterval(typewriterTimer);
            typewriterTimer = null;
          }
        }, 22);
      }

      document.getElementById('breakSealBtn').addEventListener('click', (e) => {
        playChime('win');
        spawnHeartBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 24);
        letterEnvelopeGate.classList.add('hidden');
        letterUnfoldedContent.classList.remove('hidden');
        runTypewriterEffect();
      });
      document.getElementById('typewriterToggleBtn').addEventListener('click', () => {
        playChime('tap');
        runTypewriterEffect();
      });
      document.getElementById('letterSendHeartBtn').addEventListener('click', (e) => {
        playChime('star');
        spawnHeartBurst(e.clientX, e.clientY, 20);
        showToast('Sent a shower of warmth for Akku ♥', '♥');
      });

      const openWhenGrid = document.getElementById('openWhenGrid');
      OPEN_WHEN_ENVELOPES.forEach((env, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'p-3.5 rounded-2xl bg-white/[0.04] hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/40 text-left transition flex items-start gap-2.5 group';
        btn.innerHTML = `
          <span class="text-sm font-serif-display italic text-amber-200 mt-0.5">0${idx + 1}</span>
          <div>
            <span class="font-mono-tech text-[10px] text-amber-200 uppercase block">ENVELOPE 0${idx + 1}</span>
            <span class="text-xs font-medium text-white">${env.label}</span>
          </div>
        `;
        btn.addEventListener('click', () => {
          openCapsuleModal('OPEN WHEN // 0' + (idx + 1), env.title, env.img, env.body);
        });
        openWhenGrid.appendChild(btn);
      });

      // ===================================================================
      // 9. ROOM 05: CURATED MUSEUM (26 EXHIBITION FRAMES WITH FLIP PLAQUES)
      // ===================================================================
      const museumGrid = document.getElementById('museumGrid');
      let allMuseumFlipped = false;

      function renderMuseum() {
        museumGrid.innerHTML = '';
        PHOTOS.forEach((item) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'museum-card perspective-1000 h-[420px]';
          wrapper.innerHTML = `
            <div class="flip-card-inner w-full h-full">
              <div class="flip-card-front glass-card p-4 rounded-3xl flex flex-col justify-between border border-white/15">
                <div class="flex items-center justify-between font-mono-tech text-[11px] text-gray-400">
                  <span>EXHIBIT #${String(item.id).padStart(2, '0')}</span>
                  <span class="text-amber-200">COLLECTION // AKKÚ</span>
                </div>
                <div class="relative h-64 my-2 rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                  <img src="${assetUrl(item.file)}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover" />
                </div>
                <div class="flex items-center justify-between gap-2 pt-1">
                  <h3 class="font-serif-display text-2xl italic text-white truncate">${item.title}</h3>
                  <div class="flex items-center gap-1.5 shrink-0">
                    <button type="button" class="museum-flip-btn px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 font-mono-tech text-[10px] text-amber-200">
                      Flip Plaque ↻
                    </button>
                    <button type="button" data-open-id="${item.id}" class="museum-zoom-btn px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 font-mono-tech text-[10px] text-white">
                      Expand ⤢
                    </button>
                  </div>
                </div>
              </div>

              <div class="flip-card-back glass-card p-7 rounded-3xl flex flex-col justify-between border border-amber-400/40 bg-zinc-950/95">
                <div class="flex items-center justify-between font-mono-tech text-xs text-amber-200">
                  <span>CURATOR PLAQUE // #${String(item.id).padStart(2, '0')}</span>
                  <span>✦</span>
                </div>
                <div class="my-auto space-y-3">
                  <h4 class="font-serif-display text-3xl italic text-white">${item.title}</h4>
                  <p class="text-sm text-gray-200 italic leading-relaxed">“${item.note}”</p>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-white/10">
                  <button type="button" class="museum-flip-btn font-mono-tech text-xs text-gray-400 hover:text-white">
                    ← Return to Photograph
                  </button>
                  <button type="button" data-open-id="${item.id}" class="museum-zoom-btn px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-100 font-mono-tech text-xs">
                    Inspect Fullscreen ⤢
                  </button>
                </div>
              </div>
            </div>
          `;

          wrapper.querySelectorAll('.museum-flip-btn').forEach(b => {
            b.addEventListener('click', () => {
              wrapper.classList.toggle('flipped');
              playChime('tap');
            });
          });
          wrapper.querySelectorAll('.museum-zoom-btn').forEach(b => {
            b.addEventListener('click', () => openLightboxById(item.id));
          });
          museumGrid.appendChild(wrapper);
        });
      }

      document.getElementById('flipAllMuseumBtn').addEventListener('click', () => {
        allMuseumFlipped = !allMuseumFlipped;
        document.querySelectorAll('.museum-card').forEach(c => c.classList.toggle('flipped', allMuseumFlipped));
        playChime('tap');
      });

      // ===================================================================
      // 10. ROOM 06: SPARKS & PLAY (MEMORY MATCH, SCRATCH CARD, STAR JAR)
      // ===================================================================
      const memoryGameBoard = document.getElementById('memoryGameBoard');
      const gameMovesCount = document.getElementById('gameMovesCount');
      const gamePairsCount = document.getElementById('gamePairsCount');
      const memoryGameWinBanner = document.getElementById('memoryGameWinBanner');

      let gameCards = [];
      let flippedIndices = [];
      let matchedIds = new Set();
      let moves = 0;
      let boardLocked = false;

      function initMemoryGame() {
        const chosen = [...PHOTOS].sort(() => Math.random() - 0.5).slice(0, 6);
        gameCards = [...chosen, ...chosen]
          .map((item, idx) => ({ ...item, uid: idx, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort);
        flippedIndices = [];
        matchedIds.clear();
        moves = 0;
        boardLocked = false;
        gameMovesCount.textContent = '0';
        gamePairsCount.textContent = '0 / 6';
        memoryGameWinBanner.classList.add('hidden');
        renderMemoryGameBoard();
      }

      function renderMemoryGameBoard() {
        memoryGameBoard.innerHTML = '';
        gameCards.forEach((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedIds.has(card.id);
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'relative aspect-square rounded-2xl overflow-hidden border transition-all duration-300 ' +
            (isFlipped ? 'border-amber-400 shadow-lg scale-[1.02]' : 'border-white/15 bg-white/[0.04] hover:border-amber-400/50');

          if (isFlipped) {
            btn.innerHTML = `
              <img src="${assetUrl(card.file)}" alt="${card.title}" class="w-full h-full object-cover" />
              <div class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 font-mono-tech text-[9px] text-amber-200">#${String(card.id).padStart(2, '0')}</div>
            `;
          } else {
            btn.innerHTML = `
              <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-500/10 to-stone-500/10">
                <span class="text-xl text-amber-200/80">✦</span>
                <span class="font-mono-tech text-[9px] text-gray-400 mt-1">AKKÚ</span>
              </div>
            `;
          }

          btn.addEventListener('click', () => handleMemoryCardClick(idx));
          memoryGameBoard.appendChild(btn);
        });
      }

      function handleMemoryCardClick(idx) {
        if (boardLocked || flippedIndices.includes(idx)) return;
        const card = gameCards[idx];
        if (matchedIds.has(card.id)) return;

        playChime('tap');
        flippedIndices.push(idx);
        renderMemoryGameBoard();

        if (flippedIndices.length === 2) {
          moves++;
          gameMovesCount.textContent = String(moves);
          const [firstIdx, secondIdx] = flippedIndices;
          if (gameCards[firstIdx].id === gameCards[secondIdx].id) {
            matchedIds.add(gameCards[firstIdx].id);
            flippedIndices = [];
            gamePairsCount.textContent = matchedIds.size + ' / 6';
            playChime('star');
            renderMemoryGameBoard();
            if (matchedIds.size === 6) {
              playChime('win');
              memoryGameWinBanner.classList.remove('hidden');
              spawnHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
            }
          } else {
            boardLocked = true;
            setTimeout(() => {
              flippedIndices = [];
              boardLocked = false;
              renderMemoryGameBoard();
            }, 750);
          }
        }
      }

      document.getElementById('resetMemoryGameBtn').addEventListener('click', () => {
        initMemoryGame();
        playChime('tap');
      });

      const scratchCanvas = document.getElementById('scratchCanvas');
      let isScratching = false;

      function initScratchCanvas() {
        const rect = scratchCanvas.parentElement.getBoundingClientRect();
        scratchCanvas.width = Math.max(300, rect.width || 380);
        scratchCanvas.height = Math.max(200, rect.height || 224);
        const ctx = scratchCanvas.getContext('2d');
        ctx.globalCompositeOperation = 'source-over';
        const grad = ctx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
        grad.addColorStop(0, '#c8a971');
        grad.addColorStop(0.5, '#e6cfa3');
        grad.addColorStop(1, '#9e7a40');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

        ctx.fillStyle = '#1c1408';
        ctx.font = '600 14px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✦ SCRATCH BRUSHED GOLD FOIL ✦', scratchCanvas.width / 2, scratchCanvas.height / 2);
      }

      function scratchAt(e) {
        if (!isScratching) return;
        const rect = scratchCanvas.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        const x = (touch.clientX - rect.left) * (scratchCanvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (scratchCanvas.height / rect.height);
        const ctx = scratchCanvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 26, 0, Math.PI * 2);
        ctx.fill();
      }

      scratchCanvas.addEventListener('mousedown', (e) => { isScratching = true; scratchAt(e); });
      scratchCanvas.addEventListener('mousemove', scratchAt);
      window.addEventListener('mouseup', () => { isScratching = false; });
      scratchCanvas.addEventListener('touchstart', (e) => { isScratching = true; scratchAt(e); }, { passive: true });
      scratchCanvas.addEventListener('touchmove', (e) => { scratchAt(e); }, { passive: true });
      window.addEventListener('touchend', () => { isScratching = false; });

      document.getElementById('resetScratchBtn').addEventListener('click', () => {
        initScratchCanvas();
        playChime('tap');
      });

      let jarIdx = 0;
      document.getElementById('pullJarReasonBtn').addEventListener('click', (e) => {
        jarIdx = (jarIdx + 1) % JAR_REASONS.length;
        document.getElementById('jarReasonText').textContent = JAR_REASONS[jarIdx];
        document.getElementById('jarCounterBadge').textContent = 'Note #0' + (jarIdx + 1);
        playChime('star');
        spawnHeartBurst(e.clientX, e.clientY, 12);
      });

      // ===================================================================
      // 11. CAPSULE MODAL & RANDOM MEMORY CAPSULE
      // ===================================================================
      const capsuleModal = document.getElementById('capsuleModal');
      const capsuleModalTag = document.getElementById('capsuleModalTag');
      const capsuleModalTitle = document.getElementById('capsuleModalTitle');
      const capsuleModalImg = document.getElementById('capsuleModalImg');
      const capsuleModalBody = document.getElementById('capsuleModalBody');

      function openCapsuleModal(tag, title, imgFile, body) {
        capsuleModalTag.textContent = tag;
        capsuleModalTitle.textContent = title;
        capsuleModalImg.src = assetUrl(imgFile);
        capsuleModalBody.textContent = '“' + body + '”';
        capsuleModal.classList.remove('hidden');
        capsuleModal.classList.add('flex');
        playChime('star');
      }

      function openRandomMemoryCapsule() {
        const item = PHOTOS[Math.floor(Math.random() * PHOTOS.length)];
        openCapsuleModal(
          'MEMORY CAPSULE // #' + String(item.id).padStart(2, '0'),
          item.title,
          item.file,
          item.note
        );
      }

      document.getElementById('randomCapsuleBtn').addEventListener('click', openRandomMemoryCapsule);
      document.getElementById('capsuleAnotherBtn').addEventListener('click', openRandomMemoryCapsule);
      document.getElementById('capsuleModalCloseBtn').addEventListener('click', () => {
        capsuleModal.classList.add('hidden');
        capsuleModal.classList.remove('flex');
      });

      // ===================================================================
      // 12. ROOM 07: TIME CAPSULE WISH WALL & FINALE CELEBRATION
      // ===================================================================
      const capsuleForm = document.getElementById('capsuleForm');
      const capsuleNoteInput = document.getElementById('capsuleNoteInput');
      const capsuleNotesList = document.getElementById('capsuleNotesList');

      function renderCapsuleNotes() {
        capsuleNotesList.innerHTML = '';
        capsuleNotes.forEach((item, idx) => {
          const div = document.createElement('div');
          div.className = 'p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between gap-2';
          div.innerHTML = `
            <p class="font-serif-display text-lg italic text-white">${item.text}</p>
            <div class="flex items-center justify-between font-mono-tech text-[10px] text-amber-200/80">
              <span>${item.date}</span>
              <button type="button" data-del-note="${idx}" class="del-note-btn text-gray-500 hover:text-amber-200">Remove</button>
            </div>
          `;
          capsuleNotesList.appendChild(div);
        });

        capsuleNotesList.querySelectorAll('.del-note-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-del-note'), 10);
            capsuleNotes.splice(idx, 1);
            saveState('capsule_notes', capsuleNotes);
            renderCapsuleNotes();
          });
        });
      }

      capsuleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = capsuleNoteInput.value.trim();
        if (!val) {
          showToast('Write a quick thought first!', '✦');
          return;
        }
        const nowStr = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        capsuleNotes.unshift({ text: val, date: nowStr });
        saveState('capsule_notes', capsuleNotes);
        capsuleNoteInput.value = '';
        renderCapsuleNotes();
        playChime('win');
        showToast('Saved inside the Universe Time Capsule!', '✦');
      });

      document.getElementById('copyAllCapsuleBtn').addEventListener('click', () => {
        const textToCopy = capsuleNotes.map(n => `• ${n.text} (${n.date})`).join('\n');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Notes copied to clipboard!', '✦');
          }).catch(() => fallbackCopy(textToCopy));
        } else {
          fallbackCopy(textToCopy);
        }
      });

      function fallbackCopy(str) {
        const ta = document.createElement('textarea');
        ta.value = str;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showToast('Notes copied to clipboard!', '✦');
        } catch (err) {
          showToast('Ready to copy!', '✦');
        }
        document.body.removeChild(ta);
      }

      document.getElementById('finaleSkyShowerBtn').addEventListener('click', () => {
        playChime('win');
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            spawnHeartBurst(
              Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
              Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
              22
            );
          }, i * 220);
        }
        showToast('A sky full of starlight for Akku ♥', '✦');
      });

      // ===================================================================
      // 13. UNIFIED GALLERY RENDER LOOP (REALISTIC PBR 3D GALLERY + REFLECTIONS)
      // ===================================================================
      const cosmosCanvas = document.getElementById('cosmosCanvas');
      const burstCanvas = document.getElementById('burstCanvas');
      const starCountLabel = document.getElementById('starCountLabel');
      const fpsCounterText = document.getElementById('fpsCounterText');
      const frameTimeText = document.getElementById('frameTimeText');

      function updateStarCounterUI() {
        if (starCountLabel) starCountLabel.textContent = discoveredStars.size + ' / 7 Stars';
      }
      updateStarCounterUI();

      document.getElementById('constellationStatusBtn').addEventListener('click', () => {
        const nextUndiscovered = CONSTELLATION_NOTES.findIndex((_, i) => !discoveredStars.has(i));
        const idx = nextUndiscovered !== -1 ? nextUndiscovered : Math.floor(Math.random() * CONSTELLATION_NOTES.length);
        discoveredStars.add(idx);
        saveState('stars', Array.from(discoveredStars));
        updateStarCounterUI();
        playChime('star');
        showToast(CONSTELLATION_NOTES[idx], '✦');
      });

      let burstParticles = [];
      function spawnHeartBurst(x, y, count) {
        const colors = ['#d4b483', '#f4f1ea', '#e5b879', '#ffffff'];
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
          const speed = Math.random() * 4.2 + 1.5;
          burstParticles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1.5,
            size: Math.random() * 7 + 5,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            isHeart: i % 2 === 0
          });
        }
      }

      function resizeAllCanvases() {
        cosmosCanvas.width = window.innerWidth;
        cosmosCanvas.height = window.innerHeight;
        burstCanvas.width = window.innerWidth;
        burstCanvas.height = window.innerHeight;
        if (renderer && camera) {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      }

      let lastTime = performance.now();
      let fpsFrames = 0;
      let fpsLastSample = performance.now();

      let renderFrameId = null;
      function startRenderLoop() {
        if (renderFrameId === null && !document.hidden) {
          renderFrameId = requestAnimationFrame(animateMasterLoop);
        }
      }

      function animateMasterLoop(now) {
        renderFrameId = null;
        if (document.hidden) return;
        const rawDt = (now - lastTime) / 1000;
        const dt = Math.min(rawDt, 0.05);
        lastTime = now;

        fpsFrames++;
        if (now - fpsLastSample >= 500) {
          const measuredFps = Math.round((fpsFrames * 1000) / (now - fpsLastSample));
          const displayFps = Math.min(240, measuredFps);
          const ms = (1000 / Math.max(1, displayFps)).toFixed(1);
          if (fpsCounterText) fpsCounterText.textContent = displayFps + ' FPS';
          if (frameTimeText) frameTimeText.textContent = ms + 'ms';
          fpsFrames = 0;
          fpsLastSample = now;
        }

        const damp = 1 - Math.exp(-7.5 * dt);

        if (isDroneTour) {
          droneTourTimer += dt;
          if (droneTourTimer > 3.8) {
            droneTourTimer = 0;
            droneTourIndex = (droneTourIndex + 1) % PHOTOS.length;
            focus3DMonolith(droneTourIndex);
          }
        } else if (!isDragging3D && selectedMonolithIndex === -1) {
          camSphericalTarget.theta += dt * (isWarpDrive ? 0.32 : 0.045);
        }

        if (renderer && scene && camera) {
          // 1. Subtle Brushed-Brass Armillary Rotation inside the Central Glass Vitrine
          if (armillaryRing1 && armillaryRing2 && armillaryRing3) {
            const spd = isWarpDrive ? 2.5 : 0.4;
            armillaryRing1.rotation.y += dt * 0.5 * spd;
            armillaryRing2.rotation.x += dt * 0.35 * spd;
            armillaryRing3.rotation.z += dt * 0.45 * spd;
          }

          // 2. Update artwork transforms and desktop mirror echoes
          for (let i = 0; i < monolithMeshes.length; i++) {
            const mesh = monolithMeshes[i];
            const targ = monolithTargets[i];
            if (!targ) continue;

            mesh.position.lerp(targ.pos, damp);
            mesh.quaternion.slerp(targ.quat, damp);

            const refl = reflectionMeshes[i];
            if (refl) {
              refl.position.set(
                mesh.position.x,
                FLOOR_Y * 2 - mesh.position.y,
                mesh.position.z
              );
              refl.quaternion.copy(mesh.quaternion);
            }
          }

          // 3. Smooth Damped Eye-Level Camera Walkthrough
          camSpherical.radius += (camSphericalTarget.radius - camSpherical.radius) * damp;
          camSpherical.theta += (camSphericalTarget.theta - camSpherical.theta) * damp;
          camSpherical.phi += (camSphericalTarget.phi - camSpherical.phi) * damp;
          camLookCurrent.lerp(camLookTarget, damp);

          const sinPhi = Math.sin(camSpherical.phi);
          camera.position.x = camLookCurrent.x + camSpherical.radius * sinPhi * Math.sin(camSpherical.theta);
          camera.position.y = Math.max(FLOOR_Y + 1.2, camLookCurrent.y + camSpherical.radius * Math.cos(camSpherical.phi));
          camera.position.z = camLookCurrent.z + camSpherical.radius * sinPhi * Math.cos(camSpherical.theta);
          camera.lookAt(camLookCurrent);

          renderer.render(scene, camera);
        }

        // Render Overlay Particles
        const bctx = burstCanvas.getContext('2d');
        bctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
        for (let i = burstParticles.length - 1; i >= 0; i--) {
          const p = burstParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08;
          p.alpha -= 0.018;
          if (p.alpha <= 0) {
            burstParticles.splice(i, 1);
            continue;
          }
          bctx.save();
          bctx.globalAlpha = Math.max(0, p.alpha);
          bctx.fillStyle = p.color;
          bctx.font = `${Math.round(p.size + 4)}px serif`;
          bctx.fillText(p.isHeart ? '♥' : '✦', p.x, p.y);
          bctx.restore();
        }

        renderFrameId = requestAnimationFrame(animateMasterLoop);
      }

      document.addEventListener('visibilitychange', startRenderLoop);

      window.addEventListener('resize', () => {
        resizeAllCanvases();
        initScratchCanvas();
      });

      initThreeJSWorld();
      resizeAllCanvases();
      renderMemories();
      renderMuseum();
      initMemoryGame();
      renderCapsuleNotes();
      setTimeout(initScratchCanvas, 120);
      startRenderLoop();
    })();
