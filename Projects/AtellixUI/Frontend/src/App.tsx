import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Code2, Menu, X } from 'lucide-react'
import { MotionConfig, motion } from 'framer-motion'
import lightLogo from './assets/atellix-logo.png'
import darkLogo from './assets/atellix-logo-dark-transparent.png'
import ComponentGallery from './components/ComponentGallery'
import DotPortrait from './components/DotPortrait'
import Playground from './components/Playground'
import ThreeHeroScene from './components/ThreeHeroScene'
import { creatorLinks, productFeatures, themeTokens } from './data/siteContent'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [copied, setCopied] = useState(false)
  const [page, setPage] = useState<'home' | 'components' | 'playground' | 'system' | 'about'>(() => {
    const path = window.location.pathname.replace(/\/+$/, '')
    if (path === '/components') return 'components'
    if (path === '/playground') return 'playground'
    if (path === '/system') return 'system'
    if (path === '/about') return 'about'
    return 'home'
  })
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState(() =>
    new URLSearchParams(window.location.search).get('component') ?? undefined,
  )
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const syncPage = () => {
      const path = window.location.pathname.replace(/\/+$/, '')
      setPage(
        path === '/components' ? 'components'
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
      components: 'Components — AtellixUI',
      playground: 'Playground — AtellixUI',
      system: 'Design System — AtellixUI',
      about: 'About — AtellixUI',
    }
    document.title = titles[page]
  }, [page])

  useEffect(() => {
    if (page !== 'home') return

    const revealItems = document.querySelectorAll<HTMLElement>('.reveal')
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

    revealItems.forEach((item) => observer.observe(item))
    const revealVisibleItems = () => {
      revealItems.forEach((item) => {
        if (item.classList.contains('is-visible')) return
        const bounds = item.getBoundingClientRect()
        if (bounds.top <= window.innerHeight && bounds.bottom >= 0) {
          item.classList.add('is-visible')
          observer.unobserve(item)
        }
      })
    }

    window.addEventListener('scroll', revealVisibleItems, { passive: true })
    window.addEventListener('resize', revealVisibleItems)
    revealVisibleItems()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', revealVisibleItems)
      window.removeEventListener('resize', revealVisibleItems)
    }
  }, [page])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  const toggleTheme = () => {
    setTheme((current) => current === 'dark' ? 'light' : 'dark')
  }

  const navigateToComponents = (componentId?: string) => {
    const url = new URL('/components', window.location.href)
    if (componentId) url.searchParams.set('component', componentId)
    window.history.pushState({}, '', url)
    setPage('components')
    setSelectedComponent(componentId)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMobileNavOpen(false)
  }

  const navigateToPage = (path: '/' | '/playground' | '/system' | '/about') => {
    window.history.pushState({}, '', path)
    setPage(
      path === '/' ? 'home'
        : path === '/playground' ? 'playground'
          : path === '/system' ? 'system'
            : 'about',
    )
    setMobileNavOpen(false)
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
    <div ref={rootRef} className={`atellix-root ${theme}`} data-theme={theme}>
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
            alt="Atellix UI"
          />
        </a>

        <ul id="primary-navigation" className={mobileNavOpen ? 'is-open' : ''}>
          <li><a href="/system" aria-current={page === 'system' ? 'page' : undefined} onClick={(event) => {
            event.preventDefault()
            navigateToPage('/system')
          }}>System</a></li>
          <li><a href="/components" aria-current={page === 'components' ? 'page' : undefined} onClick={(event) => {
            event.preventDefault()
            navigateToComponents()
          }}>Components</a></li>
          <li><a href="/playground" aria-current={page === 'playground' ? 'page' : undefined} onClick={(event) => {
            event.preventDefault()
            navigateToPage('/playground')
          }}>Playground</a></li>
          <li><a href="/about" aria-current={page === 'about' ? 'page' : undefined} onClick={(event) => {
            event.preventDefault()
            navigateToPage('/about')
          }}>About</a></li>
          <li className="mobile-nav-cta">
            <a href="/components" onClick={(event) => { event.preventDefault(); navigateToComponents() }}>Explore components <span aria-hidden="true">↗</span></a>
          </li>
        </ul>

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

        <a className="nav-cta" href="/components" onClick={(event) => {
          event.preventDefault()
          navigateToComponents()
        }}>
          <span>Explore components</span>
          <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <main id="top">
        <motion.div
          key={page}
          className="route-transition"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
        {page === 'components' ? (
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
                key="component-library"
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
          <section className="section-block system-page">
            <div className="wrap">
              <a className="components-back-link" href="/" onClick={(event) => { event.preventDefault(); navigateToPage('/') }}>← Back to AtellixUI</a>
              <span className="eyebrow">THE ATELLIX FOUNDATION</span>
              <h1>A system with <em>intention.</em></h1>
              <p className="lead">A practical visual language for building consistent interfaces: tokens first, accessible patterns by default, and motion that earns its place.</p>
              <div className="system-token-panel">
                <div className="system-page-heading"><span className="system-index">01</span><div><h2>Color tokens</h2><p>Warm orange accents, balanced surfaces, and readable contrast in both themes.</p></div></div>
                <div className="system-token-grid">
                  {themeTokens.map((token, index) => <div className="system-token" key={token}><span style={{ background: token }} /><strong>{['Orange 300', 'Orange 400', 'Orange 500', 'Orange 600', 'Orange 700'][index]}</strong><code>{token}</code></div>)}
                </div>
              </div>
              <div className="system-principles">
                {productFeatures.map((feature, index) => <motion.article className="system-principle" key={feature.title} whileHover={{ y: -4 }} transition={{ duration: 0.18 }}><span className="system-index">0{index + 2}</span><div className="tag">{feature.category}</div><h2>{feature.title}</h2><p>{feature.description}</p></motion.article>)}
              </div>
              <div className="system-architecture">
                <div><span className="eyebrow">BUILT IN LAYERS</span><h2>One foundation.<br /><em>Multiple ways to build.</em></h2></div>
                <div className="architecture-stack">
                  <article><span>01</span><div><strong>Foundation</strong><small>Tokens · accessibility · shared patterns</small></div></article>
                  <article><span>02</span><div><strong>Components</strong><small>Useful primitives · product layouts · motion</small></div></article>
                  <article><span>03</span><div><strong>Workflow</strong><small>Live previews · source inspection · copyable JSX</small></div></article>
                </div>
              </div>
              <button type="button" className="components-explore-button" onClick={() => navigateToComponents()}>Explore the component library <span aria-hidden="true">↗</span></button>
            </div>
          </section>
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

              <div className="cmd hero-command" aria-label="Copy installation command">
                <span className="mono"><b>$</b> npx atellix init</span>
                <button type="button" onClick={() => handleCopy('npx atellix init')}>
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="hero-visual reveal">
              <div className="hero-art" aria-label="Abstract orange-accented 3D component stack">
                <div className="hero-art-glow" />
                <ThreeHeroScene />
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
            <ComponentGallery
              mode="featured"
              theme={theme}
              onToggleTheme={toggleTheme}
              onNavigateToComponent={navigateToComponents}
            />
            <button type="button" className="components-explore-button" onClick={() => navigateToComponents()}>
              Explore all components <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>

        <section id="sandbox" className="section-block reveal">
          <div className="wrap">
            <span className="eyebrow">Playground</span>
            <h2>From first tweak to ready-to-use code.</h2>
            <p className="lead">Shape a component, preview responsive states, and copy a working JSX snippet from one focused workspace.</p>
            <button type="button" className="components-explore-button" onClick={() => navigateToPage('/playground')}>Open the playground <span aria-hidden="true">↗</span></button>
          </div>
        </section>

        <section className="section-block reveal">
          <div className="wrap">
            <span className="eyebrow">Theme system</span>
            <h2>Configure the visual language to fit your product.</h2>
            <p className="lead">One shared theme keeps the site, previews, and controls in sync. Switch between a deep obsidian canvas and a warm, understated light surface.</p>
            <div className="swatch-row" aria-label="Color palette picker">
              {themeTokens.map((token) => (
                <button
                  key={token}
                  type="button"
                  className="swatch"
                  style={{ background: token }}
                  aria-label={`Set primary ${token}`}
                  onClick={() => {
                    rootRef.current?.style.setProperty('--accent', token)
                  }}
                />
              ))}
            </div>
          </div>
        </section>

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
        </motion.div>
      </main>
      <footer className="site-footer">
        <div className="wrap site-footer-inner">
          <a href="/" className="footer-brand" onClick={(event) => { event.preventDefault(); navigateToPage('/') }}><img src={theme === 'light' ? lightLogo : darkLogo} alt="" /><span>Thoughtful interfaces, built to move.</span></a>
          <nav aria-label="Footer navigation">
            <a href="/system" onClick={(event) => { event.preventDefault(); navigateToPage('/system') }}>System</a>
            <a href="/components" onClick={(event) => { event.preventDefault(); navigateToComponents() }}>Components</a>
            <a href="/playground" onClick={(event) => { event.preventDefault(); navigateToPage('/playground') }}>Playground</a>
            <a href="/about" onClick={(event) => { event.preventDefault(); navigateToPage('/about') }}>About</a>
          </nav>
          <span className="footer-copyright">© {new Date().getFullYear()} AtellixUI · Made by Uditya Pal</span>
        </div>
      </footer>
    </div>
    </MotionConfig>
  )
}

export default App
