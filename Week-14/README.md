<div align="center">

# 🚀 Chai Aur Code Cohort — Week 14

  <img src="./pose3.jpeg" alt="DOM Challenges Banner" width="750" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />

### 🎯 Master Ji Challenges Showcase

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![FreeAPI](https://img.shields.io/badge/FreeAPI-Integrated-00C7B7?style=for-the-badge&logo=api&logoColor=white)](https://freeapi.app)
[![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)]()

*A collection of 5 real-world frontend web development projects built with Vanilla HTML, CSS, and JavaScript as part of the **Chai Aur Code Cohort** Week 14 challenges.*

---

</div>

## 📌 Table of Contents

- [Overview](#-overview)
- [Projects Breakdown](#-projects-breakdown)
  - [1. Daily Mood Tracker](#1-daily-mood-tracker)
  - [2. YouTube Clone & Video Listing](#2-youtube-clone--video-listing)
  - [3. Dynamic Quote of the Day](#3-dynamic-quote-of-the-day)
  - [4. Dynamic Books Library](#4-dynamic-books-library)
  - [5. Real-Time Markdown Previewer](#5-real-time-markdown-previewer)
- [Tech Stack & Integrations](#-tech-stack--integrations)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
- [Key Learnings](#-key-learnings)
- [Acknowledgements](#-acknowledgements)

---

## 📖 Overview

Week 14 of the **Chai Aur Code Cohort** focuses on mastering fundamental and advanced Frontend JavaScript techniques, including:
- **Asynchronous JavaScript & REST API Integration** (Promises, Async/Await, `fetch`)
- **State Management & Web Storage** (`localStorage`)
- **Advanced DOM Manipulation & Event Handling**
- **Client-Side Filtering, Searching, and Sorting**
- **Integrating 3rd Party JS Libraries** (`marked.js`, `highlight.js`, `html2canvas`)

---

## 🎨 Projects Breakdown

---

### 1. Daily Mood Tracker
> **Directory**: [`./Master Ji Challenges/Master Ji 1`](./Master%20Ji%20Challenges/Master%20Ji%201)  
> **Key Concepts**: `localStorage`, Dynamic DOM Rendering, Calendar & Timeline Views

<div align="center">
  <img src="./Assets/Mood%20Tracker%20Master%20Ji%201.png" alt="Mood Tracker Preview" width="850" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>
</div>

#### 🌟 Features
- **Emoji Sentiment Logger**: Allows users to quickly log their mood (`😀 Happy`, `☹️ Sad`, `🫥 Neutral`, `🙃 Excited`).
- **Persistent Data**: Stores historical logs locally using browser `localStorage`.
- **Dual Visualizations**:
  - **Timeline View**: Chronological order of mood entries.
  - **Calendar View**: Grid calendar visualization mapping moods to dates.

---

### 2. YouTube Clone & Video Listing
> **Directory**: [`./Master Ji Challenges/Master Ji 2`](./Master%20Ji%20Challenges/Master%20Ji%202)  
> **Key Concepts**: REST API Integration, Responsive Grid, Real-Time Frontend Filter

<div align="center">
  <img src="./Assets/YouTube%20Clone%20Master%20Ji%202.png" alt="YouTube Clone Preview" width="850" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>
</div>

#### 🌟 Features
- **Live YouTube Data**: Integrates with [FreeAPI YouTube Endpoint](https://api.freeapi.app) to fetch video metadata.
- **Rich Media Grid**: Displays responsive video cards containing thumbnails, titles, channel info, view counts, and upload relative time.
- **Instant Search**: Frontend search filtering across video titles and channel names without extra API calls.
- **Direct Redirection**: Clicking cards redirects seamlessly to watch the selected video on YouTube.

---

### 3. Dynamic Quote of the Day
> **Directory**: [`./Master Ji Challenges/Master Ji 3`](./Master%20Ji%20Challenges/Master%20Ji%203)  
> **Key Concepts**: Async API Requests, Clipboard API, Social Sharing, Canvas Export

<div align="center">
  <img src="./Assets/QuoteOfTheDay%20Master%20Ji%203.png" alt="Quote of the Day Preview" width="850" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>
</div>

#### 🌟 Features
- **Random Quote Engine**: Fetches inspirational quotes & author details dynamically via FreeAPI.
- **Dynamic Backgrounds**: Randomizes aesthetic background visuals on every new quote request.
- **Clipboard & Social Integration**: One-click **Copy to Clipboard** and direct **Twitter / X Share** functionality.
- **Image Export**: Uses `html2canvas` to render and download the quote card as a PNG image to the user's computer.

---

### 4. Dynamic Books Library
> **Directory**: [`./Master Ji Challenges/Master Ji 4`](./Master%20Ji%20Challenges/Master%20Ji%204)  
> **Key Concepts**: Multi-criteria Sorting, View Switching, Infinite Scroll / Pagination

<div align="center">
  <img src="./Assets/BookLibrary%20Master%20Ji%204.png" alt="Book Library Preview" width="850" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>
</div>

#### 🌟 Features
- **Extensive Book Catalog**: Fetches book details (title, authors, publisher, release date, thumbnail) via FreeAPI.
- **Toggleable Layouts**: Switch seamlessly between **Grid View** and **List View**.
- **Real-Time Search & Sorting**: Search by title/author, and sort by Title (A-Z, Z-A) or Release Date (Newest/Oldest).
- **Infinite Scroll / Pagination**: Automatically fetches and appends the next page of books upon scrolling to the bottom.
- **External Preview Links**: Opens external book detail links (`infoLink`) in a new tab upon selection.

---

### 5. Real-Time Markdown Previewer
> **Directory**: [`./Master Ji Challenges/Master Ji 5`](./Master%20Ji%20Challenges/Master%20Ji%205)  
> **Key Concepts**: Live DOM Parsing, MarkedJS Integration, HighlightJS Syntax Highlighting

<div align="center">
  <img src="./Assets/Markdown%20Previewer%20Master%20Ji%205.png" alt="Markdown Previewer Preview" width="850" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>
</div>

#### 🌟 Features
- **Side-by-Side Split View**: Left-side live editor pane with a right-side rendered HTML preview pane.
- **Real-Time Parsing**: Uses `marked.js` to process markdown syntax instantly on keystroke.
- **Syntax Highlighting**: Code blocks are automatically highlighted with `highlight.js` (GitHub Dark theme).
- **One-Click Clear**: Quick clear button to clear the text area instantly.

---

## 🛠️ Tech Stack & Integrations

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure and markup across all projects |
| **CSS3** | Modern flexbox, grid layouts, glassmorphism, responsive styles |
| **JavaScript (ES6+)** | Dynamic DOM updates, event listeners, async/await |
| **[FreeAPI.app](https://freeapi.app)** | Backend APIs for YouTube videos, Quotes, and Books |
| **[marked.js](https://marked.js.org/)** | Client-side Markdown to HTML parsing |
| **[highlight.js](https://highlightjs.org/)** | Code syntax highlighting in Markdown previewer |
| **[html2canvas](https://html2canvas.hertzen.com/)** | Screenshot capture & canvas image export |
| **Browser LocalStorage** | Client-side persistence for mood log entries |

---

## 📁 Repository Structure

```text
Week-14/
│
├── Assets/                                # Showcase Screenshots & Demo Images
│   ├── BookLibrary Master Ji 4.png
│   ├── Markdown Previewer Master Ji 5.png
│   ├── Mood Tracker Master Ji 1.png
│   ├── QuoteOfTheDay Master Ji 3.png
│   └── YouTube Clone Master Ji 2.png
│
├── Master Ji Challenges/                   # Source Code for Challenges
│   ├── Master Ji 1/                       # Daily Mood Tracker
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── Master Ji 2/                       # YouTube Video Listing App
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── Master Ji 3/                       # Quote of the Day Generator
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── Master Ji 4/                       # Books Library Web App
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── Master Ji 5/                       # Real-Time Markdown Previewer
│       ├── index.html
│       ├── style.css
│       └── script.js
│
└── README.md                              # Main Documentation (You are here)
```

---

## ⚡ Getting Started

To run any of the projects locally on your computer:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YourUsername/Chai-Aur-Code-Cohort.git
   cd Chai-Aur-Code-Cohort/Week-14
   ```

2. **Open a Challenge**:
   Navigate into any challenge folder inside `Master Ji Challenges`:
   - For Master Ji 1: `cd "Master Ji Challenges/Master Ji 1"`
   - For Master Ji 2: `cd "Master Ji Challenges/Master Ji 2"`
   - For Master Ji 3: `cd "Master Ji Challenges/Master Ji 3"`
   - For Master Ji 4: `cd "Master Ji Challenges/Master Ji 4"`
   - For Master Ji 5: `cd "Master Ji Challenges/Master Ji 5"`

3. **Launch in Browser**:
   - Double click `index.html` to open it in your default browser, or
   - Use VS Code extension **Live Server** (`Right Click index.html -> Open with Live Server`).

---

## 💡 Key Learnings

1. **API Integration**: Learned how to fetch data asynchronously using native JavaScript `fetch()` API and handle JSON payloads cleanly.
2. **Client-side State Management**: Practiced saving data with `localStorage` and persisting user settings across reloads.
3. **Advanced UI Interactions**: Implemented searching, sorting, list vs. grid view toggling, and infinite scrolling.
4. **Third-Party Libraries**: Seamlessly integrated external libraries (`marked.js`, `highlight.js`, `html2canvas`) via CDN scripts.

---

## 🙌 Acknowledgements

Special thanks to **Hitesh Choudhary** and the **Chai Aur Code** team for providing excellent mentorship and challenging assignments.

---

<div align="center">
  <sub>Built with ❤️ during the <b>Chai Aur Code Cohort</b></sub>
</div>
