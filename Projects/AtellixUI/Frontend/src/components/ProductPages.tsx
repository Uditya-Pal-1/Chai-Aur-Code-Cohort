import { ArrowRight, Check, Copy, Sparkles, Trash2, WandSparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { components } from '../data/componentCatalog'

export interface CartProduct {
  id: string
  title: string
  price: number
}

const products: (CartProduct & {
  kind: string
  category: string
  image: string
  alt: string
  description: string
  includes: string[]
  code: string
})[] = [
  {
    id: 'launch-page',
    title: 'Launch page kit',
    kind: 'Page · Landing',
    category: 'Landing pages',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=80',
    alt: 'Warm creative studio with a long shared desk',
    price: 24,
    description:
      'A considered launch page with a feature bento, social proof, and clear sign-up path.',
    includes: ['React + Tailwind source', 'Responsive layout', 'Token notes'],
    code: "export function LaunchPage() {\n  return <main className='min-h-screen bg-zinc-950 text-white'>\n    <section className='mx-auto max-w-6xl px-6 py-28'>\n      <p className='text-orange-300'>A better way to ship</p>\n      <h1 className='mt-4 text-6xl font-semibold'>Make room for your next idea.</h1>\n      <button className='mt-8 rounded-xl bg-orange-300 px-5 py-3 text-black'>Get started</button>\n    </section>\n  </main>\n}",
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS dashboard block',
    kind: 'Block · Product',
    category: 'Product blocks',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1100&q=80',
    alt: 'Developer working at a laptop in a bright workspace',
    price: 18,
    description:
      'A focused workspace overview with metrics, activity, and a compact navigation rail.',
    includes: ['Dashboard composition', 'Empty and loading states', 'Accessible controls'],
    code: "export function WorkspaceCard() {\n  return <article className='rounded-2xl border border-white/10 bg-zinc-900 p-6 text-white'>\n    <p className='text-sm text-zinc-400'>This week</p>\n    <strong className='mt-2 block text-4xl'>24 projects</strong>\n    <span className='text-emerald-300'>↑ 12% from last week</span>\n  </article>\n}",
  },
  {
    id: 'pricing-section',
    title: 'Pricing page section',
    kind: 'Block · Conversion',
    category: 'Product blocks',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1100&q=80',
    alt: 'Team collaborating around a table',
    price: 14,
    description: 'A clear pricing comparison layout with monthly and annual states.',
    includes: ['Three plan cards', 'Billing toggle pattern', 'Responsive comparison'],
    code: "const plans = [{ name: 'Starter', price: '$0' }, { name: 'Studio', price: '$18' }]\nexport function PlanCard({ name, price }) {\n  return <article className='rounded-2xl border border-white/10 p-6'>\n    <h2>{name}</h2><strong className='text-4xl'>{price}</strong>\n    <button className='mt-6 rounded-lg bg-orange-300 px-4 py-2 text-black'>Choose plan</button>\n  </article>\n}",
  },
  {
    id: 'creator-portfolio',
    title: 'Creator portfolio page',
    kind: 'Page · Portfolio',
    category: 'Portfolio',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e30436?auto=format&fit=crop&w=1100&q=80',
    alt: 'Minimal creative studio workspace',
    price: 19,
    description: 'An editorial portfolio page with a project grid and concise profile story.',
    includes: ['Portfolio layout', 'Image-led project tiles', 'About and contact sections'],
    code: "export function ProjectTile({ image, title }) {\n  return <a className='group block overflow-hidden rounded-2xl' href='#work'>\n    <img className='aspect-[4/3] w-full object-cover transition group-hover:scale-105' src={image} alt='' />\n    <h3 className='mt-3'>{title}</h3>\n  </a>\n}",
  },
  {
    id: 'docs-starter',
    title: 'Documentation starter',
    kind: 'Page · Docs',
    category: 'Documentation',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80',
    alt: 'Hands typing on a laptop in a modern workspace',
    price: 16,
    description: 'A clean docs shell with a sidebar, page navigation, and copyable snippets.',
    includes: ['Docs layout', 'Search-ready structure', 'Code block styles'],
    code: "export function DocsLayout({ children }) {\n  return <div className='grid min-h-screen md:grid-cols-[240px_1fr]'>\n    <aside className='border-r border-white/10 p-6'>Getting started</aside>\n    <main className='mx-auto w-full max-w-3xl p-8'>{children}</main>\n  </div>\n}",
  },
  {
    id: 'motion-pack',
    title: 'Motion interaction pack',
    kind: 'Bundle · Motion',
    category: 'Motion',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1100&q=80',
    alt: 'Colorful retro display representing playful motion design',
    price: 29,
    description: 'Small, useful entrance and hover transitions composed for product interfaces.',
    includes: ['12 motion recipes', 'Reduced-motion variants', 'Copyable Framer Motion snippets'],
    code: "import { motion } from 'framer-motion'\nexport function FadeIn({ children }) {\n  return <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{children}</motion.div>\n}",
  },
]

const articles = [
  {
    slug: 'motion-with-purpose',
    category: 'Design engineering',
    title: 'Motion that makes an interface easier to read',
    excerpt:
      'A practical way to use movement to show cause, hierarchy, and state without distracting from the work.',
    time: '5 min read',
  },
  {
    slug: 'tokens-as-decisions',
    category: 'Design systems',
    title: 'Treat tokens as product decisions',
    excerpt:
      'Tokens are a small shared language for making visual choices consistent and easier to evolve.',
    time: '4 min read',
  },
  {
    slug: 'copy-paste-components',
    category: 'React',
    title: 'What copy-paste distribution gives your team',
    excerpt:
      'Owning the source changes how teams adapt, review, and maintain a component over time.',
    time: '6 min read',
  },
]

const policies = {
  privacy: {
    title: 'Privacy policy',
    lead: 'What the current AtellixUI prototype collects and how to contact us about it.',
    sections: [
      [
        'Data you provide',
        'If you create an account or submit a review, the service stores your name, email address, password hash, optional avatar URL, and review content in its configured MongoDB database. Passwords are hashed before storage.',
      ],
      [
        'Site operation',
        'The site uses an httpOnly session cookie to keep you signed in. The current prototype does not include analytics, advertising trackers, or third-party checkout.',
      ],
      [
        'Your choices',
        'You may stop using the service at any time. Account deletion and data export are not yet self-serve; use the business contact link to request help.',
      ],
    ],
  },
  terms: {
    title: 'Terms of use',
    lead: 'Plain-language terms for this evolving component and page library.',
    sections: [
      [
        'Use of the examples',
        'Examples are provided as starting points. Review the source, dependencies, accessibility, security, and license before using them in a production product.',
      ],
      [
        'Accounts and contributions',
        'Keep account credentials private and only submit content you have the right to share. Reviews may be removed if they contain abuse, private information, or unrelated promotion.',
      ],
      [
        'Availability',
        'AtellixUI is an evolving prototype. Features and preview prices can change. No paid checkout or service-level commitment is currently active.',
      ],
    ],
  },
  license: {
    title: 'License & copyright',
    lead: 'Copyright and component usage information for AtellixUI.',
    sections: [
      [
        'Copyright',
        '© 2026 Uditya Pal. AtellixUI site design, original text, and code are protected by applicable copyright laws.',
      ],
      [
        'Component license',
        'A final distributable license has not yet been published. Until a license file is included with a component or paid product, do not assume the website grants blanket commercial redistribution rights. Contact the project owner for licensing questions.',
      ],
      [
        'Third-party work',
        'Third-party names, packages, icons, fonts, and photos remain the property of their respective owners and are governed by their own terms. Unsplash photo credit is shown with each hero image where available.',
      ],
    ],
  },
  copyright: {
    title: 'Copyright notice',
    lead: 'Ownership, attribution, and reporting information.',
    sections: [
      [
        'AtellixUI materials',
        'Original AtellixUI code and editorial materials are © 2026 Uditya Pal. Rights for any reusable source are stated in its accompanying license when available.',
      ],
      [
        'Report a concern',
        'If you believe content on this site uses your work without permission, contact the project owner with the page URL, the work you own, and a way to reach you.',
      ],
      [
        'Brand names',
        'Any company and product names mentioned are used for identification and do not imply endorsement or customer relationships.',
      ],
    ],
  },
}

export default function ProductPages({
  page,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onNavigate,
  onCopy,
}: {
  page: string
  cart: CartProduct[]
  onAddToCart: (product: CartProduct) => void
  onRemoveFromCart: (id: string) => void
  onNavigate: (path: string) => void
  onCopy: (code: string) => Promise<boolean>
}) {
  const [prompt, setPrompt] = useState('A warm, accessible card for a creative studio')
  const [generated, setGenerated] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const [category, setCategory] = useState('All')
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart])
  const root = 'mx-auto w-full max-w-7xl px-5 py-16 text-zinc-100 sm:px-8 lg:py-24'
  const button =
    'inline-flex items-center justify-center gap-2 rounded-xl bg-orange-300 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-orange-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200'

  const copyProduct = async (code: string) => {
    setCopyStatus((await onCopy(code)) ? 'Copied' : 'Copy failed')
    window.setTimeout(() => setCopyStatus(''), 1800)
  }

  if (page === 'shop')
    {
      const categories = ['All', ...new Set(products.map((product) => product.category))]
      const visibleProducts = category === 'All' ? products : products.filter((product) => product.category === category)
    return (
      <main className={root}>
        <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/70 px-6 py-10 sm:px-10 sm:py-14">
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/30" />
          <p className="font-mono text-xs tracking-[.2em] text-orange-300 uppercase">Blocks &amp; templates</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Start with a strong first draft.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">Image-led page and product patterns with previewable React and Tailwind source. Choose a starting point, inspect the code, then adapt it to your product.</p>
          <p className="mt-4 text-xs text-zinc-400">Preview catalog · Checkout is not active yet</p>
        </section>
        <div className="mt-9 flex flex-wrap gap-2" aria-label="Filter templates by category">
          {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full border px-4 py-2 text-sm transition ${category === item ? 'border-orange-300 bg-orange-300 text-zinc-950' : 'border-white/10 text-zinc-300 hover:border-orange-300/50'}`}>{item}</button>)}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[.025] transition duration-300 hover:-translate-y-1 hover:border-orange-300/35"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img src={product.image} alt={product.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-zinc-950/60 px-3 py-1 text-xs text-zinc-100 backdrop-blur">
                  {product.kind}
                </span>
                <span className="absolute top-4 right-4 rounded-full border border-white/15 bg-zinc-950/70 px-3 py-1 text-sm font-semibold text-white backdrop-blur">${product.price} preview</span>
              </div>
              <div className="p-5 sm:p-6">
              <h2 className="mb-2 text-xl font-semibold">{product.title}</h2>
              <p className="min-h-12 text-sm leading-6 text-zinc-400">{product.description}</p>
              <ul className="my-5 space-y-2 text-sm text-zinc-300">
                {product.includes.map((item) => (
                  <li className="flex items-center gap-2" key={item}><Check size={14} className="shrink-0 text-orange-300" />{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                <button className={button} onClick={() => void copyProduct(product.code)} type="button"><Copy size={15} /> {copyStatus || 'Copy starter'}</button>
                <button className="rounded-xl border border-white/15 px-4 py-2.5 text-sm transition hover:border-orange-300/40" onClick={() => onAddToCart(product)} type="button">Add to cart</button>
              </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-3xl border border-orange-300/15 bg-orange-300/[.05] p-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="m-0 text-xl font-semibold">Need a tailored system?</h2>
            <p className="mt-2 mb-0 text-sm text-zinc-400">
              Talk through a design-system or implementation engagement.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/business')}
            className={`${button} mt-5 sm:mt-0`}
            type="button"
          >
            Business services <ArrowRight size={15} />
          </button>
        </div>
      </main>
    )
    }

  if (page === 'cart')
    return (
      <main className={root}>
        <p className="font-mono text-xs tracking-[.2em] text-orange-300 uppercase">Your cart</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">A little more room to build.</h1>
        <p className="mt-3 text-zinc-400">
          {cart.length} {cart.length === 1 ? 'item' : 'items'} saved in this browser.
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {cart.length ? (
            <div className="space-y-3">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 p-5"
                >
                  <div>
                    <h2 className="m-0 text-lg font-medium">{item.title}</h2>
                    <p className="mt-1 mb-0 text-sm text-zinc-500">Digital source bundle</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <strong>${item.price}</strong>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="rounded-lg border border-white/10 p-2 text-zinc-400 hover:text-white"
                      type="button"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-zinc-400">
              Your cart is empty.
              <button
                onClick={() => onNavigate('/shop')}
                className="mt-4 block w-full text-orange-200"
                type="button"
              >
                Browse blocks and pages →
              </button>
            </div>
          )}
          <aside className="h-fit rounded-2xl border border-white/10 p-6">
            <p className="mt-0 text-sm text-zinc-400">Preview total</p>
            <strong className="text-4xl">${cartTotal}</strong>
            <button
              onClick={() => onNavigate('/business')}
              className={`${button} mt-6 w-full`}
              type="button"
            >
              Ask about purchasing
            </button>
            <p className="mt-4 mb-0 text-xs leading-5 text-zinc-500">
              Checkout is not active yet. No payment details are collected on this site.
            </p>
          </aside>
        </div>
      </main>
    )

  if (page === 'pricing')
    return (
      <main className={root}>
        <p className="font-mono text-xs tracking-[.2em] text-orange-300 uppercase">
          Plans for independent builders and teams
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Start free. Pay for a faster start.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
          Core component examples stay open. Preview the planned bundles and get in touch if you
          need a tailored rollout.
        </p>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {[
            {
              name: 'Community',
              price: '$0',
              description: 'Explore the core patterns.',
              items: ['Interactive components', 'Theme and token studio', 'Copyable examples'],
            },
            {
              name: 'Builder',
              price: '$12',
              description: 'Spend less time assembling pages.',
              items: ['Page and block bundles', 'Motion recipes', 'Personal project license'],
            },
            {
              name: 'Studio',
              price: '$39',
              description: 'Align a small product team.',
              items: [
                'Builder bundle access',
                'Shared implementation session',
                'Team usage guidance',
              ],
            },
          ].map((plan, i) => (
            <article
              key={plan.name}
              className={`relative overflow-hidden rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 ${i === 1 ? 'border-orange-300/50 bg-orange-300/[.06] shadow-[0_24px_80px_-45px_rgba(251,146,60,.6)]' : 'border-white/10 bg-white/[.02]'}`}
            >
              {i === 1 && <span className="absolute right-6 top-6 rounded-full bg-orange-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-950">Most flexible</span>}
              <p className="mt-0 text-sm text-orange-200">{plan.name}</p>
              <strong className="text-5xl tracking-tight">
                {plan.price}
                <small className="ml-1 text-sm font-normal text-zinc-500">
                  {i ? '/ once' : '/ forever'}
                </small>
              </strong>
              <p className="mt-4 text-zinc-400">{plan.description}</p>
              <ul className="my-7 space-y-3 text-sm text-zinc-300">
                {plan.items.map((item) => (
                  <li className="flex items-center gap-2" key={item}><Check size={14} className="text-orange-300" />{item}</li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate(i ? '/business' : '/components')}
                type="button"
                className={
                  i ? button : 'w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm'
                }
              >
                {i ? 'Discuss this plan' : 'Explore components'}
              </button>
            </article>
          ))}
        </div>
        <aside className="mt-8 grid gap-5 rounded-3xl border border-white/10 bg-white/[.025] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <div><p className="m-0 text-xs font-mono uppercase tracking-[.18em] text-orange-300">Simple by design</p><h2 className="mb-2 mt-3 text-xl font-semibold">Build at your own pace.</h2><p className="m-0 max-w-2xl text-sm leading-6 text-zinc-400">Explore the library for free, preview page bundles in the shop, or talk through a team engagement. Planned prices are shown for direction only.</p></div>
          <button onClick={() => onNavigate('/shop')} className={`${button} whitespace-nowrap`} type="button">Browse templates <ArrowRight size={15} /></button>
        </aside>
        <p className="mt-4 text-xs text-zinc-500">Pricing preview only · No subscriptions, payments, or checkout are currently active.</p>
      </main>
    )

  if (page === 'blog')
    return (
      <main className={root}>
        <p className="font-mono text-xs tracking-[.2em] text-orange-300 uppercase">Field notes</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Ideas for interfaces with intention.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
          Notes on animation, component architecture, tokens, and the small decisions that make
          products feel complete.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {articles.map((article, index) => (
            <article
              key={article.slug}
              className="rounded-3xl border border-white/10 bg-white/[.025] p-6"
            >
              <span className="text-xs tracking-widest text-orange-200 uppercase">
                {article.category}
              </span>
              <div className="my-6 aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-900"><img src={[products[0].image, products[4].image, products[5].image][index]} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" /></div>
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="min-h-20 text-sm leading-6 text-zinc-400">{article.excerpt}</p>
              <span className="text-xs text-zinc-600">{article.time} · AtellixUI journal</span>
              <button
                onClick={() => onNavigate(`/blog/${article.slug}`)}
                className="mt-5 flex items-center gap-2 text-sm text-orange-200"
                type="button"
              >
                Read note <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>
      </main>
    )

  if (page === 'ai-studio') {
    const promptTerms = prompt
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(
        (word) =>
          word.length > 3 &&
          !['with', 'from', 'that', 'this', 'want', 'need', 'make'].includes(word),
      )
    const matches = components
      .map((item) => {
        const synonyms = `${item.name} ${item.category} ${item.summary} ${item.id.replaceAll('-', ' ')}`.toLowerCase()
        const promptText = `${prompt} ${promptTerms.join(' ')}`.toLowerCase()
        const text = `${synonyms} ${promptText.includes('pricing') ? 'price plan conversion' : ''} ${promptText.includes('dashboard') ? 'data admin workspace' : ''} ${promptText.includes('landing') ? 'hero page marketing' : ''} ${promptText.includes('form') ? 'input validation' : ''}`
        return {
          item,
          score: promptTerms.reduce((score, term) => score + Number(text.includes(term)), 0),
        }
      })
      .filter(({ score }) => score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 3)
      .map(({ item }) => item)
    const suggestions = matches.length ? matches : components.slice(0, 3)
    const presets = [
      ['Landing page', 'A responsive landing page with a clear hero and feature sections'],
      ['Dashboard', 'A calm dashboard with useful data cards and a navigation rail'],
      ['Pricing', 'A pricing section with clear plan comparison and a highlighted option'],
      ['Motion', 'A subtle interaction with accessible reduced-motion behavior'],
    ]
    return (
      <main className={root}>
        <p className="font-mono text-xs tracking-[.2em] text-orange-300 uppercase">
          <Sparkles size={14} className="mr-2 inline" /> Studio assistant · local prototype
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight">
          Start with a prompt. Keep the output yours.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
          Describe the component or page you need. This prototype suggests AtellixUI patterns
          locally; it does not send your prompt to an AI provider.
        </p>
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[.025] p-5 sm:p-7">
            <label className="block text-sm font-medium text-zinc-200" htmlFor="ai-prompt">What are you building?</label>
            <textarea id="ai-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} className="mt-3 min-h-36 w-full resize-y rounded-2xl border border-white/10 bg-zinc-950 p-4 text-sm leading-6 text-white outline-none transition focus:border-orange-300/60 focus:ring-2 focus:ring-orange-300/15" />
            <p className="mb-2 mt-5 text-xs text-zinc-500">Start with a direction</p>
            <div className="flex flex-wrap gap-2">{presets.map(([label, value]) => <button key={label} type="button" onClick={() => { setPrompt(value); setGenerated(true) }} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-orange-300/50 hover:text-white">{label}</button>)}</div>
            <button className={`${button} mt-5`} type="button" onClick={() => setGenerated(true)}><WandSparkles size={15} /> Find patterns</button>
            <p className="mb-0 mt-4 text-xs leading-5 text-zinc-500">Local catalog matching only. Prompts stay in this browser; no AI provider is connected.</p>
          </section>
          <section className="rounded-3xl border border-white/10 bg-zinc-900/50 p-5 sm:p-7" aria-live="polite">
            <div className="flex items-center justify-between gap-3"><div><p className="m-0 text-xs font-mono uppercase tracking-[.18em] text-orange-300">Pattern finder</p><h2 className="mb-0 mt-2 text-xl font-semibold">{generated ? 'A few useful starting points' : 'Suggestions will appear here'}</h2></div><Sparkles className="text-orange-300" size={19} /></div>
            <div className="mt-5 grid gap-3">
              {(generated ? suggestions : components.slice(0, 3)).map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-orange-300/30">
                  <span className="text-xs text-orange-200">{item.category}</span><h3 className="mb-1 mt-2 text-base font-semibold">{item.name}</h3><p className="m-0 text-sm leading-5 text-zinc-400">{item.summary}</p>
                  <button onClick={() => onNavigate(`/components?component=${item.id}`)} type="button" className="mt-4 inline-flex items-center gap-2 text-sm text-orange-200">Preview component <ArrowRight size={14} /></button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    )
  }

  if (page === 'business')
    return (
      <main className={root}>
        <p className="font-mono text-xs tracking-[.2em] text-orange-300 uppercase">
          Business & product help
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight">
          A clearer path from design system to shipped interface.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
          AtellixUI is built for indie teams, product studios, and engineering groups that need a
          consistent starting point. Tell us where your product is stuck and we’ll discuss the right
          next step.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ['Design system setup', 'Define tokens and reusable foundations around your product.'],
            [
              'Component implementation',
              'Adapt accessible React patterns to real application flows.',
            ],
            ['Team enablement', 'Document usage decisions and help your team extend the system.'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-white/10 p-6">
              <h2 className="mt-0 text-lg">{title}</h2>
              <p className="mb-0 text-sm leading-6 text-zinc-400">{description}</p>
            </article>
          ))}
        </div>
        <a
          className={`${button} mt-8 no-underline`}
          href="https://my-portfolio-uditya-pal.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Visit the project portfolio <ArrowRight size={15} />
        </a>
        <p className="mt-4 text-xs text-zinc-600">
          Independent project prototype · no customer or company endorsements are claimed.
        </p>
      </main>
    )

  if (page.startsWith('blog/')) {
    const article = articles.find((item) => item.slug === page.slice(5))
    return (
      <main className={`${root} max-w-4xl`}>
        <button
          className="text-sm text-orange-200"
          onClick={() => onNavigate('/blog')}
          type="button"
        >
          ← All notes
        </button>
        <p className="mt-10 font-mono text-xs tracking-widest text-orange-300 uppercase">
          {article?.category ?? 'Field notes'}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          {article?.title ?? 'Design and engineering notes'}
        </h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">
          {article?.excerpt ?? 'Notes from the AtellixUI project.'}
        </p>
        <div className="mt-10 space-y-5 text-base leading-8 text-zinc-300">
          <p>
            Good interface work is a series of small decisions made visible. A component system
            helps teams keep those decisions connected as the product grows.
          </p>
          <p>
            Start with the behavior your user needs. Use motion to explain state changes, shared
            tokens to keep surfaces coherent, and source code that a team can adapt without fighting
            its own system.
          </p>
          <p>
            AtellixUI is an evolving project. Browse the examples, inspect the implementation, and
            treat each pattern as a starting point for a thoughtful product decision.
          </p>
        </div>
      </main>
    )
  }

  if (Object.hasOwn(policies, page)) {
    const policy = policies[page as keyof typeof policies]
    return (
      <main className={`${root} max-w-4xl`}>
        <p className="font-mono text-xs tracking-[.2em] text-orange-300 uppercase">
          Policies & copyright
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">{policy.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">{policy.lead}</p>
        <p className="mt-6 text-xs text-zinc-600">
          Last updated November 4, 2026 · Product prototype information; consult a qualified
          professional for legal advice.
        </p>
        <div className="mt-12 space-y-9">
          {policy.sections.map(([heading, body]) => (
            <section key={heading} className="border-t border-white/10 pt-6">
              <h2 className="text-xl font-semibold">{heading}</h2>
              <p className="max-w-3xl leading-7 text-zinc-400">{body}</p>
            </section>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className={`${root} min-h-[55vh]`}>
      <p className="font-mono text-xs tracking-[.2em] text-orange-300 uppercase">Not found</p>
      <h1 className="mt-4 text-4xl font-semibold">That page has moved.</h1>
      <button className={`${button} mt-5`} type="button" onClick={() => onNavigate('/')}>
        Back to AtellixUI
      </button>
    </main>
  )
}
