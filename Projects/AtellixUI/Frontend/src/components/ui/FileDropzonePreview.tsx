import { useRef, useState } from 'react'

export default function FileDropzonePreview() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')

  const addFiles = (selected: FileList | null) => {
    if (!selected) return
    const accepted = Array.from(selected).filter((file) => file.size <= 5 * 1024 * 1024)
    setError(accepted.length === selected.length ? '' : 'Files must be 5 MB or smaller.')
    setFiles((current) => [...current, ...accepted].filter((file, index, list) => list.findIndex((item) => item.name === file.name && item.size === file.size) === index))
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="demo-stack">
      <button
        className="demo-dropzone"
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files) }}
      >
        <strong>Drop files here</strong>
        <span>or browse · up to 5 MB each</span>
      </button>
      <input ref={inputRef} className="demo-visually-hidden" type="file" multiple onChange={(event) => addFiles(event.target.files)} aria-label="Choose files to attach" />
      {error && <span className="demo-hint" role="alert">{error}</span>}
      {files.length > 0 && (
        <ul className="demo-file-list">
          {files.map((file) => (
            <li key={`${file.name}-${file.size}`}>
              <span>{file.name} <small>{(file.size / 1024).toFixed(0)} KB</small></span>
              <button className="demo-button" type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item !== file))}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
