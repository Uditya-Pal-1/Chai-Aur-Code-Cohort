import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { Search, X } from 'lucide-react'
import type { Theme } from './ui/types'
import { categoryList, components, featuredIds, previewFiles, type ComponentId } from '../data/componentCatalog'
import MotionShowcasePreview from './ui/MotionShowcasePreview'

const componentSources = import.meta.glob<string>('./ui/*Preview.tsx', {
  query: '?raw',
  import: 'default',
})

const AccordionPreview = lazy(() => import('./ui/AccordionPreview'))
const AccessibleTabsPreview = lazy(() => import('./ui/AccessibleTabsPreview'))
const AccentControlsPreview = lazy(() => import('./ui/AccentControlsPreview'))
const AdvancedDropzonePreview = lazy(() => import('./ui/AdvancedDropzonePreview'))
const AdvancedTablePreview = lazy(() => import('./ui/AdvancedTablePreview'))
const AppCardPreview = lazy(() => import('./ui/AppCardPreview'))
const BentoLayoutPreview = lazy(() => import('./ui/BentoLayoutPreview'))
const BorderBeamCardPreview = lazy(() => import('./ui/BorderBeamCardPreview'))
const BookLibraryPreview = lazy(() => import('./ui/BookLibraryPreview'))
const BreadcrumbsPreview = lazy(() => import('./ui/BreadcrumbsPreview'))
const CalculatorPreview = lazy(() => import('./ui/CalculatorPreview'))
const CartControlPreview = lazy(() => import('./ui/CartControlPreview'))
const CharacterCounterPreview = lazy(() => import('./ui/CharacterCounterPreview'))
const CommandPalettePreview = lazy(() => import('./ui/CommandPalettePreview'))
const ConfirmDialogPreview = lazy(() => import('./ui/ConfirmDialogPreview'))
const ComprehensiveFooterPreview = lazy(() => import('./ui/ComprehensiveFooterPreview'))
const ContactFormPreview = lazy(() => import('./ui/ContactFormPreview'))
const ContentScrollerPreview = lazy(() => import('./ui/ContentScrollerPreview'))
const ContrastCheckerPreview = lazy(() => import('./ui/ContrastCheckerPreview'))
const CoreUIKitPreview = lazy(() => import('./ui/CoreUIKitPreview'))
const CountdownTimerPreview = lazy(() => import('./ui/CountdownTimerPreview'))
const DashboardLayoutPreview = lazy(() => import('./ui/DashboardLayoutPreview'))
const DataTablePreview = lazy(() => import('./ui/DataTablePreview'))
const DateRangePreview = lazy(() => import('./ui/DateRangePreview'))
const DesignSliderPreview = lazy(() => import('./ui/DesignSliderPreview'))
const DigitalClockPreview = lazy(() => import('./ui/DigitalClockPreview'))
const DiceRollerPreview = lazy(() => import('./ui/DiceRollerPreview'))
const DragDropBoardPreview = lazy(() => import('./ui/DragDropBoardPreview'))
const FeatureGridPreview = lazy(() => import('./ui/FeatureGridPreview'))
const FileDropzonePreview = lazy(() => import('./ui/FileDropzonePreview'))
const FooterLayoutPreview = lazy(() => import('./ui/FooterLayoutPreview'))
const GlassNavbarPreview = lazy(() => import('./ui/GlassNavbarPreview'))
const HamburgerMenuPreview = lazy(() => import('./ui/HamburgerMenuPreview'))
const HeroLayoutPreview = lazy(() => import('./ui/HeroLayoutPreview'))
const ImageCarouselPreview = lazy(() => import('./ui/ImageCarouselPreview'))
const ImageBentoPreview = lazy(() => import('./ui/ImageBentoPreview'))
const InteractiveControlsPreview = lazy(() => import('./ui/InteractiveControlsPreview'))
const KanbanBoardPreview = lazy(() => import('./ui/KanbanBoardPreview'))
const MarkdownPreview = lazy(() => import('./ui/MarkdownPreview'))
const MemoryGamePreview = lazy(() => import('./ui/MemoryGamePreview'))
const ModernCarouselPreview = lazy(() => import('./ui/ModernCarouselPreview'))
const MoodTrackerPreview = lazy(() => import('./ui/MoodTrackerPreview'))
const NavBarLayoutPreview = lazy(() => import('./ui/NavBarLayoutPreview'))
const NotificationInboxPreview = lazy(() => import('./ui/NotificationInboxPreview'))
const OtpInputPreview = lazy(() => import('./ui/OtpInputPreview'))
const PageHeaderPreview = lazy(() => import('./ui/PageHeaderPreview'))
const PaginationPreview = lazy(() => import('./ui/PaginationPreview'))
const PalindromeCheckerPreview = lazy(() => import('./ui/PalindromeCheckerPreview'))
const PasswordStrengthPreview = lazy(() => import('./ui/PasswordStrengthPreview'))
const PricingTogglePreview = lazy(() => import('./ui/PricingTogglePreview'))
const ProfileCardLayoutPreview = lazy(() => import('./ui/ProfileCardLayoutPreview'))
const ProgressStepperPreview = lazy(() => import('./ui/ProgressStepperPreview'))
const QuoteCardPreview = lazy(() => import('./ui/QuoteCardPreview'))
const ResponsiveMetricGridPreview = lazy(() => import('./ui/ResponsiveMetricGridPreview'))
const SearchSelectPreview = lazy(() => import('./ui/SearchSelectPreview'))
const SegmentedControlPreview = lazy(() => import('./ui/SegmentedControlPreview'))
const SignupFormPreview = lazy(() => import('./ui/SignupFormPreview'))
const SlidingNavigationPreview = lazy(() => import('./ui/SlidingNavigationPreview'))
const SplitHeroPreview = lazy(() => import('./ui/SplitHeroPreview'))
const StatsPreview = lazy(() => import('./ui/StatsPreview'))
const SwitchControlPreview = lazy(() => import('./ui/SwitchControlPreview'))
const TaskListPreview = lazy(() => import('./ui/TaskListPreview'))
const TestimonialLayoutPreview = lazy(() => import('./ui/TestimonialLayoutPreview'))
const ThemeSwitchPreview = lazy(() => import('./ui/ThemeSwitchPreview'))
const TipCalculatorPreview = lazy(() => import('./ui/TipCalculatorPreview'))
const ToastCenterPreview = lazy(() => import('./ui/ToastCenterPreview'))
const TooltipPreview = lazy(() => import('./ui/TooltipPreview'))
const UserInfoCardPreview = lazy(() => import('./ui/UserInfoCardPreview'))
const WizardFormPreview = lazy(() => import('./ui/WizardFormPreview'))

interface GalleryProps {
  theme: Theme
  onToggleTheme: () => void
  mode: 'featured' | 'library'
  initialId?: string
  onNavigateToComponent?: (componentId: string) => void
}

export default function ComponentGallery({ theme, onToggleTheme, mode, initialId, onNavigateToComponent }: GalleryProps) {
  const [category, setCategory] = useState<(typeof categoryList)[number]>('All')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState<ComponentId>(() =>
    components.find((component) => component.id === initialId)?.id ?? 'theme',
  )
  const [source, setSource] = useState<{ id: ComponentId; text: string } | null>(null)
  const [copyStatus, setCopyStatus] = useState('')
  const active = components.find((component) => component.id === activeId) ?? components[0]
  const normalizedQuery = query.trim().toLowerCase()
  const visible = components.filter((component) =>
    (category === 'All' || component.category === category)
    && (!normalizedQuery || `${component.name} ${component.category} ${component.summary}`.toLowerCase().includes(normalizedQuery)),
  )
  useEffect(() => {
    let cancelled = false
    const sourcePath = `./ui/${previewFiles[activeId]}`
    const loadSource = componentSources[sourcePath]

    if (!loadSource) return

    void loadSource().then((sourceText) => {
      if (!cancelled) setSource({ id: activeId, text: sourceText })
    }).catch((error: unknown) => {
      console.error(`Unable to load ${active.name} source code.`, error)
      if (!cancelled) setSource({ id: activeId, text: 'Component source is unavailable.' })
    })

    return () => {
      cancelled = true
    }
  }, [active.id, active.name, activeId])

  const copyComponent = async () => {
    const loadSource = componentSources[`./ui/${previewFiles[activeId]}`]
    if (!loadSource) {
      setCopyStatus('Source unavailable')
      return
    }

    try {
      const sourceText = await loadSource()
      setSource({ id: activeId, text: sourceText })
      await navigator.clipboard.writeText(sourceText)
      setCopyStatus('Copied TSX')
      window.setTimeout(() => setCopyStatus(''), 1800)
    } catch (error) {
      console.error(`Unable to load or copy ${active.name} source code.`, error)
      setCopyStatus('Copy failed')
    }
  }

  const previews: Record<ComponentId, ReactNode> = {
    theme: <ThemeSwitchPreview theme={theme} onToggleTheme={onToggleTheme} />,
    tasks: <TaskListPreview />,
    clock: <DigitalClockPreview />,
    palette: <AccentControlsPreview />,
    timer: <CountdownTimerPreview />,
    counter: <CharacterCounterPreview />,
    contact: <ContactFormPreview />,
    slider: <DesignSliderPreview />,
    scroller: <ContentScrollerPreview />,
    wizard: <WizardFormPreview />,
    password: <PasswordStrengthPreview />,
    otp: <OtpInputPreview />,
    files: <FileDropzonePreview />,
    'date-range': <DateRangePreview />,
    'search-select': <SearchSelectPreview />,
    'data-table': <DataTablePreview />,
    pagination: <PaginationPreview />,
    toasts: <ToastCenterPreview />,
    dialog: <ConfirmDialogPreview />,
    tabs: <AccessibleTabsPreview />,
    commands: <CommandPalettePreview />,
    breadcrumbs: <BreadcrumbsPreview />,
    tooltip: <TooltipPreview />,
    segmented: <SegmentedControlPreview />,
    switch: <SwitchControlPreview />,
    contrast: <ContrastCheckerPreview />,
    progress: <ProgressStepperPreview />,
    inbox: <NotificationInboxPreview />,
    pricing: <PricingTogglePreview />,
    dice: <DiceRollerPreview />,
    palindrome: <PalindromeCheckerPreview />,
    kanban: <KanbanBoardPreview />,
    quote: <QuoteCardPreview />,
    calculator: <CalculatorPreview />,
    tip: <TipCalculatorPreview />,
    carousel: <ImageCarouselPreview />,
    accordion: <AccordionPreview />,
    cart: <CartControlPreview />,
    navigation: <SlidingNavigationPreview />,
    memory: <MemoryGamePreview />,
    mood: <MoodTrackerPreview />,
    books: <BookLibraryPreview />,
    markdown: <MarkdownPreview />,
    kit: <CoreUIKitPreview />,
    signup: <SignupFormPreview />,
    'navbar-layout': <NavBarLayoutPreview />,
    'footer-layout': <FooterLayoutPreview />,
    'bento-layout': <BentoLayoutPreview />,
    'hero-layout': <HeroLayoutPreview />,
    'hamburger-menu': <HamburgerMenuPreview />,
    'split-hero': <SplitHeroPreview />,
    'dashboard-layout': <DashboardLayoutPreview />,
    'feature-grid': <FeatureGridPreview />,
    'testimonial-layout': <TestimonialLayoutPreview />,
    'profile-layout': <ProfileCardLayoutPreview />,
    stats: <StatsPreview />,
    'app-card': <AppCardPreview />,
    dropzone: <AdvancedDropzonePreview />,
    'advanced-table': <AdvancedTablePreview />,
    'drag-drop': <DragDropBoardPreview />,
    'modern-carousel': <ModernCarouselPreview />,
    'glass-navbar': <GlassNavbarPreview />,
    'page-header': <PageHeaderPreview />,
    'comprehensive-footer': <ComprehensiveFooterPreview />,
    'responsive-grid': <ResponsiveMetricGridPreview />,
    'user-info': <UserInfoCardPreview />,
    'interactive-controls': <InteractiveControlsPreview />,
    'image-bento': <ImageBentoPreview />,
    'beam-card': <BorderBeamCardPreview />,
    'motion-shimmer-button': <MotionShowcasePreview effect="shimmer-button" />,
    'motion-glow-card': <MotionShowcasePreview effect="glow-card" />,
    'motion-text-reveal': <MotionShowcasePreview effect="text-reveal" />,
    'motion-spotlight': <MotionShowcasePreview effect="spotlight-card" />,
    'motion-magnetic-button': <MotionShowcasePreview effect="magnetic-button" />,
    'motion-tilt-card': <MotionShowcasePreview effect="tilt-card" />,
    'motion-parallax-stack': <MotionShowcasePreview effect="parallax-stack" />,
    'motion-gradient-border': <MotionShowcasePreview effect="gradient-border" />,
    'motion-orbit-icons': <MotionShowcasePreview effect="orbit-icons" />,
    'motion-marquee': <MotionShowcasePreview effect="marquee-text" />,
    'motion-blur-fade': <MotionShowcasePreview effect="blur-fade" />,
    'motion-spring-badge': <MotionShowcasePreview effect="spring-badge" />,
    'motion-ripple-button': <MotionShowcasePreview effect="ripple-button" />,
    'motion-floating-dock': <MotionShowcasePreview effect="floating-dock" />,
    'motion-beam-path': <MotionShowcasePreview effect="beam-path" />,
    'motion-skeleton': <MotionShowcasePreview effect="skeleton-shimmer" />,
    'motion-counter': <MotionShowcasePreview effect="counter-up" />,
    'motion-typewriter': <MotionShowcasePreview effect="typewriter" />,
    'motion-tabs': <MotionShowcasePreview effect="animated-tabs" />,
    'motion-confetti': <MotionShowcasePreview effect="confetti-burst" />,
  }
  const sourcePath = `./ui/${previewFiles[activeId]}`
  const sourceText = source?.id === activeId
    ? source.text
    : componentSources[sourcePath] ? 'Loading component source…' : 'Component source is unavailable.'

  if (mode === 'featured') {
    return (
      <div className="component-gallery component-gallery-featured">
        <div className="featured-component-grid">
          {featuredIds.map((id) => {
            const component = components.find((item) => item.id === id)
            if (!component) return null
            return (
              <article className="featured-component-card" key={id}>
                <div className="featured-component-preview">
                  <Suspense fallback={<div className="component-preview-loading" role="status">Loading preview…</div>}>
                    {previews[id]}
                  </Suspense>
                </div>
                <div className="featured-component-copy">
                  <span className="component-card-category">{component.category}</span>
                  <h3>{component.name}</h3>
                  <p>{component.summary}</p>
                  <button type="button" className="card-link" onClick={() => onNavigateToComponent?.(id)}>
                    View component <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="component-gallery component-gallery-library">
      <div className="component-library-toolbar">
        <div className="component-search" role="search" aria-label="Search component library">
          <Search size={18} strokeWidth={1.8} aria-hidden="true" />
          <label className="demo-visually-hidden" htmlFor="component-library-search">Search components</label>
          <input id="component-library-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search components, categories, or patterns…" />
          {query && (
            <button type="button" className="component-search-clear" aria-label="Clear component search" onClick={() => setQuery('')}>
              <X size={15} aria-hidden="true" />
            </button>
          )}
          <span className="component-search-count">{visible.length} / {components.length}</span>
        </div>
        <div className="component-toolbar" role="group" aria-label="Filter components">
          {categoryList.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'is-active' : ''}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="component-layout">
        <nav className="component-sidebar" aria-label="Component list">
          <div className="component-sidebar-heading">
            <span><i aria-hidden="true" /> COMPONENTS</span>
            <strong>{visible.length} items</strong>
          </div>
          {visible.map((component) => (
            <button
              key={component.id}
              type="button"
              className={`component-sidebar-item ${activeId === component.id ? 'is-active' : ''}`}
              aria-current={activeId === component.id ? 'page' : undefined}
              onClick={() => {
                setActiveId(component.id)
                const url = new URL(window.location.href)
                url.searchParams.set('component', component.id)
                window.history.replaceState({}, '', url)
              }}
            >
              <span>{component.name}</span>
              <small>{component.category}</small>
            </button>
          ))}
          {visible.length === 0 && <p className="component-empty-state">No components match this search.</p>}
        </nav>
        <aside className="component-preview" aria-live="polite">
          <div className="component-preview-heading">
            <div>
              <span className="demo-eyebrow">{active.category} <span aria-hidden="true">/</span> COMPONENT</span>
              <h3>{active.name}</h3>
              <p>{active.summary}</p>
            </div>
            <button type="button" className="component-copy-button" onClick={copyComponent} aria-label={`Copy ${active.name} React source`}>
              {copyStatus || 'Copy source'}
            </button>
          </div>
          <div className="component-preview-stage">
            <div className="component-preview-stage-heading">
              <span><i aria-hidden="true" /> LIVE PREVIEW</span>
              <span>INTERACTIVE</span>
            </div>
            <div className="component-preview-demo" key={activeId}>
              <Suspense fallback={<div className="component-preview-loading" role="status">Loading preview…</div>}>
                {previews[activeId]}
              </Suspense>
            </div>
          </div>
          <details className="component-source">
            <summary>View React source</summary>
            <pre><code>{sourceText}</code></pre>
            <p>Source is ready to adapt; preview styles use the shared AtellixUI demo classes.</p>
          </details>
        </aside>
      </div>
    </div>
  )
}
