import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to frontend components
const UI_DIR = path.resolve(__dirname, '../../Frontend/src/components/ui')

// Component Registry metadata based on PRD v2.1
const COMPONENT_REGISTRY = {
  button: {
    name: 'button',
    tier: 1,
    title: 'Button',
    category: 'Foundation',
    dependencies: ['clsx', 'tailwind-merge'],
    tokens: ['--accent', '--accent-strong', '--radius'],
    description: 'Polished button primitive with variants, hover glows, and responsive states.',
    previewFile: 'CoreUIKitPreview.tsx',
  },
  'glow-card': {
    name: 'glow-card',
    tier: 2,
    title: 'Glow Card',
    category: 'Visual',
    dependencies: ['framer-motion', 'clsx'],
    tokens: ['--accent', '--shadow', '--panel'],
    description: 'Interactive cursor-tracking radial glow card.',
    previewFile: 'BentoLayoutPreview.tsx',
  },
  'data-table': {
    name: 'data-table',
    tier: 1,
    title: 'Sortable Data Table',
    category: 'Data',
    dependencies: ['lucide-react', 'clsx'],
    tokens: ['--panel', '--line', '--text', '--muted'],
    description: 'Accessible search, filter, and sort data table.',
    previewFile: 'DataTablePreview.tsx',
  },
  'date-range': {
    name: 'date-range',
    tier: 1,
    title: 'Date Range Picker',
    category: 'Inputs',
    dependencies: ['clsx'],
    tokens: ['--accent', '--panel', '--line'],
    description: 'Accessible date range picker with duration calculation.',
    previewFile: 'DateRangePreview.tsx',
  },
  'toast-center': {
    name: 'toast-center',
    tier: 1,
    title: 'Toast Notifications',
    category: 'Feedback',
    dependencies: ['framer-motion'],
    tokens: ['--panel', '--accent', '--shadow'],
    description: 'Accessible queuing toast system with auto-dismiss and spring reveals.',
    previewFile: 'ToastCenterPreview.tsx',
  },
  dialog: {
    name: 'dialog',
    tier: 1,
    title: 'Confirmation Dialog',
    category: 'Overlays',
    dependencies: ['framer-motion'],
    tokens: ['--panel', '--line', '--accent'],
    description: 'Accessible modal dialog with backdrop dismiss and focus trap.',
    previewFile: 'ConfirmDialogPreview.tsx',
  },
  tabs: {
    name: 'tabs',
    tier: 1,
    title: 'Accessible Tabs',
    category: 'Navigation',
    dependencies: ['framer-motion'],
    tokens: ['--accent', '--line', '--text'],
    description: 'ARIA tab navigation with animated indicator and arrow key support.',
    previewFile: 'AccessibleTabsPreview.tsx',
  },
  'theme-switch': {
    name: 'theme-switch',
    tier: 1,
    title: 'Theme Switch',
    category: 'Foundation',
    dependencies: [],
    tokens: ['--bg', '--text', '--accent'],
    description: 'Instant dark/light theme switch with spring cord animation.',
    previewFile: 'ThemeSwitchPreview.tsx',
  },
  'kanban-board': {
    name: 'kanban-board',
    tier: 1,
    title: 'Kanban Board',
    category: 'Productivity',
    dependencies: ['framer-motion'],
    tokens: ['--panel', '--line', '--accent'],
    description: 'Interactive column task workflow with fluid animations.',
    previewFile: 'KanbanBoardPreview.tsx',
  },
  pricing: {
    name: 'pricing',
    tier: 2,
    title: 'Pricing Toggle',
    category: 'Commerce',
    dependencies: ['clsx'],
    tokens: ['--accent', '--panel', '--line'],
    description: 'Interactive monthly/annual tiered pricing comparison table.',
    previewFile: 'PricingTogglePreview.tsx',
  },
}

export function listComponents(req, res) {
  const items = Object.values(COMPONENT_REGISTRY)
  res.status(200).json({
    success: true,
    total: items.length,
    components: items,
  })
}

export function getComponent(req, res) {
  const id = req.params.name?.toLowerCase().replace(/\.json$/, '')
  const item = COMPONENT_REGISTRY[id]

  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Component "${id}" not found in AtellixUI registry.`,
    })
  }

  // Attempt to read preview file source
  let fileContent = ''
  if (item.previewFile && fs.existsSync(path.join(UI_DIR, item.previewFile))) {
    try {
      fileContent = fs.readFileSync(path.join(UI_DIR, item.previewFile), 'utf-8')
    } catch {
      fileContent = '// Component source will be delivered by the registry package.'
    }
  }

  res.status(200).json({
    name: item.name,
    tier: item.tier,
    title: item.title,
    category: item.category,
    dependencies: item.dependencies,
    tokens: item.tokens,
    files: [
      {
        path: `ui/${item.name}.tsx`,
        content: fileContent,
      },
    ],
  })
}

