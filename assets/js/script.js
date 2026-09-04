/* ═══════════════════════════════════════
   KRUNAL PALIVAL — Premium Portfolio JS
   GSAP + Custom Cursor + Particle Network
   Mobile: reduced speed particles
═══════════════════════════════════════ */

// ── Device detection ──
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// ── GSAP Register ──
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ═══════════════════════════════════════
   1. PARTICLE NETWORK — PC speed on PC,
      slower + fewer on mobile
═══════════════════════════════════════ */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H;

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

const COUNT    = isMobile ? 40 : 90;
const SPEED    = isMobile ? 0.4 : 1.2;   // mobile much slower
const DIST     = isMobile ? 120 : 180;

class Dot {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * SPEED;
    this.vy = (Math.random() - 0.5) * SPEED;
    this.r  = Math.random() * 1.8 + 0.8;
    this.a  = Math.random() * 0.5 + 0.25;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,243,255,${this.a})`;
    ctx.fill();
  }
}

const dots = Array.from({ length: COUNT }, () => new Dot());

// Mouse attraction — desktop only
let mouse = { x: null, y: null };
if (!isMobile) {
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  dots.forEach(d => {
    if (!isMobile && mouse.x !== null) {
      const dx = mouse.x - d.x, dy = mouse.y - d.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 180) {
        d.vx += dx * 0.00012; d.vy += dy * 0.00012;
        const spd = Math.hypot(d.vx, d.vy);
        if (spd > 2) { d.vx = d.vx / spd * 2; d.vy = d.vy / spd * 2; }
      }
    }
    d.update(); d.draw();
  });
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < DIST) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(0,243,255,${(1 - dist / DIST) * 0.55})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

/* ═══════════════════════════════════════
   2. CUSTOM CURSOR — desktop only
═══════════════════════════════════════ */
if (!isMobile) {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    gsap.to(ring, { left: e.clientX, top: e.clientY, duration: 0.15, ease: 'power2.out' });
  });

  document.querySelectorAll('a, button, .badge, .tag, .proj-card, .tool-cat, .photo-frame').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '50px'; ring.style.height = '50px';
      ring.style.borderColor = 'rgba(0,243,255,0.8)';
      ring.style.background  = 'rgba(0,243,255,0.05)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '32px'; ring.style.height = '32px';
      ring.style.borderColor = 'rgba(0,243,255,0.5)';
      ring.style.background  = 'transparent';
    });
  });
}

/* ═══════════════════════════════════════
   3. GSAP HERO ANIMATIONS
═══════════════════════════════════════ */
gsap.timeline({ defaults: { ease: 'power3.out' } })
  .from('#hero-tag',  { y: 20, opacity: 0, duration: 0.6 })
  .from('#n1',        { x: -60, opacity: 0, duration: 0.8 }, '-=0.2')
  .from('#n2',        { x: -60, opacity: 0, duration: 0.8 }, '-=0.5')
  .from('.hero-role', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
  .from('.hero-loc',  { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
  .from('.hero-badges .badge', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
  .from('.hero-btns a', { y: 20, opacity: 0, stagger: 0.15, duration: 0.5 }, '-=0.3')
  .from('.hero-right', { x: 60, opacity: 0, duration: 1 }, '-=1.2');

/* ═══════════════════════════════════════
   4. TYPEWRITER
═══════════════════════════════════════ */
const roles = ['Cybersecurity Enthusiast','Ethical Hacker','Penetration Tester','Security Researcher','CTF Player','Bug Hunter','VAPT Specialist'];
const tw = document.getElementById('typewriter');
let ri = 0, ci = 0, del = false;

function type() {
  const cur = roles[ri];
  tw.textContent = del ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
  del ? ci-- : ci++;
  let spd = del ? 55 : 90;
  if (!del && ci === cur.length) { spd = 2200; del = true; }
  else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; spd = 400; }
  setTimeout(type, spd);
}
type();

/* ═══════════════════════════════════════
   5. SCROLL ANIMATIONS — GSAP ScrollTrigger
═══════════════════════════════════════ */
// Section headings
gsap.utils.toArray('.sec-label, .sec-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%' },
    y: 30, opacity: 0, duration: 0.7, ease: 'power3.out'
  });
});

// About rows
gsap.utils.toArray('.about-row').forEach((row, i) => {
  const photo   = row.querySelector('.about-photo-wrap');
  const content = row.querySelector('.about-content');
  const isRev   = row.classList.contains('reverse');
  if (photo) gsap.from(photo,   { scrollTrigger: { trigger: row, start: 'top 80%' }, x: isRev ? 60 : -60, opacity: 0, duration: 0.9, ease: 'power3.out' });
  if (content) gsap.from(content, { scrollTrigger: { trigger: row, start: 'top 80%' }, x: isRev ? -60 : 60, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 });
});

// Tool cards stagger
gsap.from('.tool-cat', {
  scrollTrigger: { trigger: '.tools-grid', start: 'top 80%' },
  y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out'
});

// Project cards
gsap.from('.proj-card', {
  scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
  y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out'
});

// Tags
gsap.from('.tag', {
  scrollTrigger: { trigger: '.tags-cloud', start: 'top 85%' },
  scale: 0.8, opacity: 0, stagger: 0.04, duration: 0.4, ease: 'back.out(1.7)'
});

// Contact links
gsap.from('.clink', {
  scrollTrigger: { trigger: '.clinks', start: 'top 80%' },
  x: -30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out'
});

/* ═══════════════════════════════════════
   6. SKILL BARS — animate on scroll
═══════════════════════════════════════ */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.tool-bar').forEach(bar => {
        bar.style.width = bar.getAttribute('data-w') + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.tool-cat').forEach(el => barObs.observe(el));

/* ═══════════════════════════════════════
   7. NAVBAR
═══════════════════════════════════════ */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
  });
});

/* ═══════════════════════════════════════
   8. MOBILE MENU
═══════════════════════════════════════ */
document.getElementById('burger').addEventListener('click', () => {
  document.getElementById('mob-menu').classList.toggle('open');
});
document.querySelectorAll('.mob-menu a').forEach(l => {
  l.addEventListener('click', () => document.getElementById('mob-menu').classList.remove('open'));
});

/* ═══════════════════════════════════════
   9. SMOOTH SCROLL
═══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 64, behavior: 'smooth' }); }
  });
});

/* ═══════════════════════════════════════
   10. CONTACT FORM
═══════════════════════════════════════ */
const form = document.getElementById('cform');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.fsub');
    const orig = btn.innerHTML;
    btn.innerHTML = 'MESSAGE SENT ✓';
    btn.style.cssText += ';background:rgba(0,255,157,0.1);border-color:var(--g);color:var(--g);';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.cssText = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* ═══════════════════════════════════════
   11. PROJECT CARD TILT — desktop only
═══════════════════════════════════════ */
if (!isMobile) {
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

/* ── Console Easter Egg ── */
console.log('%c[KP] KRUNAL PALIVAL — CYBERSECURITY PORTFOLIO', 'background:#020508;color:#00f3ff;font-family:monospace;font-size:14px;padding:8px 20px;border:1px solid #00f3ff;letter-spacing:2px;');
console.log('%c Ethical Hacker | VAPT | Security Researcher | Bhavnagar, India ', 'background:#020508;color:#bc13fe;font-family:monospace;font-size:11px;padding:4px 20px;');
console.log('%c👋 Stay ethical. Happy hacking!', 'color:#00ff9d;font-family:monospace;font-size:12px;');
