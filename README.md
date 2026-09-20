# Novenda - Network Engineer & NOC Engineer Portfolio

A modern, fast, and responsive portfolio website designed specifically for a **Network Engineer / NOC Engineer**. Built with pure semantic HTML5, modern CSS3 (custom properties, glassmorphism, responsive grid), and vanilla JavaScript with zero external dependencies or frameworks.

---

## Features

- **Dark Navy / Cyber-Minimalist Aesthetic**: High-contrast, clean theme with electric blue/cyan accents (`#38bdf8`) and subtle glassmorphic elements.
- **Interactive Network Topology Canvas**: Lightweight, high-performance background simulation of router/switch nodes, topology links, and packet flows with mouse interaction.
- **All 7 Sections**:
  1. **Hero**: Professional header, tagline, terminal-styled router console, and action buttons.
  2. **About Me**: Features Novenda's authentic statement: *"I work in network operations and enjoy troubleshooting networks, routing, and network infrastructure."*
  3. **Technical Skills**: 11 targeted networking & NOC skills (MikroTik, BGP, OSPF, VLAN, Routing, VPN, L2TP, EoIP, QoS, Network Troubleshooting, Network Monitoring) with interactive category filtering.
  4. **Projects & Technical Implementations**: 6 structured implementations (Multi-WAN & PBR, MikroTik Infrastructure, Network Troubleshooting, BGP & Routing, VPN & Tunnel, Network Monitoring) categorized into Production, Case Studies, and Labs.
  5. **Experience**: Chronological timeline tailored for NOC / Network Support roles with placeholders for company details, locations, and milestones.
  6. **Certifications**: Credential cards with status badges and placeholders for vendor certifications (MikroTik MTCNA/MTCRE, Cisco CCNA, etc.).
  7. **Contact**: Quick-access cards with one-click copy buttons for Email, WhatsApp, and LinkedIn, alongside an interactive message form.
- **Strictly Authentic**: Zero fake statistics, telemetry, or fabricated companies. All unprovided details clearly use customizable placeholders (e.g., `[Company / ISP Name]`, `[Your Email]`, `[Your WhatsApp]`, `[Your LinkedIn]`).
- **Fully Responsive**: Optimized for smartphones, tablets, and wide desktop displays.
- **Fast & Accessible**: Valid semantic markup, high-contrast text (WCAG AA), keyboard navigation, and `prefers-reduced-motion` compliance.

---

## File Structure

```
d:\portofolio-novenda\
├── index.html              # Main single-page portfolio
├── favicon.svg             # Custom network router node icon
├── css/
│   ├── style.css           # Design tokens, typography, layout, and responsive styles
│   └── animations.css      # Smooth transitions, breathing dot, and scroll reveals
├── js/
│   ├── network-canvas.js   # Background network topology and packet simulation
│   └── main.js             # Mobile menu, skill filters, copy-to-clipboard, form handler
└── README.md               # Customization & deployment guide
```

---

## How to Customize Placeholders

Open `index.html` in your favorite editor (e.g. VS Code) and search for the brackets `[` to locate placeholders:

1. **Contact Information**:
   - Replace `[Your Email]` with your actual email address.
   - Replace `[Your WhatsApp]` with your WhatsApp number.
   - Replace `[Your LinkedIn]` with your LinkedIn vanity URL.
2. **Professional Experience**:
   - Update `[Company / ISP / Organization Name]`, `[Month Year – Present]`, and `[City, Country]`.
   - Tailor the bullet points to your specific daily tasks and tools.
3. **Certifications**:
   - Replace placeholder cards with your actual certifications (e.g., MikroTik MTCNA, MTCRE, MTCWE, CCNA, CompTIA Network+).
   - Add your Certificate ID and year of completion.

---

## Local Preview

Because this is a pure static website with zero dependencies, you can open it directly:

1. **Directly in Browser**:
   - Double-click `index.html` or open it with Google Chrome, Microsoft Edge, Firefox, or Safari.

2. **Using Python Local Server**:
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your web browser.

---

## Deployment Options (Free & Instant)

### Option A: GitHub Pages
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In GitHub, navigate to **Settings** > **Pages** > Select **main branch** as source > Save.

### Option B: Cloudflare Pages / Netlify / Vercel
- Drag and drop this folder directly into the dashboard of Cloudflare Pages, Netlify, or Vercel for instant worldwide CDN deployment with free custom SSL.
