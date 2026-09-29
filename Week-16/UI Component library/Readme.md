# 🎨 UI Component Library - Tailwind CSS Component Showcase

A modern, responsive, dark-mode-first UI component library designed for landing pages and web applications built using **HTML5**, **Tailwind CSS**, and **Prism.js**.

---

## 🌟 Key Features

* **Theme Reveal Slider**: An interactive, touch/mouse draggable before/after slider comparing Light Mode and Dark Mode component states seamlessly.
* **Production-Ready Landing Page Components**:
  * Modern Dark Navbar & Navigation Header.
  * High-impact Hero Section with desktop & mobile optimized layouts.
  * Call-to-action buttons with hover animation & micro-interactions.
  * Section dividers and glassmorphic card elements.
* **Integrated Code Viewer**: Code snippets enhanced with **Prism.js** (VS Code Tomorrow theme) for instant developer copy-pasting.
* **Tailwind CSS Styling**: Utility-first CSS compiling via `input.css` to `output.css`.

---

## 📁 Folder Structure

```
UI Component library/
├── 📁 dist/
│   ├── 📁 assets/       # Visual media assets & screenshots
│   └── index.html      # Main component library showcase webpage
├── 📁 src/
│   ├── input.css       # Tailwind CSS source input stylesheet
│   └── output.css      # Compiled production CSS bundle
└── Readme.md           # Documentation
```

---

## 🖥️ Component Highlights

### 1. Theme Reveal Slider
Allows users to slide between Light Mode and Dark Mode views interactively using a range input overlay with custom clip-path clipping (`clip-path: inset(0 50% 0 0)`).

### 2. Modern Hero Section
Features responsive grid scaling (`flex-col-reverse lg:flex-row`), subtle action buttons, and responsive image toggling (`hidden md:block`).

---

## 🛠️ How to View & Develop

1. **Open Showcase**:
   Open `dist/index.html` directly in your browser or use Live Server extension in VS Code.

2. **Tailwind CSS Build Command** (if modifying `input.css`):
   ```bash
   npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
   ```

---

## 👤 Author

* **Uditya Pal**
* **Cohort**: Chai-Aur-Code Cohort (Week 16)
