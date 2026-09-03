# Krunal Palival — Cybersecurity Portfolio

> Personal portfolio website for Krunal Palival — Cybersecurity Enthusiast, Ethical Hacker & Security Researcher from Bhavnagar, Gujarat, India.

## 🖥️ Live Preview
**[https://KrunalPalival.github.io](https://KrunalPalival.github.io)**

---

## 🎨 Theme Features
- **Particle Network Background** — animated cyan nodes with connecting lines (reacts to mouse)
- **CRT Scanline Overlay** — retro hacking terminal feel
- **Moving Scan Beam** — glowing line animation across the screen
- **Glitch Effect** — hero name glitches on hover
- **Typewriter Effect** — cycling roles in the hero section
- **Scroll Reveal Animations** — sections fade in on scroll
- **Skill Bar Animations** — bars animate when scrolled into view
- **Mobile Responsive** — fully responsive down to 320px

---

## 📁 File Structure

```
krunal-portfolio/
├── index.html              ← Main HTML (single page)
├── README.md               ← This file
└── assets/
    ├── css/
    │   └── style.css       ← All styles + theme
    ├── js/
    │   └── script.js       ← All JavaScript + animations
    └── images/
        └── (add your photo here as profile.jpg)
```

---

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Step 1 — Create GitHub Repo
1. Go to [github.com](https://github.com) → **New Repository**
2. Name it exactly: `KrunalPalival.github.io` *(replace with your GitHub username)*
3. Set to **Public** → Click **Create repository**

### Step 2 — Upload Files
**Option A — Via GitHub Website (No Git needed):**
1. Open your new repo
2. Click **Add file** → **Upload files**
3. Upload all files maintaining the folder structure
4. Click **Commit changes**

**Option B — Via Git (Terminal):**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/KrunalPalival/KrunalPalival.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to repo **Settings** → **Pages** (left sidebar)
2. Under **Source** → Select **main** branch → **/ (root)**
3. Click **Save**
4. Wait 2-3 minutes → Your site is live at `https://KrunalPalival.github.io`

---

## ✏️ Customize

### Update Your Info (`index.html`)
| What to change | Where in HTML |
|---|---|
| Your name | `.hero-name`, `.info-row` |
| Email | `href="mailto:..."` in contact section |
| GitHub link | All `href="https://github.com/..."` |
| LinkedIn | `href="https://linkedin.com/in/..."` |
| TryHackMe | `href="https://tryhackme.com/p/..."` |
| Projects | `.project-card` divs in Projects section |
| Certifications | `.cert-card` divs in Certifications section |
| Skill bars | `data-width="85"` values (0-100) |

### Add Your Resume
1. Place your PDF as `assets/Krunal_Palival_Resume.pdf`
2. The **Download Resume** button will automatically work

### Add Your Photo *(optional)*
1. Add `assets/images/profile.jpg`
2. In `index.html` inside `.about-card-col`, add:
```html
<img src="assets/images/profile.jpg" alt="Krunal Palival" class="profile-img">
```

### Change Colors (`assets/css/style.css`)
```css
:root {
  --accent:  #00f3ff;   /* Main cyan */
  --accent2: #bc13fe;   /* Purple */
  --accent3: #00ff9d;   /* Green */
  --accent4: #ff9900;   /* Orange */
}
```

---

## 🛠️ Tech Stack
- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** — No frameworks, no dependencies
- **Google Fonts** — Share Tech Mono, Rajdhani, Inter

---

## 📄 License
MIT License — Free to use and modify for personal use.

---

*Built with ❤️ + ☠️ by Krunal Palival*
