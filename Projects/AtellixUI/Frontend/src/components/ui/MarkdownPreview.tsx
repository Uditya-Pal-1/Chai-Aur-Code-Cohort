import { useState } from 'react'

const initialMarkdown = '# A thoughtful system\n\n- Clear foundations\n- Useful components\n\nKeep it **consistent**.'

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(initialMarkdown)
  const preview = markdown.split('\n').map((line, index) => {
    if (line.startsWith('# ')) return <h4 key={index}>{line.slice(2)}</h4>
    if (line.startsWith('- ')) return <p className="demo-list-line" key={index}>— {line.slice(2)}</p>
    if (!line) return <br key={index} />
    return <p key={index}>{line.split('**').map((part, partIndex) => partIndex % 2 ? <strong key={partIndex}>{part}</strong> : part)}</p>
  })

  return (
    <div className="demo-markdown">
      <label><span className="demo-eyebrow">MARKDOWN</span><textarea value={markdown} onChange={(event) => setMarkdown(event.target.value)} /></label>
      <div className="demo-markdown-preview"><span className="demo-eyebrow">PREVIEW</span>{preview}</div>
    </div>
  )
}
