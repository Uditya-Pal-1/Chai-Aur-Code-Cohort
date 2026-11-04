import { useState } from 'react'
import { BadgeCheck, ChevronRight, Download, Filter, Plus, Share2 } from 'lucide-react'

export default function PageHeaderPreview() {
  const [activeTab, setActiveTab] = useState('Components')
  const tabs = ['Components', 'Themes & Tokens', 'Activity Logs', 'Settings']

  return (
    <div className="demo-stack demo-pageheader-container">
      <div className="demo-pageheader-breadcrumbs" aria-label="Breadcrumb navigation">
        <a href="#home">Dashboard</a>
        <ChevronRight size={13} />
        <a href="#design">Design System</a>
        <ChevronRight size={13} />
        <span aria-current="page">AtellixUI Core</span>
      </div>

      <div className="demo-pageheader-main">
        <div className="demo-pageheader-title-block">
          <div className="demo-pageheader-heading-row">
            <h3>Component Architecture</h3>
            <span className="demo-badge demo-badge-verified">
              <BadgeCheck size={14} /> Production Ready
            </span>
          </div>
          <p>
            Manage design tokens, component spectrum tiers, and CLI distribution packages.
          </p>
        </div>

        <div className="demo-pageheader-actions">
          <button type="button" className="demo-button demo-button-subtle">
            <Share2 size={14} /> Share
          </button>
          <button type="button" className="demo-button demo-button-subtle">
            <Download size={14} /> Export Spec
          </button>
          <button type="button" className="demo-button demo-button-primary">
            <Plus size={14} /> Add Component
          </button>
        </div>
      </div>

      <div className="demo-pageheader-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={`demo-pageheader-tab ${activeTab === tab ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="demo-pageheader-filter-action">
          <button type="button" className="demo-icon-button" title="Filter items">
            <Filter size={14} />
          </button>
        </div>
      </div>

      <span className="demo-hint">
        Enterprise SaaS header with responsive breadcrumbs, action bar, and active tab triggers.
      </span>
    </div>
  )
}

