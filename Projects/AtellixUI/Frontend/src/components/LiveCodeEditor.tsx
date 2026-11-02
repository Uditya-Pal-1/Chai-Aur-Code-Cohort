import { useEffect, useRef, useState } from 'react'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react'

type LiveCodeEditorProps = {
  code: string
  theme: 'dark' | 'light'
}

function getPreviewStyles(theme: 'dark' | 'light') {
  return `:root {
  color-scheme: ${theme};
  --accent: #ff8a3d;
  --text: ${theme === 'dark' ? '#f5f2ef' : '#261b14'};
  --muted: ${theme === 'dark' ? '#a49a92' : '#796b61'};
  --bg: ${theme === 'dark' ? '#101010' : '#fffaf6'};
  --bg-soft: ${theme === 'dark' ? '#1b1918' : '#fff4eb'};
  --line: ${theme === 'dark' ? 'rgba(255,255,255,.14)' : 'rgba(79,48,29,.16)'};
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}

* { box-sizing: border-box; }
html, body, #root { min-height: 100%; margin: 0; }
body { background: var(--bg); color: var(--text); }
.sandbox-root {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 32px;
  background:
    radial-gradient(ellipse at 50% 35%, ${theme === 'dark' ? 'rgba(255,138,61,.12)' : 'rgba(255,138,61,.16)'}, transparent 56%),
    var(--bg);
}
button, input { font: inherit; }
button:not(:disabled), input:not(:disabled) { cursor: pointer; }
button:disabled, input:disabled { opacity: .48; }
article { max-width: 380px; }
article > span { font-size: 11px; letter-spacing: .12em; }
article h3 { margin: 20px 0 8px; }
article p { color: var(--muted); line-height: 1.65; }
input[type="text"] { color: var(--text); }
input[type="range"], input[type="checkbox"] { accent-color: var(--accent); }
`
}

function PreviewThemeSync({ theme }: { theme: 'dark' | 'light' }) {
  const { sandpack } = useSandpack()
  const syncedTheme = useRef<'dark' | 'light' | null>(null)

  useEffect(() => {
    if (syncedTheme.current === theme) return
    syncedTheme.current = theme
    sandpack.updateFile('/styles.css', getPreviewStyles(theme))
  }, [sandpack, theme])

  return null
}

export default function LiveCodeEditor({ code, theme }: LiveCodeEditorProps) {
  const [files] = useState(() => ({
    '/App.js': `import './styles.css'

export default function App() {
  return (
    <main className="sandbox-root">
      ${code}
    </main>
  )
}`,
    '/styles.css': getPreviewStyles('dark'),
  }))

  return (
    <div className={`playground-sandpack ${theme}`}>
      <SandpackProvider
        template="react"
        theme={theme === 'dark' ? 'dark' : 'light'}
        files={files}
        options={{
          autorun: true,
          autoReload: true,
          recompileMode: 'delayed',
          recompileDelay: 350,
          initMode: 'user-visible',
        }}
      >
        <PreviewThemeSync theme={theme} />
        <SandpackLayout className="playground-sandpack-layout">
          <SandpackCodeEditor
            showTabs
            showLineNumbers
            showInlineErrors
            style={{ height: 470 }}
          />
          <SandpackPreview
            showNavigator
            showRefreshButton
            showOpenInCodeSandbox={false}
            style={{ height: 470 }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
