import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Code2, Command, Menu, Search, X } from 'lucide-react'
import { MotionConfig, motion } from 'framer-motion'
import lightLogo from './assets/atellix-logo.webp'
import darkLogo from './assets/atellix-logo-dark-transparent.webp'
import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'
import ThreeHeroScene from './components/ThreeHeroScene'
import MncMarqueeTicker from './components/MncMarqueeTicker'
import HomePlaygroundPreview from './components/HomePlaygroundPreview'
import HomeThemeStudio from './components/HomeThemeStudio'
import TestimonialCarousel from './components/TestimonialCarousel'
import DaisyUiShowcaseSections from './components/DaisyUiShowcaseSections'
import { creatorLinks, productFeatures } from './data/siteContent'
import { components as componentCatalog } from './data/componentCatalog'
import './App.css'
import './playground-preview.css'

const ComponentGallery = lazy(() => import('./components/ComponentGallery'))
const DotPortrait = lazy(() => import('./components/DotPortrait'))
const Playground = lazy(() => import('./components/Playground'))
const SystemPage = lazy(() => import('./components/SystemPage'))

const searchablePages = [
  { label: 'Components', description: 'Browse the interactive component library', path: '/components' },
  { label: 'Themes', description: 'Tune palettes and export design tokens', path: '/themes' },
  { label: 'Playground', description: 'Preview components and inspect the code', path: '/playground' },
  { label: 'Design system', description: 'Explore accessibility, spacing, and type', path: '/system' },
  { label: 'About AtellixUI', description: 'Learn about the project and its creator', path: '/about' },
  { label: 'Home', description: 'Return to the AtellixUI overview', path: '/' },
] as const

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [accentColor, setAccentColor] = useState('#ff8a3d')
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const [page, setPage] = useState<'home' | 'themes' | 'components' | 'playground' | 'system' | 'about'>(() => {
    const path = window.location.pathname.replace(/\/+$/, '')
    if (path === '/themes') return 'themes'
    if (path === '/components') return 'components'
    if (path === '/playground') return 'playground'
    if (path === '/system') return 'system'
    if (path === '/about') return 'about'
    return 'home'
  })
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [quickSearchOpen, setQuickSearchOpen] = useState(false)
  const [quickSearchQuery, setQuickSearchQuery] = useState('')
  const [selectedComponent, setSelectedComponent] = useState(() =>
    new URLSearchParams(window.location.search).get('component') ?? undefined,
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const quickSearchInputRef = useRef<HTMLInputElement>(null)
  const resourcesMenuRef = useRef<HTMLDetailsElement>(null)
  const normalizedSearchQuery = quickSearchQuery.trim().toLowerCase()
  const matchingPages = searchablePages.filter((item) =>
    `${item.label} ${item.description}`.toLowerCase().includes(normalizedSearchQuery),
  )
  const matchingComponents = componentCatalog
    .filter((item) =>
      `${item.name} ${item.category} ${item.summary}`.toLowerCase().includes(normalizedSearchQuery),
    )
    .slice(0, 6)

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setQuickSearchQuery('')
        setQuickSearchOpen((open) => !open)
      } else if (event.key === 'Escape') {
        setQuickSearchOpen(false)
      }
    }

    window.addEventListener('keydown', handleSearchShortcut)
    return () => window.removeEventListener('keydown', handleSearchShortcut)
  }, [])

  useEffect(() => {
    if (quickSearchOpen) quickSearchInputRef.current?.focus()
  }, [quickSearchOpen])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const syncPage = () => {
      const path = window.location.pathname.replace(/\/+$/, '')
      setPage(
        path === '/themes' ? 'themes'
          : path === '/components' ? 'components'
          : path === '/playground' ? 'playground'
            : path === '/system' ? 'system'
              : path === '/about' ? 'about'
                : 'home',
      )
      setSelectedComponent(new URLSearchParams(window.location.search).get('component') ?? undefined)
      setMobileNavOpen(false)
    }

    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  useEffect(() => {
    const titles = {
      home: 'AtellixUI — Thoughtful React Components',
      themes: 'Themes — AtellixUI',
      components: 'Components — AtellixUI',
      playground: 'Playground — AtellixUI',
      system: 'Design System — AtellixUI',
      about: 'About — AtellixUI',
    }
    document.title = titles[page]
  }, [page])

  useEffect(() => {
    if (page !== 'home') return

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
    )

    const observeRevealItems = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((item) => observer.observe(item))
    }

    const mutationObserver = new MutationObserver(observeRevealItems)
    mutationObserver.observe(rootRef.current ?? document.body, { childList: true, subtree: true })
    observeRevealItems()
    const revealVisibleItems = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((item) => {
        const bounds = item.getBoundingClientRect()
        if (bounds.top <= window.innerHeight && bounds.bottom >= 0) {
          item.classList.add('is-visible')
          observer.unobserve(item)
        }
      })
    }

    window.addEventListener('scroll', revealVisibleItems, { passive: true })
    window.addEventListener('resize', revealVisibleItems)
    // Double rAF ensures DOM is fully painted before checking positions on hard reload
    requestAnimationFrame(() => requestAnimationFrame(revealVisibleItems))
    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('scroll', revealVisibleItems)
      window.removeEventListener('resize', revealVisibleItems)
    }
  }, [page])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setCopyFailed(false)
      window.setTimeout(() => setCopied(false), 1200)
    } catch (error) {
      console.error('Unable to copy the development command:', error)
      setCopied(false)
      setCopyFailed(true)
      window.setTimeout(() => setCopyFailed(false), 2400)
    }
  }

  const toggleTheme = () => {
    setTheme((current) => current === 'dark' ? 'light' : 'dark')
  }

  const applyAccent = (color: string) => {
    setAccentColor(color)
    rootRef.current?.style.setProperty('--accent', color)
    rootRef.current?.style.setProperty('--accent-strong', color)
    rootRef.current?.style.setProperty('--accent-soft', `${color}1f`)
    rootRef.current?.style.setProperty('--line', `${color}2e`)
    rootRef.current?.style.setProperty('--shadow', `${color}24`)
  }

  const navigateToComponents = (componentId?: string) => {
    const url = new URL('/components', window.location.href)
    if (componentId) url.searchParams.set('component', componentId)
    window.history.pushState({}, '', url)
    setPage('components')
    setSelectedComponent(componentId)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMobileNavOpen(false)
    if (resourcesMenuRef.current) resourcesMenuRef.current.open = false
  }

  const navigateToPage = (path: '/' | '/themes' | '/playground' | '/system' | '/about') => {
    window.history.pushState({}, '', path)
    setPage(
      path === '/' ? 'home'
        : path === '/themes' ? 'themes'
        : path === '/playground' ? 'playground'
          : path === '/system' ? 'system'
            : 'about',
    )
    setMobileNavOpen(false)
    if (resourcesMenuRef.current) resourcesMenuRef.current.open = false
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const updateCardGlow = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    event.currentTarget.style.setProperty('--x', `${x}px`)
    event.currentTarget.style.setProperty('--y', `${y}px`)
  }

  return (
    <MotionConfig reducedMotion="user">
    <div
      ref={rootRef}
      className={`atellix-root relative isolate min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-[320ms] ${theme}`}
      data-theme={theme}
    >
      <nav className="top-nav" onKeyDown={(event) => {
        if (event.key === 'Escape') setMobileNavOpen(false)
      }}>
        <a href="/" className="brand" aria-label="Atellix UI home" onClick={(event) => {
          event.preventDefault()
          navigateToPage('/')
        }}>
          <img
            src={theme === 'light' ? lightLogo : darkLogo}
            className="brand-logo"
            alt=""
            width={720}
            height={240}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </a>

        <ul id="primary-navigation" className={mobileNavOpen ? 'is-open' : ''}>
          <li><a href="/components" aria-current={page === 'components' ? 'page' : undefined} onClick={(event) => {
            event.preventDefault()
            navigateToComponents()
          }}>Components</a></li>
          <li><a href="/themes" aria-current={page === 'themes' ? 'page' : undefined} onClick={(event) => {
            event.preventDefault()
            navigateToPage('/themes')
          }}>Themes</a></li>
          <li><a href="/playground" aria-current={page === 'playground' ? 'page' : undefined} onClick={(event) => {
            event.preventDefault()
            navigateToPage('/playground')
          }}>Playground</a></li>
          <li className="nav-resources-item">
            <details className="nav-resources" ref={resourcesMenuRef}>
              <summary aria-label="Open resources menu">Resources <ChevronDown size={14} aria-hidden="true" /></summary>
              <div className="nav-resources-menu">
                <a href="/system" aria-current={page === 'system' ? 'page' : undefined} onClick={(event) => {
                  event.preventDefault()
                  navigateToPage('/system')
                }}>Design system <span>Tokens, type, and accessibility</span></a>
                <a href="/about" aria-current={page === 'about' ? 'page' : undefined} onClick={(event) => {
                  event.preventDefault()
                  navigateToPage('/about')
                }}>About AtellixUI <span>Project and creator</span></a>
              </div>
            </details>
          </li>
          <li className="mobile-search-entry">
            <button type="button" onClick={() => { setMobileNavOpen(false); setQuickSearchOpen(true) }}>
              <Search size={15} aria-hidden="true" /> Search pages <kbd>Ctrl K</kbd>
            </button>
          </li>
          <li className="mobile-nav-cta">
            <a href="/themes" onClick={(event) => { event.preventDefault(); navigateToPage('/themes') }}>Explore themes <span aria-hidden="true">↗</span></a>
          </li>
        </ul>

        <button
          type="button"
          className="nav-search-trigger"
          aria-label="Search pages and components"
          onClick={() => setQuickSearchOpen(true)}
        >
          <Search size={15} aria-hidden="true" />
          <span>Search</span>
          <kbd><Command size={11} aria-hidden="true" /> K</kbd>
        </button>

        <button
          type="button"
          className={`mobile-nav-toggle ${mobileNavOpen ? 'is-open' : ''}`}
          aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="primary-navigation"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <Menu className="mobile-menu-icon" size={19} aria-hidden="true" />
          <X className="mobile-close-icon" size={19} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={`theme-toggle theme-pull ${theme}`}
          aria-label={`Pull the cord to switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'light'}
          onClick={toggleTheme}
        >
          <span key={theme} className="theme-pull-control" aria-hidden="true">
            <span className="theme-pull-cap" />
            <span className="theme-pull-line" onClick={(event) => { event.stopPropagation(); toggleTheme() }}>
              <svg className="theme-pull-rope" viewBox="0 0 18 54" focusable="false">
                <path d="M9 0 C9 13 9 26 9 40">
                  <animate
                    attributeName="d"
                    values="M9 0 C9 13 9 26 9 40;M9 0 C9 12 16 23 12 36;M9 0 C9 13 2 28 6 43;M9 0 C9 13 9 26 9 40"
                    keyTimes="0;0.32;0.7;1"
                    keySplines="0.22 1 0.36 1;0.22 1 0.36 1;0.22 1 0.36 1"
                    calcMode="spline"
                    dur="1.25s"
                    fill="freeze"
                  />
                </path>
                <circle cx="9" cy="45" r="4">
                  <animate attributeName="cx" values="9;12;6;9" keyTimes="0;0.32;0.7;1" keySplines="0.22 1 0.36 1;0.22 1 0.36 1;0.22 1 0.36 1" calcMode="spline" dur="1.25s" fill="freeze" />
                  <animate attributeName="cy" values="45;41;48;45" keyTimes="0;0.32;0.7;1" keySplines="0.22 1 0.36 1;0.22 1 0.36 1;0.22 1 0.36 1" calcMode="spline" dur="1.25s" fill="freeze" />
                </circle>
              </svg>
            </span>
            <span className="theme-pull-bulb" />
          </span>
          <span className="theme-toggle-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <a className="nav-cta" href="/themes" onClick={(event) => {
          event.preventDefault()
          navigateToPage('/themes')
        }}>
          <span>Explore themes</span>
          <span aria-hidden="true">↗</span>
        </a>
      </nav>

      {quickSearchOpen && (
        <div
          className="quick-search-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setQuickSearchOpen(false)
          }}
        >
          <section className="quick-search-dialog" role="dialog" aria-modal="true" aria-labelledby="quick-search-title">
            <h2 id="quick-search-title" className="sr-only">Search AtellixUI</h2>
            <div className="quick-search-input-wrap">
              <Search size={18} aria-hidden="true" />
              <input
                ref={quickSearchInputRef}
                type="search"
                value={quickSearchQuery}
                onChange={(event) => setQuickSearchQuery(event.target.value)}
                placeholder="Search pages and components..."
                aria-label="Search pages and components"
              />
              <kbd>ESC</kbd>
            </div>
            <div className="quick-search-results">
              {matchingPages.map((item) => (
                  <button
                    type="button"
                    key={`page-${item.path}`}
                    onClick={() => {
                      setQuickSearchOpen(false)
                      if (item.path === '/components') navigateToComponents()
                      else navigateToPage(item.path)
                    }}
                  >
                    <span className="quick-search-result-icon"><Search size={15} aria-hidden="true" /></span>
                    <span><strong>{item.label}</strong><small>Page · {item.description}</small></span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                ))}
              {matchingComponents.map((item) => (
                <button
                  type="button"
                  key={`component-${item.id}`}
                  onClick={() => {
                    setQuickSearchOpen(false)
                    navigateToComponents(item.id)
                  }}
                >
                  <span className="quick-search-result-icon"><Code2 size={15} aria-hidden="true" /></span>
                  <span><strong>{item.name}</strong><small>Component · {item.category}</small></span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              ))}
              {matchingPages.length === 0 && matchingComponents.length === 0 && (
                <p className="quick-search-empty">No pages or components match “{quickSearchQuery}”. Try “themes” or “button”.</p>
              )}
            </div>
            <div className="quick-search-hint"><span>Navigate to a page</span><span><kbd>ESC</kbd> to close</span></div>
          </section>
        </div>
      )}

      <main id="top">
        <motion.div
          key={page}
          className="route-transition"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className="route-loading" role="status">Loading AtellixUI tools…</div>}>
          {page === 'themes' ? (
            <section className="section-block themes-page">
              <div className="wrap">
                <a className="components-back-link" href="/" onClick={(event) => { event.preventDefault(); navigateToPage('/') }}>← Back to AtellixUI</a>
                <span className="eyebrow">THEME COLLECTION</span>
                <h1>Set the tone.<br /><em>Make it yours.</em></h1>
                <p className="lead">
                  Choose a canvas for your interface, then tune the accent palette and export the tokens for your own product.
                </p>
                <div className="theme-mode-grid" role="group" aria-label="Choose a theme">
                  <button type="button" className={`theme-mode-card ${theme === 'dark' ? 'is-selected' : ''}`} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}>
                    <span className="theme-mode-preview theme-mode-preview-dark" aria-hidden="true"><i /><i /><i /></span>
                    <span className="theme-mode-copy"><strong>Obsidian</strong><small>Deep surfaces with radiant accents</small></span>
                    <span className="theme-mode-status">{theme === 'dark' ? 'Active' : 'Preview'}</span>
                  </button>
                  <button type="button" className={`theme-mode-card ${theme === 'light' ? 'is-selected' : ''}`} onClick={() => setTheme('light')} aria-pressed={theme === 'light'}>
                    <span className="theme-mode-preview theme-mode-preview-light" aria-hidden="true"><i /><i /><i /></span>
                    <span className="theme-mode-copy"><strong>Soft Ivory</strong><small>Warm, considered light-mode surfaces</small></span>
                    <span className="theme-mode-status">{theme === 'light' ? 'Active' : 'Preview'}</span>
                  </button>
                </div>
                <div className="theme-studio-heading">
                  <span className="eyebrow">LIVE THEME STUDIO</span>
                  <h2>Fine-tune your design tokens.</h2>
                  <p className="lead">Change the accent color, test it on live components, and copy a ready-to-use token set.</p>
                </div>
                <HomeThemeStudio
                  currentTheme={theme}
                  accentColor={accentColor}
                  onToggleTheme={toggleTheme}
                  onSelectAccent={applyAccent}
                />
              </div>
            </section>
          ) : page === 'components' ? (
            <section className="section-block components-page">
            <div className="wrap">
              <a className="components-back-link" href="/" onClick={(event) => {
                event.preventDefault()
                navigateToPage('/')
              }}>← Back to AtellixUI</a>
              <span className="eyebrow">THE COMPONENT LIBRARY</span>
              <h1>Thoughtful building blocks.<br /><em>Ready for your next idea.</em></h1>
              <p className="lead">
                Browse the interactive library for product interfaces, landing pages, and everyday workflows.
                Select a component to try it, inspect its React source, and copy it into your project.
              </p>
                <ComponentGallery
                  key={`component-library-${selectedComponent ?? 'default'}`}
                  mode="library"
                  theme={theme}
                  onToggleTheme={toggleTheme}
                  initialId={selectedComponent}
                />
            </div>
          </section>

        ) : page === 'playground' ? (
          <section className="section-block playground-page">
            <div className="wrap">
              <a className="components-back-link" href="/" onClick={(event) => { event.preventDefault(); navigateToPage('/') }}>← Back to AtellixUI</a>
              <span className="eyebrow">THE INTERACTIVE WORKSPACE</span>
              <h1>Make it yours.<br /><em>See it come together.</em></h1>
              <p className="lead">
                Choose Quick preview for an immediate, lightweight component setup, or switch to the live code editor to change React source and see it run.
              </p>
              <Playground theme={theme} />
            </div>
          </section>

        ) : page === 'system' ? (
          <SystemPage
            theme={theme}
            accentColor={accentColor}
            onToggleTheme={toggleTheme}
            onSelectAccent={applyAccent}
            onNavigateHome={() => navigateToPage('/')}
            onNavigateToThemes={() => navigateToPage('/themes')}
            onNavigateToComponents={() => navigateToComponents()}
          />

        ) : page === 'about' ? (
          <section className="section-block about-page">
            <div className="wrap">
              <a className="components-back-link" href="/" onClick={(event) => { event.preventDefault(); navigateToPage('/') }}>← Back to AtellixUI</a>
              <span className="eyebrow">THE PERSON BEHIND THE SYSTEM</span>
              <h1>Built with curiosity.<br /><em>Designed for real work.</em></h1>
              <p className="lead">AtellixUI is an independent component-system prototype exploring how thoughtful design, practical code, and motion can work together.</p>
              <div className="about-founder-card">
                <div className="about-founder-copy">
                  <span className="eyebrow">ARCHITECT & LEAD ENGINEER</span>
                  <h2>Uditya Pal</h2>
                  <p>Full-stack web developer working across HTML, CSS, JavaScript, Node.js, Express, and MongoDB. Public projects range from learning-in-public repositories to Atellix-UI, an AI salary prediction model, Smart Study Planner, PrepConnect, and a personal portfolio.</p>
                  <div className="link-row">
                    {creatorLinks.map((link) => link.label === 'GitHub' ? (
                      <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="profile-link github-profile-link" aria-label="Visit Uditya Pal's GitHub profile and explore repositories">
                        <span className="github-orbit" aria-hidden="true"><span className="github-orbit-track" /><Code2 size={20} /><i /></span>
                        <span className="github-link-copy"><strong>GitHub</strong><small>Explore repositories</small></span>
                        <ArrowUpRight className="github-link-arrow" size={15} />
                      </a>
                    ) : <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="profile-link">{link.label}<ArrowUpRight size={14} /></a>)}
                  </div>
                </div>
                <DotPortrait theme={theme} />
              </div>
              <div className="about-note"><span className="system-index">ATX</span><p>AtellixUI is currently a frontend prototype. The component library, live playground, and design system are actively evolving; CLI and MCP distribution remain future product direction.</p></div>
            </div>
          </section>

        ) : (
          <>
          <section className="hero">
          <div className="wrap hero-layout">
            <div className="hero-copy reveal">
              <div className="hero-kicker">
                <span className="status-dot" aria-hidden="true" />
                <span>React component system</span>
                <span className="kicker-divider" />
                <span>01 / 04</span>
              </div>
              <h1>
                A sharper standard for <em>digital interfaces.</em>
              </h1>
              <p className="sub">
                AtellixUI brings considered design tokens, useful React components, and restrained
                motion into one cohesive system.
              </p>

              <div className="row">
                <a href="/components" className="btn" onClick={(event) => {
                  event.preventDefault()
                  navigateToComponents()
                }}>Explore components <span aria-hidden="true">↗</span></a>
                <a href="/system" className="text-link" onClick={(event) => { event.preventDefault(); navigateToPage('/system') }}>Discover the system <span aria-hidden="true">↗</span></a>
              </div>

              <div className="cmd hero-command" role="group" aria-label="Development command">
                <span className="mono"><b>$</b> npm run dev</span>
                <button type="button" onClick={() => handleCopy('npm run dev')} aria-live="polite">
                  {copied ? 'Copied' : copyFailed ? 'Copy failed' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="hero-visual reveal">
              <div className="hero-art" role="img" aria-label="Abstract orange-accented 3D component stack">
                <div className="hero-art-glow" />
                <ErrorBoundary name="ThreeHeroScene">
                  <ThreeHeroScene />
                </ErrorBoundary>
                <span className="art-index mono">ATX <span>—</span> 001</span>
              </div>
              <div className="hero-visual-meta">
                <span>Built on a token-first foundation</span>
                <span className="hero-meta-line" />
                <span>React · TypeScript · Tailwind</span>
              </div>
            </div>
          </div>
          </section>

          <section id="system" className="section-block reveal">
          <div className="wrap">
            <span className="eyebrow">Why teams pick AtellixUI</span>
            <h2>Built for production products, not just pretty demos.</h2>
            <p className="lead">
              Modern design systems need to balance accessibility, customization, and performance.
              AtellixUI brings those principles together in a motion-first foundation with flexible
              component architecture.
            </p>

            <div className="grid g3">
              {productFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="card reveal"
                  onPointerMove={updateCardGlow}
                  onPointerLeave={(event) => {
                    event.currentTarget.style.setProperty('--x', '50%')
                    event.currentTarget.style.setProperty('--y', '50%')
                  }}
                >
                  <div className="tag">{feature.category}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <a className="card-link" href="/playground" onClick={(event) => { event.preventDefault(); navigateToPage('/playground') }}>Explore in playground <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>


        <section id="components" className="section-block reveal">
          <div className="wrap">
            <span className="eyebrow">Component library</span>
            <h2>Start with a strong building block.</h2>
            <p className="lead">
              Explore six working examples from a growing collection of original components. Each one is designed to be clear, adaptable, and useful beyond the demo.
            </p>
            <Suspense fallback={<div className="component-gallery-loading" aria-hidden="true" />}>
              <ComponentGallery
                mode="featured"
                theme={theme}
                onToggleTheme={toggleTheme}
                onNavigateToComponent={navigateToComponents}
              />
            </Suspense>
            <button type="button" className="components-explore-button" onClick={() => navigateToComponents()}>
              Explore all components <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>


        <section id="sandbox" className="section-block reveal">
          <div className="wrap">
            <span className="eyebrow">INTERACTIVE WORKBENCH</span>
            <h2>From first tweak to ready-to-use code.</h2>
            <p className="lead">
              Shape a component, preview responsive states in real-time, inspect clean TSX code, and launch into the live Sandpack IDE.
            </p>
            <Suspense fallback={<div className="route-loading" role="status">Loading playground…</div>}>
              <HomePlaygroundPreview onNavigate={() => navigateToPage('/playground')} />
            </Suspense>
          </div>
        </section>


        {/* MNC Engineers Marquee Animation Loop (Right to Left & Left to Right) */}
        <MncMarqueeTicker />

        <section id="theme" className="section-block reveal">
          <div className="wrap">
            <span className="eyebrow">TOKEN LABORATORY</span>
            <h2>Configure the visual language to fit your product.</h2>
            <p className="lead">
              One shared token store keeps your site, previews, and primitives in sync. Switch between deep obsidian and warm ivory, customize radiant accents, and export clean JSON tokens.
            </p>
            <HomeThemeStudio
              currentTheme={theme}
              accentColor={accentColor}
              onToggleTheme={toggleTheme}
              onSelectAccent={(token) => {
                applyAccent(token)
              }}
            />
          </div>
        </section>


        {/* DaisyUI-Inspired Mockup, KPI, FAQ, and CTA Sections */}
        <TestimonialCarousel />
        <DaisyUiShowcaseSections
          onNavigateToComponents={navigateToComponents}
          onNavigateToPlayground={() => navigateToPage('/playground')}
        />

        <section id="creator" className="section-block creator-block reveal">
          <div className="wrap creator-wrap">
            <div className="creator-copy">
              <span className="eyebrow">Architect & Lead Engineer</span>
              <h2>Uditya Pal</h2>
              <p>
                Full-Stack MERN / Next.js Developer & WebXR Engineer crafting product systems that
                unify beautiful interfaces with measurable engineering discipline.
              </p>

              <div className="link-row">
                {creatorLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="profile-link">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <DotPortrait theme={theme} />
          </div>
        </section>

          </>
        )}
          </Suspense>
        </motion.div>
      </main>
      <Footer
        theme={theme}
        onNavigate={(path) => {
          if (path === '/components') {
            navigateToComponents()
          } else {
            navigateToPage(path as '/' | '/themes' | '/playground' | '/system' | '/about')
          }
        }}
      />
    </div>
    </MotionConfig>
  )
}

export default App
