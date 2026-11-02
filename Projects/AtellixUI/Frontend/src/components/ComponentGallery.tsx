import { Search, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import AccordionPreview from './ui/AccordionPreview'
import AccessibleTabsPreview from './ui/AccessibleTabsPreview'
import AccentControlsPreview from './ui/AccentControlsPreview'
import BentoLayoutPreview from './ui/BentoLayoutPreview'
import BookLibraryPreview from './ui/BookLibraryPreview'
import BreadcrumbsPreview from './ui/BreadcrumbsPreview'
import CalculatorPreview from './ui/CalculatorPreview'
import CartControlPreview from './ui/CartControlPreview'
import CharacterCounterPreview from './ui/CharacterCounterPreview'
import CommandPalettePreview from './ui/CommandPalettePreview'
import ConfirmDialogPreview from './ui/ConfirmDialogPreview'
import ContactFormPreview from './ui/ContactFormPreview'
import ContentScrollerPreview from './ui/ContentScrollerPreview'
import ContrastCheckerPreview from './ui/ContrastCheckerPreview'
import CoreUIKitPreview from './ui/CoreUIKitPreview'
import CountdownTimerPreview from './ui/CountdownTimerPreview'
import DataTablePreview from './ui/DataTablePreview'
import DateRangePreview from './ui/DateRangePreview'
import DashboardLayoutPreview from './ui/DashboardLayoutPreview'
import DesignSliderPreview from './ui/DesignSliderPreview'
import DigitalClockPreview from './ui/DigitalClockPreview'
import DiceRollerPreview from './ui/DiceRollerPreview'
import FeatureGridPreview from './ui/FeatureGridPreview'
import FileDropzonePreview from './ui/FileDropzonePreview'
import FooterLayoutPreview from './ui/FooterLayoutPreview'
import HamburgerMenuPreview from './ui/HamburgerMenuPreview'
import HeroLayoutPreview from './ui/HeroLayoutPreview'
import ImageCarouselPreview from './ui/ImageCarouselPreview'
import KanbanBoardPreview from './ui/KanbanBoardPreview'
import MarkdownPreview from './ui/MarkdownPreview'
import MemoryGamePreview from './ui/MemoryGamePreview'
import MoodTrackerPreview from './ui/MoodTrackerPreview'
import NavBarLayoutPreview from './ui/NavBarLayoutPreview'
import NotificationInboxPreview from './ui/NotificationInboxPreview'
import OtpInputPreview from './ui/OtpInputPreview'
import PasswordStrengthPreview from './ui/PasswordStrengthPreview'
import PaginationPreview from './ui/PaginationPreview'
import PalindromeCheckerPreview from './ui/PalindromeCheckerPreview'
import PricingTogglePreview from './ui/PricingTogglePreview'
import ProfileCardLayoutPreview from './ui/ProfileCardLayoutPreview'
import ProgressStepperPreview from './ui/ProgressStepperPreview'
import QuoteCardPreview from './ui/QuoteCardPreview'
import SearchSelectPreview from './ui/SearchSelectPreview'
import SegmentedControlPreview from './ui/SegmentedControlPreview'
import SignupFormPreview from './ui/SignupFormPreview'
import SlidingNavigationPreview from './ui/SlidingNavigationPreview'
import SplitHeroPreview from './ui/SplitHeroPreview'
import SwitchControlPreview from './ui/SwitchControlPreview'
import TaskListPreview from './ui/TaskListPreview'
import ThemeSwitchPreview from './ui/ThemeSwitchPreview'
import TestimonialLayoutPreview from './ui/TestimonialLayoutPreview'
import ToastCenterPreview from './ui/ToastCenterPreview'
import TipCalculatorPreview from './ui/TipCalculatorPreview'
import TooltipPreview from './ui/TooltipPreview'
import WizardFormPreview from './ui/WizardFormPreview'
import type { Theme } from './ui/types'
import { categoryList, components, featuredIds, previewFiles, type ComponentId } from '../data/componentCatalog'

const componentSources = import.meta.glob<string>('./ui/*Preview.tsx', {
  eager: true,
  query: '?raw',
  import: 'default',
})

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
  const [copyStatus, setCopyStatus] = useState('')
  const active = components.find((component) => component.id === activeId) ?? components[0]
  const normalizedQuery = query.trim().toLowerCase()
  const visible = components.filter((component) =>
    (category === 'All' || component.category === category)
    && (!normalizedQuery || `${component.name} ${component.category} ${component.summary}`.toLowerCase().includes(normalizedQuery)),
  )
  const source = componentSources[`./ui/${previewFiles[activeId]}`]

  const copyComponent = async () => {
    if (!source) {
      setCopyStatus('Source unavailable')
      return
    }

    try {
      await navigator.clipboard.writeText(source)
      setCopyStatus('Copied TSX')
      window.setTimeout(() => setCopyStatus(''), 1800)
    } catch (error) {
      console.error(`Unable to copy ${active.name} source code.`, error)
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
  }

  if (mode === 'featured') {
    return (
      <div className="component-gallery component-gallery-featured">
        <div className="featured-component-grid">
          {featuredIds.map((id) => {
            const component = components.find((item) => item.id === id)
            if (!component) return null
            return (
              <article className="featured-component-card" key={id}>
                <div className="featured-component-preview">{previews[id]}</div>
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
        <div className="component-toolbar" aria-label="Filter components">
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
            <div className="component-preview-demo" key={activeId}>{previews[activeId]}</div>
          </div>
          <details className="component-source">
            <summary>View React source</summary>
            <pre><code>{source || 'Component source is unavailable.'}</code></pre>
            <p>Source is ready to adapt; preview styles use the shared AtellixUI demo classes.</p>
          </details>
        </aside>
      </div>
    </div>
  )
}
