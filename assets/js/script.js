/* ═══════════════════════════════════════════════════
   KRUNAL PALIVAL — Portfolio JavaScript
   Features: Boot Screen, Exact Particle Network,
   Custom Cursor, GSAP Animations, Typewriter,
   Skill Bars, Scroll Reveal, Mobile Menu
═══════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════
   BOOT / INITIALIZATION SCREEN
   (Same feel as Ayushman's site)
═══════════════════════════════════════ */
const BOOT_LINES = [
  '[ OK ] Initializing kernel modules...',
  '[ OK ] Loading security protocols...',
  '[ OK ] Mounting encrypted filesystem...',
  '[ OK ] Starting firewall daemon...',
  '[ OK ] Establishing secure connection...',
  '[ OK ] Authenticating user: krunal@root...',
  '[ OK ] Loading portfolio modules...',
  '[ ** ] ACCESS GRANTED — Welcome.',
];

function runBoot() {
  const bootScreen  = document.getElementById('boot-screen');
  const bootLinesEl = document.getElementById('boot-lines');
  const bootBar     = document.getElementById('boot-bar');
  const bootPct     = document.getElementById('boot-pct');
  const bootStatus  = document.getElementById('boot-status');

  if (!bootScreen) return;

  let lineIdx = 0;
  const totalLines = BOOT_LINES.length;
  const lineDelay  = 280;

  function addLine() {
    if (lineIdx >= totalLines) {
      bootStatus.textContent = 'LAUNCHING PORTFOLIO...';
      setTimeout(() => {
        bootScreen.classList.add('hidden');
        document.body.style.overflow = '';
        initAll(); // start everything after boot
      }, 500);
      return;
    }
    const line = document.createElement('span');
    line.className = 'bl';
    line.textContent = BOOT_LINES[lineIdx];
    // Color last line differently
    if (lineIdx === totalLines - 1) {
      line.style.color = '#00f3ff';
      line.style.fontWeight = 'bold';
    }
    bootLinesEl.appendChild(line);
    // Trigger animation
    requestAnimationFrame(() => line.style.animationDelay = '0ms');
    bootLinesEl.scrollTop = bootLinesEl.scrollHeight;

    // Update progress bar
    const pct = Math.round(((lineIdx + 1) / totalLines) * 100);
    bootBar.style.width = pct + '%';
    bootPct.textContent = pct + '%';
    if (pct < 50) bootStatus.textContent = 'LOADING MODULES...';
    else if (pct < 80) bootStatus.textContent = 'AUTHENTICATING...';
    else bootStatus.textContent = 'FINALIZING...';

    lineIdx++;
    setTimeout(addLine, lineDelay);
  }

  document.body.style.overflow = 'hidden';
  setTimeout(addLine, 400);
}

/* ═══════════════════════════════════════
   PARTICLE NETWORK — EXACT FROM UPLOADED THEME
   (+ mouse interaction + mobile optimization)
═══════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
  const COUNT = isMobile ? 45 : 90;
  const SPEED = isMobile ? 0.5 : 1.5;  // Mobile: slower = PC-like feel
  const DIST  = isMobile ? 130 : 180;

  function resize() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Exact same Particle class as uploaded theme
  class Particle {
    constructor() {
      this.x      = Math.random() * width;
      this.y      = Math.random() * height;
      this.vx     = (Math.random() - 0.5) * SPEED;
      this.vy     = (Math.random() - 0.5) * SPEED;
      this.radius = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width)  this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
      // Speed cap
      const spd = Math.hypot(this.vx, this.vy);
      if (spd > SPEED * 1.5) { this.vx = this.vx / spd * SPEED * 1.5; this.vy = this.vy / spd * SPEED * 1.5; }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 243, 255, 0.6)'; // exact from uploaded theme
      ctx.fill();
    }
  }

  const particles = [];
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  // Mouse attraction (desktop only)
  let mouse = { x: null, y: null };
  if (!isMobile) {
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
  }

  // Exact same animate loop as uploaded theme
  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      // Mouse subtle attraction
      if (mouse.x !== null) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d  = Math.hypot(dx, dy);
        if (d < 200) { p.vx += dx * 0.00012; p.vy += dy * 0.00012; }
      }
      p.update();
      p.draw();
    });

    // Exact same line drawing as uploaded theme
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 243, 255, ${1 - dist / DIST})`; // exact from uploaded theme
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ═══════════════════════════════════════
   CUSTOM CURSOR (desktop only)
═══════════════════════════════════════ */
function initCursor() {
  const outer = document.getElementById('cursorOuter');
  const inner = document.getElementById('cursorInner');
  if (!outer || !inner) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let ox = 0, oy = 0;
  let tx = 0, ty = 0;

  window.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    inner.style.left = tx + 'px';
    inner.style.top  = ty + 'px';
  });

  function animateCursor() {
    ox += (tx - ox) * 0.12;
    oy += (ty - oy) * 0.12;
    outer.style.left = ox + 'px';
    outer.style.top  = oy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverEls = document.querySelectorAll('a, button, .badge, .etag, .proj-card, .skill-card, .about-photo-frame, .pg-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ═══════════════════════════════════════
   TYPEWRITER EFFECT
═══════════════════════════════════════ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Ethical Hacker',
    'Penetration Tester',
    'Security Researcher',
    'VAPT Specialist',
    'CTF Player',
    'Bug Hunter',
    'Cybersecurity Enthusiast',
  ];

  let ri = 0, ci = 0, deleting = false;

  function type() {
    const current = roles[ri];
    el.textContent = deleting
      ? current.substring(0, ci - 1)
      : current.substring(0, ci + 1);
    deleting ? ci-- : ci++;

    let delay = deleting ? 55 : 95;
    if (!deleting && ci === current.length)    { delay = 2200; deleting = true; }
    else if (deleting && ci === 0)             { deleting = false; ri = (ri + 1) % roles.length; delay = 400; }
    setTimeout(type, delay);
  }
  type();
}

/* ═══════════════════════════════════════
   GSAP ANIMATIONS
═══════════════════════════════════════ */
function initGSAP() {
  if (typeof gsap === 'undefined') {
    // GSAP not loaded yet — fallback: just make everything visible
    document.querySelectorAll('.reveal-section').forEach(s => s.classList.add('revealed'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-path',    { y: 20, opacity: 0, duration: 0.5 })
    .from('#heroFirst',    { x: -60, opacity: 0, duration: 0.8 }, '-=0.2')
    .from('#heroLast',     { x: -60, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero-role',    { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-desc',    { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    .from('.hero-stats',   { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    .from('.hero-badges .badge', { scale: 0.8, opacity: 0, stagger: 0.08, duration: 0.4 }, '-=0.3')
    .from('.hero-cta a',   { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, '-=0.3')
    .from('#heroPhoto',    { x: 60, opacity: 0, duration: 1 }, '-=1.4');

  // Scroll triggers for sections
  gsap.utils.toArray('.reveal-section').forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        section.classList.add('revealed');
        // Animate skill bars when skills section is revealed
        if (section.id === 'skills') animateBars();
      }
    });
  });

  // Project cards stagger
  gsap.utils.toArray('.proj-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
    });
  });

  // Tags pop in
  gsap.from('.etag', {
    scrollTrigger: { trigger: '.tags-cloud', start: 'top 85%' },
    scale: 0.8, opacity: 0, stagger: 0.04, duration: 0.4, ease: 'back.out(1.7)'
  });

  // Contact links slide
  gsap.from('.clink-item', {
    scrollTrigger: { trigger: '.clink-list', start: 'top 85%' },
    x: -30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out'
  });
}

/* ═══════════════════════════════════════
   SKILL BARS
═══════════════════════════════════════ */
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  document.querySelectorAll('.si-fill').forEach(bar => {
    const w = bar.getAttribute('data-width') || '0';
    setTimeout(() => { bar.style.width = w + '%'; }, 100);
  });
}

// Fallback: observe skills section if GSAP fails
function initBarObserver() {
  const skillsSec = document.getElementById('skills');
  if (!skillsSec) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateBars();
      skillsSec.classList.add('revealed');
      obs.disconnect();
    }
  }, { threshold: 0.2 });
  obs.observe(skillsSec);
}

/* ═══════════════════════════════════════
   SCROLL REVEAL (Fallback)
═══════════════════════════════════════ */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        if (e.target.id === 'skills') animateBars();
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-section').forEach(s => obs.observe(s));
}

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    // Active link
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
function initMobileMenu() {
  const burger  = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');
  if (!burger || !overlay) return;

  burger.addEventListener('click', () => overlay.classList.toggle('open'));
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => overlay.classList.remove('open'));
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
}

/* ═══════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
      }
    });
  });
}

/* ═══════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('cfSubmit');
  const txt  = document.getElementById('cfBtnText');
  if (!form || !btn || !txt) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const orig = txt.textContent;
    txt.textContent = 'MESSAGE SENT ✓';
    btn.style.cssText = 'background:rgba(0,255,157,0.1);border-color:rgba(0,255,157,0.5);color:#00ff9d;';
    btn.disabled = true;
    setTimeout(() => {
      txt.textContent = orig;
      btn.style.cssText = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

/* ═══════════════════════════════════════
   PROJECT CARD 3D TILT (desktop)
═══════════════════════════════════════ */
function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 10;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 10;
      card.style.transform = `perspective(700px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ═══════════════════════════════════════
   HERO NAME GLITCH ON HOVER
═══════════════════════════════════════ */
function initGlitch() {
  const firstName = document.getElementById('heroFirst');
  const lastName  = document.getElementById('heroLast');
  const glitchCSS = `
    @keyframes glitchAnim {
      0%  { text-shadow: none; clip-path: none; }
      20% { text-shadow: -3px 0 #ff003c, 3px 0 #bc13fe; }
      40% { text-shadow: 3px 0 #00f3ff, -3px 0 #00ff9d; clip-path: inset(10% 0 80% 0); }
      60% { text-shadow: -3px 0 #bc13fe, 3px 0 #ff003c; }
      80% { text-shadow: 3px 0 #00ff9d, -3px 0 #00f3ff; clip-path: inset(75% 0 10% 0); }
      100%{ text-shadow: none; clip-path: none; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = glitchCSS;
  document.head.appendChild(style);

  [firstName, lastName].forEach(el => {
    if (!el) return;
    el.addEventListener('mouseenter', () => { el.style.animation = 'glitchAnim 0.3s infinite'; });
    el.addEventListener('mouseleave', () => { el.style.animation = ''; });
  });
}

/* ═══════════════════════════════════════
   INIT ALL — called after boot screen
═══════════════════════════════════════ */
function initAll() {
  initParticles();
  initCursor();
  initTypewriter();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initTilt();
  initGlitch();
  initBarObserver();
  initScrollReveal();

  // Wait for GSAP to be available
  function tryGSAP() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      initGSAP();
    } else {
      setTimeout(tryGSAP, 100);
    }
  }
  tryGSAP();
}

/* ═══════════════════════════════════════
   START
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Start boot immediately
  runBoot();
});

/* ═══════════════════════════════════════
   CONSOLE EASTER EGG
═══════════════════════════════════════ */
console.clear();
console.log(
  '%c\n ██╗  ██╗██████╗ \n ██║ ██╔╝██╔══██╗\n █████╔╝ ██████╔╝\n ██╔═██╗ ██╔═══╝ \n ██║  ██╗██║     \n ╚═╝  ╚═╝╚═╝     \n',
  'color:#00f3ff; font-family:monospace; font-size:10px;'
);
console.log('%c KRUNAL PALIVAL — ETHICAL HACKER PORTFOLIO ', 'background:#03060a;color:#00f3ff;font-family:monospace;font-size:13px;padding:8px 20px;border:1px solid #00f3ff;letter-spacing:2px;');
console.log('%c  Ethical Hacker | VAPT | Security Researcher | Bhavnagar, India  ', 'background:#03060a;color:#bc13fe;font-family:monospace;font-size:11px;padding:4px 20px;letter-spacing:1px;');
console.log('%c\n krunal@root:~$ _\n', 'color:#00ff9d;font-family:monospace;font-size:13px;');
console.log('%c 👋 Hey Fellow Hacker! Stay Ethical. Happy Hunting! 🎯', 'color:#ff9900;font-family:monospace;font-size:12px;padding:4px 0;');
