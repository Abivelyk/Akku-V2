(function () {
      const ASSET_BASE = new URL('./assets/', document.baseURI);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function assetUrl(file) {
        return file ? new URL(file, ASSET_BASE).href : '';
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
        { id: 25, file: 'p25.jpg', title: '25: Saved for forever', note: '“I was so wrong not to doubt your Medellin, tangerine dreams.”' },
        { id: 26, file: 'p26.jpg', title: '26: The last photograph', note: 'The last frame in the gallery, and the doorway back to the very beginning.' }
      ];

      const CLIPS = [
        { file: 'v02.mp4', title: '01 · Rahein Teri' },
        { file: 'v03.mp4', title: '02 · Ruposh — Wajhi Farooki' },
        { file: 'clip04.mp4', title: '03 · Jhol — Maanu' },
        { file: 'clip08.mp4', title: '04 · Jaavedaan Hai' },
        { file: 'clip02.mp4', title: '05 · In My Wallet' },
        { file: 'clip03.mp4', title: '06 · Looking At The…' },
        { file: 'clip07.mp4', title: '07 · You Will Be My Girl' },
        { file: 'clip06.mp4', title: '08 · Quiet Smile' }
      ];

      const ENVELOPES = [
        { label: 'When you need a smile', text: '“Remember the jokes that made zero sense to anyone else on earth and still had us laughing until we couldn’t breathe? That version of you is my favorite thing in the universe.”' },
        { label: 'When it’s late at night', text: '“The late-night conversations that wandered everywhere and nowhere somehow made the night smaller. Close your eyes knowing you are deeply cared for.”' },
        { label: 'When today felt heavy', text: '“You don’t have to fix everything tonight. Take a slow breath, let Jaavedaan Hai play softly, and remember that you are allowed to just rest.”' },
        { label: 'When you doubt yourself', text: '“Someone built an entire 3D universe just because ordinary words weren’t big enough for you. Never forget how rare your heart is.”' },
        { label: 'For a tangerine dream', text: '“I was so wrong not to doubt your Medellin, tangerine dreams. Keep the ordinary details and let the good parts stay good.”' }
      ];

      // ===================================================================
      // 1. AUDIO & VIDEO INITIALIZATION
      // ===================================================================
      const bgMusic = document.getElementById('bgMusic');
      const mainCinemaPlayer = document.getElementById('mainCinemaPlayer');

      bgMusic.src = assetUrl('audio_3.mp3');
      mainCinemaPlayer.src = assetUrl('v02.mp4');
      mainCinemaPlayer.poster = assetUrl('v02.webp');

      let musicPausedForVideo = false;

      function updateMusicUI(playing) {
        const label = document.getElementById('musicStateLabel');
        const buttons = [
          document.getElementById('musicToggleBtn'),
          document.getElementById('entryMusicToggleBtn')
        ].filter(Boolean);

        if (label) label.textContent = playing ? 'Pause' : 'Play';
        buttons.forEach((button) => {
          button.setAttribute('aria-pressed', String(playing));
          button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} Jaavedaan Hai`);
          if (button.id === 'entryMusicToggleBtn') {
            button.textContent = `${playing ? 'Pause' : 'Play'} “Jaavedaan Hai”`;
          }
        });
      }

      function toggleMusic(forcePlay) {
        if (forcePlay === true || bgMusic.paused) {
          bgMusic.play().then(() => updateMusicUI(true)).catch(() => updateMusicUI(false));
        } else {
          bgMusic.pause();
          updateMusicUI(false);
        }
      }

      document.getElementById('musicToggleBtn').addEventListener('click', () => toggleMusic());
      document.getElementById('entryMusicToggleBtn').addEventListener('click', () => toggleMusic());

      const entryOverlay = document.getElementById('entryOverlay');
      entryOverlay.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') return;
        const controls = [...entryOverlay.querySelectorAll('button:not([disabled])')];
        if (controls.length < 2) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });

      document.getElementById('enterExperienceBtn').addEventListener('click', () => {
        const overlay = entryOverlay;
        document.body.classList.remove('is-entry-open');
        overlay.classList.remove('is-open');
        overlay.classList.add('is-closing');
        document.querySelector('header a[href="#chapter-overture"]')?.focus({ preventScroll: true });
        overlay.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
          overlay.hidden = true;
        }, prefersReducedMotion ? 0 : 740);
        toggleMusic(true);
      });

      // Populate 8 Video Clips in Chapter 03
      const reelButtonsGrid = document.getElementById('reelButtonsGrid');
      const activeClipBadge = document.getElementById('activeClipBadge');
      CLIPS.forEach((clip, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'reel-btn px-3.5 py-2.5 rounded-xl font-mono-tech text-[11px] text-left transition flex items-center justify-between ' +
          (idx === 0 ? 'bg-pink-500/25 text-white border border-pink-300/40' : 'bg-white/[0.05] hover:bg-white/10 text-pink-100/80 border border-white/10');
        btn.innerHTML = `<span class="truncate">${clip.title}</span><span class="text-pink-300 ml-2">▶</span>`;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.reel-btn').forEach((b, i) => {
            b.className = 'reel-btn px-3.5 py-2.5 rounded-xl font-mono-tech text-[11px] text-left transition flex items-center justify-between ' +
              (i === idx ? 'bg-pink-500/25 text-white border border-pink-300/40' : 'bg-white/[0.05] hover:bg-white/10 text-pink-100/80 border border-white/10');
          });
          activeClipBadge.textContent = clip.title;
          mainCinemaPlayer.src = assetUrl(clip.file);
          mainCinemaPlayer.play().catch(() => {});
        });
        reelButtonsGrid.appendChild(btn);
      });

      mainCinemaPlayer.addEventListener('play', () => {
        if (!bgMusic.paused) {
          musicPausedForVideo = true;
          bgMusic.pause();
          updateMusicUI(false);
        }
      });
      function resumeMusicAfterVideo() {
        if (musicPausedForVideo) {
          musicPausedForVideo = false;
          toggleMusic(true);
        }
      }
      mainCinemaPlayer.addEventListener('pause', resumeMusicAfterVideo);
      mainCinemaPlayer.addEventListener('ended', resumeMusicAfterVideo);

      // Populate "Open When..." Envelopes in Chapter 04
      const openWhenContainer = document.getElementById('openWhenContainer');
      const openWhenDisplay = document.getElementById('openWhenDisplay');
      ENVELOPES.forEach((env, idx) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'env-pill px-3.5 py-1.5 rounded-full font-mono-tech text-[11px] transition ' +
          (idx === 0 ? 'bg-pink-400/25 text-white border border-pink-300/40' : 'bg-white/5 hover:bg-white/15 text-pink-100/75 border border-white/10');
        b.textContent = '💌 ' + env.label;
        b.addEventListener('click', (e) => {
          openWhenDisplay.textContent = env.text;
          document.querySelectorAll('.env-pill').forEach((p, i) => {
            p.className = 'env-pill px-3.5 py-1.5 rounded-full font-mono-tech text-[11px] transition ' +
              (i === idx ? 'bg-pink-400/25 text-white border border-pink-300/40' : 'bg-white/5 hover:bg-white/15 text-pink-100/75 border border-white/10');
          });
          spawnHeartBurst(e.clientX, e.clientY, 12);
        });
        openWhenContainer.appendChild(b);
      });

      // Live Time & Heartbeat Counter in Chapter 05
      // Single source of truth: the day everything started (local time, 24 June 2026).
      const STORY_START = new Date(2026, 5, 24, 0, 0, 0); // month is 0-based → 5 = June
      const statDaysEl = document.getElementById('statDays');
      const statHoursEl = document.getElementById('statHours');
      const statBeatsEl = document.getElementById('statBeats');
      const statSinceEl = document.getElementById('statSince');
      if (statSinceEl) {
        statSinceEl.textContent = 'Since ' + STORY_START.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      function updateCounters() {
        const diff = Math.max(0, Date.now() - STORY_START.getTime());
        statDaysEl.textContent = Math.floor(diff / 86400000).toLocaleString();
        statHoursEl.textContent = Math.floor(diff / 3600000).toLocaleString();
        statBeatsEl.textContent = Math.floor((diff / 1000) * 1.2).toLocaleString();
      }
      updateCounters();
      let counterTimer = setInterval(updateCounters, 1000);
      // Save battery/CPU: pause ticking while the tab is hidden, resync on return.
      document.addEventListener('visibilitychange', () => {
        clearInterval(counterTimer);
        if (!document.hidden) { updateCounters(); counterTimer = setInterval(updateCounters, 1000); }
      });

      // ===================================================================
      // 2. OBSERVATORY GALLERY
      // ===================================================================
      const canvas = document.getElementById('webglCanvas');
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x03060c, 105, 245);

      const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 260);
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      const isSmallScreen = window.matchMedia('(max-width: 760px)').matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.25 : 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      scene.add(new THREE.AmbientLight(0xe9dfd0, 1.1));
      const warmKeyLight = new THREE.DirectionalLight(0xffd5a2, 1.3);
      warmKeyLight.position.set(-4, 8, 6);
      scene.add(warmKeyLight);
      const bronzeFillLight = new THREE.PointLight(0xc69a69, 2.4, 42, 2);
      bronzeFillLight.position.set(1, 4, -22);
      scene.add(bronzeFillLight);
      const coolWindowLight = new THREE.PointLight(0x7a9dc0, 1.2, 55, 2);
      coolWindowLight.position.set(7, 5, -72);
      scene.add(coolWindowLight);

      // Frames use the actual photographs in assets/ and load only as the camera approaches.
      const textureLoader = new THREE.TextureLoader();
      const maxAnisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      const frameGeometry = new THREE.BoxGeometry(3.72, 4.98, 0.12);
      const matBoardGeometry = new THREE.PlaneGeometry(3.46, 4.72);
      const cardGeometry = new THREE.PlaneGeometry(3.16, 4.42);
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b704f,
        metalness: 0.56,
        roughness: 0.42
      });
      const matBoardMaterial = new THREE.MeshStandardMaterial({
        color: 0xb9a586,
        metalness: 0.12,
        roughness: 0.66
      });
      const portraitCards = [];
      const clickableMeshes = [];

      function loadPhoto(card) {
        if (card.loaded || card.loading) return;
        card.loading = true;
        textureLoader.load(assetUrl(card.item.file), (texture) => {
          texture.encoding = THREE.sRGBEncoding;
          texture.anisotropy = maxAnisotropy;
          texture.needsUpdate = true;
          card.photoMaterial.map = texture;
          card.photoMaterial.color.set(0xffffff);
          card.photoMaterial.needsUpdate = true;
          card.loaded = true;
          card.loading = false;
        }, undefined, () => {
          card.loading = false;
        });
      }

      PHOTOS.forEach((item, idx) => {
        const side = idx % 2 === 0 ? 1 : -1;
        const zPos = -5 - idx * 4.5;
        const pathSway = Math.sin(idx * 0.42) * 0.9;
        const xPos = side * 3.35 + pathSway;
        const yPos = 0.05 + Math.cos(idx * 0.5) * 0.2;
        const group = new THREE.Group();
        group.position.set(xPos, yPos, zPos);
        group.lookAt(pathSway * 0.2, yPos + 0.15, zPos + 6);

        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        group.add(frame);

        const matBoard = new THREE.Mesh(matBoardGeometry, matBoardMaterial);
        matBoard.position.z = 0.067;
        group.add(matBoard);

        const photoMaterial = new THREE.MeshBasicMaterial({ color: 0x4c443a, toneMapped: false });
        const photo = new THREE.Mesh(cardGeometry, photoMaterial);
        photo.position.z = 0.073;
        photo.userData.photoIndex = idx;
        group.add(photo);
        clickableMeshes.push(photo);
        scene.add(group);

        portraitCards.push({
          group,
          mesh: photo,
          photoMaterial,
          basePos: group.position.clone(),
          index: idx,
          item,
          loaded: false,
          loading: false
        });
      });

      // The 3D screening room uses still covers; the full clips load only in the player.
      function loadPoster(file) {
        const texture = textureLoader.load(assetUrl(file));
        texture.encoding = THREE.sRGBEncoding;
        texture.anisotropy = maxAnisotropy;
        return texture;
      }
      const screenFrameGeometry = new THREE.BoxGeometry(3.3, 5.95, 0.12);
      const screenMatGeometry = new THREE.PlaneGeometry(3.08, 5.73);
      const screenFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0x745c42,
        metalness: 0.52,
        roughness: 0.46
      });

      function add3DCinemaScreen(poster, x, z, rotY) {
        const group = new THREE.Group();
        group.position.set(x, 0.45, z);
        group.rotation.y = rotY;
        group.add(new THREE.Mesh(screenFrameGeometry, screenFrameMaterial));
        const screen = new THREE.Mesh(
          screenMatGeometry,
          new THREE.MeshBasicMaterial({ map: poster, side: THREE.DoubleSide, toneMapped: false })
        );
        screen.position.z = 0.068;
        group.add(screen);
        scene.add(group);
      }

      add3DCinemaScreen(loadPoster('v02.webp'), -4.6, -148, 0.22);
      add3DCinemaScreen(loadPoster('v03.webp'), 4.6, -148, -0.22);
      // ===================================================================
      // 3. SCROLL-DRIVEN 3D CAMERA SPLINE & VELOCITY PHYSICS
      // ===================================================================
      let scrollTarget = 0; // 0.0 to 1.0
      let scrollCurrent = 0;
      let mouseParallax = { x: 0, y: 0 };
      let mouseParallaxCurrent = { x: 0, y: 0 };

      function computeScrollFraction() {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        scrollTarget = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      }
      window.addEventListener('scroll', computeScrollFraction, { passive: true });
      computeScrollFraction();

      window.addEventListener('pointermove', (e) => {
        if (prefersReducedMotion || e.pointerType === 'touch') return;
        mouseParallax.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseParallax.y = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      // Tap / Click any 3D Portrait in WebGL to open Fullscreen Lightbox
      const raycaster = new THREE.Raycaster();
      const pointerNDC = new THREE.Vector2();
      let downPos = { x: 0, y: 0 };

      window.addEventListener('pointerdown', (e) => {
        downPos = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('pointerup', (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('video') || e.target.closest('#photoModal')) return;
        if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) < 6) {
          pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
          pointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
          raycaster.setFromCamera(pointerNDC, camera);
          const hits = raycaster.intersectObjects(clickableMeshes, true);
          if (hits.length > 0 && typeof hits[0].object.userData.photoIndex === 'number') {
            openPhotoModal(hits[0].object.userData.photoIndex);
          }
        }
      });

      // Lightbox Modal Logic
      let currentModalIdx = 0;
      let returnFocusElement = null;
      let previousBodyOverflow = '';
      const photoModal = document.getElementById('photoModal');
      function openPhotoModal(idx) {
        if (photoModal.classList.contains('hidden')) {
          returnFocusElement = document.activeElement;
          previousBodyOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
        }
        currentModalIdx = (idx + PHOTOS.length) % PHOTOS.length;
        const item = PHOTOS[currentModalIdx];
        const modalPhotoImg = document.getElementById('modalPhotoImg');
        modalPhotoImg.src = assetUrl(item.file);
        modalPhotoImg.alt = item.title;
        document.getElementById('modalPhotoBadge').textContent = 'FRAME ' + String(item.id).padStart(2, '0') + ' / 26';
        document.getElementById('modalPhotoTitle').textContent = item.title;
        document.getElementById('modalPhotoNote').textContent = '“' + item.note + '”';
        photoModal.classList.remove('hidden');
        photoModal.classList.add('flex');
        photoModal.setAttribute('aria-hidden', 'false');
        document.getElementById('closeModalBtn').focus({ preventScroll: true });
      }
      function closePhotoModal() {
        photoModal.classList.add('hidden');
        photoModal.classList.remove('flex');
        photoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = previousBodyOverflow;
        if (returnFocusElement instanceof HTMLElement) returnFocusElement.focus({ preventScroll: true });
      }
      document.getElementById('closeModalBtn').addEventListener('click', closePhotoModal);
      photoModal.addEventListener('click', (event) => {
        if (event.target === photoModal) closePhotoModal();
      });
      document.getElementById('prevModalBtn').addEventListener('click', () => openPhotoModal(currentModalIdx - 1));
      document.getElementById('nextModalBtn').addEventListener('click', () => openPhotoModal(currentModalIdx + 1));
      document.addEventListener('keydown', (event) => {
        if (photoModal.classList.contains('hidden')) return;
        if (event.key === 'Escape') closePhotoModal();
        if (event.key === 'ArrowLeft') openPhotoModal(currentModalIdx - 1);
        if (event.key === 'ArrowRight') openPhotoModal(currentModalIdx + 1);
        if (event.key === 'Tab') {
          const controls = [...photoModal.querySelectorAll('button:not([disabled])')];
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      });

      let closestPhotoIdx = 0;
      document.getElementById('inspectActiveFrameBtn').addEventListener('click', () => {
        openPhotoModal(closestPhotoIdx);
      });

      // ===================================================================
      // 4. 2D HEART & STARLIGHT CELEBRATION BURSTS
      // ===================================================================
      const burstCanvas = document.getElementById('burstCanvas');
      let bursts = [];
      function spawnHeartBurst(x, y, count) {
        const cols = ['#ff8fab', '#ffc2d1', '#e0aaff', '#ffe5ec', '#ffffff'];
        for (let i = 0; i < count; i++) {
          const a = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
          const sp = Math.random() * 4.5 + 1.5;
          bursts.push({
            x,
            y,
            vx: Math.cos(a) * sp,
            vy: Math.sin(a) * sp - 1.4,
            size: Math.random() * 8 + 7,
            alpha: 1,
            color: cols[Math.floor(Math.random() * cols.length)],
            heart: i % 2 === 0
          });
        }
      }

      document.getElementById('sendHeartsBtn').addEventListener('click', () => {
        if (prefersReducedMotion) return;
        for (let i = 0; i < 2; i++) {
          setTimeout(() => {
            spawnHeartBurst(
              window.innerWidth * (0.3 + Math.random() * 0.4),
              window.innerHeight * (0.3 + Math.random() * 0.35),
              12
            );
          }, i * 260);
        }
      });

      // ===================================================================
      // 5. SCROLL-DRIVEN ANIMATION LOOP
      // ===================================================================
      const scrollPctBadge = document.getElementById('scrollPctBadge');
      const scrollRailFill = document.getElementById('scrollRailFill');
      const activeFrameHud = document.getElementById('activeFrameHud');
      const hudFrameNum = document.getElementById('hudFrameNum');
      const hudFrameTitle = document.getElementById('hudFrameTitle');
      const chapLinks = document.querySelectorAll('.chap-link');

      function resizeAll() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        burstCanvas.width = Math.floor(window.innerWidth * pixelRatio);
        burstCanvas.height = Math.floor(window.innerHeight * pixelRatio);
        burstCanvas.style.width = window.innerWidth + 'px';
        burstCanvas.style.height = window.innerHeight + 'px';
        burstCanvas.getContext('2d').setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth <= 760 ? 1.25 : 1.75));
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      window.addEventListener('resize', resizeAll);
      resizeAll();

      let lastTime = performance.now();
      let animationFrame = null;

      function animate(now) {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        const elapsed = now * 0.001;

        // Smooth Lenis-style inertial scroll damping
        const scrollEase = prefersReducedMotion ? 1 : 1 - Math.exp(-8.5 * dt);
        scrollCurrent += (scrollTarget - scrollCurrent) * scrollEase;

        // Smooth Mouse / Touch Parallax
        const parallaxEase = prefersReducedMotion ? 1 : 1 - Math.exp(-6 * dt);
        mouseParallaxCurrent.x += (mouseParallax.x - mouseParallaxCurrent.x) * parallaxEase;
        mouseParallaxCurrent.y += (mouseParallax.y - mouseParallaxCurrent.y) * parallaxEase;

        // Update Top Scroll UI & Chapter Highlight
        const pct = Math.round(scrollCurrent * 100);
        scrollPctBadge.textContent = String(pct).padStart(2, '0') + '%';
        if (scrollRailFill) scrollRailFill.style.height = pct + '%';

        const activeChap =
          scrollCurrent < 0.13 ? 0 :
          scrollCurrent < 0.58 ? 1 :
          scrollCurrent < 0.73 ? 2 :
          scrollCurrent < 0.88 ? 3 : 4;
        chapLinks.forEach((link, idx) => {
          link.className = (idx === activeChap)
            ? 'chap-link px-3.5 py-1.5 rounded-full font-mono-tech text-[10px] uppercase tracking-wider bg-white/15 text-white transition'
            : 'chap-link px-3.5 py-1.5 rounded-full font-mono-tech text-[10px] uppercase tracking-wider text-pink-100/70 hover:text-white transition';
          if (idx === activeChap) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });

        // Compute 3D Camera Position along the S-Curving Scroll Spline (Z = +10 down to Z = -180)
        const camZ = 10 - scrollCurrent * 190;
        const splineSwayX = Math.sin(scrollCurrent * Math.PI * 6) * 0.72 + mouseParallaxCurrent.x * 0.2;
        const splineSwayY = 0.18 + Math.cos(scrollCurrent * Math.PI * 4) * 0.12 - mouseParallaxCurrent.y * 0.12;

        camera.position.set(splineSwayX, splineSwayY, camZ);
        camera.lookAt(
          Math.sin((scrollCurrent + 0.03) * Math.PI * 6) * 0.35 + mouseParallaxCurrent.x * 0.1,
          0.12 - mouseParallaxCurrent.y * 0.06,
          camZ - 11
        );

        // Load nearby memories on demand and keep the frames gently grounded.
        let minDist = 999;
        let nearestIdx = 0;

        for (let i = 0; i < portraitCards.length; i++) {
          const card = portraitCards[i];
          const floatOffset = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.65 + i * 0.6) * 0.035;
          card.group.position.y = card.basePos.y + floatOffset;
          const dz = Math.abs(camera.position.z - card.basePos.z);
          if (dz < 30) loadPhoto(card);
          if (dz < minDist) {
            minDist = dz;
            nearestIdx = i;
          }
        }

        // Show Bottom Frame Pill during Chapter 02 (Memories Scroll)
        if (scrollCurrent >= 0.12 && scrollCurrent <= 0.62 && minDist < 8) {
          closestPhotoIdx = nearestIdx;
          const activeItem = PHOTOS[nearestIdx];
          hudFrameNum.textContent = 'FRAME ' + String(activeItem.id).padStart(2, '0') + ' / 26';
          hudFrameTitle.textContent = activeItem.title.replace(/^\d+:\s*/, '');
          activeFrameHud.classList.remove('opacity-0', 'translate-y-3');
        } else {
          activeFrameHud.classList.add('opacity-0', 'translate-y-3');
        }

        renderer.render(scene, camera);

        // Render 2D Heart Bursts
        const bctx = burstCanvas.getContext('2d');
        bctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = bursts.length - 1; i >= 0; i--) {
          const p = bursts[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08;
          p.alpha -= 0.018;
          if (p.alpha <= 0) {
            bursts.splice(i, 1);
            continue;
          }
          bctx.save();
          bctx.globalAlpha = Math.max(0, p.alpha);
          bctx.fillStyle = p.color;
          bctx.font = `${Math.round(p.size + 4)}px serif`;
          bctx.fillText(p.heart ? '♥' : '✦', p.x, p.y);
          bctx.restore();
        }

        animationFrame = requestAnimationFrame(animate);
      }

      function startAnimation() {
        if (document.hidden || animationFrame !== null) return;
        lastTime = performance.now();
        animationFrame = requestAnimationFrame(animate);
      }

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (animationFrame !== null) cancelAnimationFrame(animationFrame);
          animationFrame = null;
          return;
        }
        updateCounters();
        startAnimation();
      });

      startAnimation();
    })();
