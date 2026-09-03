/* ═══════════════════════════════════════════
   KRUNAL PALIVAL — Portfolio JavaScript
   Features:
   • Particle Network Background (same as uploaded theme)
   • Typewriter Effect
   • Scroll Reveal Animations
   • Skill Bar Animations
   • Navbar Scroll Effect
   • Mobile Menu
   • Smooth Anchor Scroll
   • Active Nav Link Highlight
   • Contact Form Feedback
═══════════════════════════════════════════ */

/* ──────────────────────────────────────────
   1. PARTICLE NETWORK BACKGROUND
   (Exact same logic as uploaded theme)
────────────────────────────────────────── */
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x      = Math.random() * width;
    this.y      = Math.random() * height;
    this.vx     = (Math.random() - 0.5) * 1.5;
    this.vy     = (Math.random() - 0.5) * 1.5;
    this.radius = Math.random() * 2 + 1;
    this.alpha  = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width)  this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 243, 255, ${this.alpha})`;
    ctx.fill();
  }
}

// Spawn 90 particles (same count as uploaded theme)
for (let i = 0; i < 90; i++) particles.push(new Particle());

// Mouse interaction — particles gently attract to cursor
let mouse = { x: null, y: null };
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Update + Draw particles
  particles.forEach(p => {
    // Subtle mouse attraction
    if (mouse.x !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        p.vx += dx * 0.00015;
        p.vy += dy * 0.00015;
        // Cap velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5; }
      }
    }
    p.update();
    p.draw();
  });

  // Draw connecting lines (same as uploaded theme — 180px threshold)
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 243, 255, ${(1 - dist / 180) * 0.6})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();


/* ──────────────────────────────────────────
   2. TYPEWRITER EFFECT
────────────────────────────────────────── */
const roles = [
  'Cybersecurity Enthusiast',
  'Ethical Hacker',
  'Penetration Tester',
  'Security Researcher',
  'CTF Player',
  'Bug Hunter'
];
const typewriterEl = document.getElementById('typewriter');
let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typeTimeout = null;

function type() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  typeTimeout = setTimeout(type, speed);
}
type();


/* ──────────────────────────────────────────
   3. SCROLL REVEAL
────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ──────────────────────────────────────────
   4. SKILL BARS — Animate on scroll
────────────────────────────────────────── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width   = targetWidth + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillSection = document.getElementById('skills');
if (skillSection) barObserver.observe(skillSection);


/* ──────────────────────────────────────────
   5. NAVBAR — Scroll shadow + Active link
────────────────────────────────────────── */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Add scrolled class
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link highlight
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    link.style.textShadow = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color      = 'var(--accent)';
      link.style.textShadow = '0 0 8px rgba(0,243,255,0.5)';
    }
  });
});


/* ──────────────────────────────────────────
   6. MOBILE MENU
────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});


/* ──────────────────────────────────────────
   7. CONTACT FORM FEEDBACK
────────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>MESSAGE SENT ✓</span>';
    btn.style.background    = 'rgba(0,255,157,0.1)';
    btn.style.borderColor   = 'var(--accent3)';
    btn.style.color         = 'var(--accent3)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML  = originalText;
      btn.style.background  = '';
      btn.style.borderColor = '';
      btn.style.color       = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}


/* ──────────────────────────────────────────
   8. SMOOTH SCROLL for anchor links
────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
    }
  });
});


/* ──────────────────────────────────────────
   9. PROJECT CARDS — subtle parallax tilt
────────────────────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    this.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});


/* ──────────────────────────────────────────
   10. GLITCH EFFECT on hero name (hover)
────────────────────────────────────────── */
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.3s infinite';
  });
  heroName.addEventListener('mouseleave', function() {
    this.style.animation = '';
  });
}

// Glitch keyframes injected via JS
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
@keyframes glitch {
  0%   { text-shadow: 0 0 30px rgba(0,243,255,0.15); }
  20%  { text-shadow: -3px 0 var(--accent5), 3px 0 var(--accent2); }
  40%  { text-shadow: 3px 0 var(--accent), -3px 0 var(--accent3); clip-path: inset(10% 0 85% 0); }
  60%  { text-shadow: -3px 0 var(--accent2), 3px 0 var(--accent5); }
  80%  { text-shadow: 3px 0 var(--accent3), -3px 0 var(--accent); clip-path: inset(80% 0 5% 0); }
  100% { text-shadow: 0 0 30px rgba(0,243,255,0.15); clip-path: none; }
}
`;
document.head.appendChild(glitchStyle);


/* ──────────────────────────────────────────
   CONSOLE EASTER EGG
────────────────────────────────────────── */
console.log('%c', 'font-size:1px');
console.log(
  '%c KRUNAL PALIVAL — CYBERSECURITY PORTFOLIO ',
  'background: #03060a; color: #00f3ff; font-family: monospace; font-size: 14px; padding: 8px 20px; border: 1px solid #00f3ff;'
);
console.log(
  '%c [ Ethical Hacker | Security Researcher | Bhavnagar, Gujarat ] ',
  'background: #03060a; color: #bc13fe; font-family: monospace; font-size: 11px; padding: 4px 20px;'
);
console.log(
  '%c 👋 Hello, Fellow Hacker! Curiosity is the best tool. Stay ethical.',
  'color: #00ff9d; font-family: monospace; font-size: 12px; padding: 4px 0;'
);
