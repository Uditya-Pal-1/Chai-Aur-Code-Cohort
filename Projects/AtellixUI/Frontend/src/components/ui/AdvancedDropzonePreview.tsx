import { useState, type DragEvent, type ChangeEvent } from 'react'
import { Check, FileCode, FileSpreadsheet, FileText, Trash2, UploadCloud } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  progress: number
}

const mockFiles: UploadedFile[] = [
  { id: '1', name: 'design-tokens.json', size: '24.2 KB', type: 'code', progress: 100 },
  { id: '2', name: 'component-spec.pdf', size: '1.4 MB', type: 'doc', progress: 100 },
]

export default function AdvancedDropzonePreview() {
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files))
    }
  }

  const addFiles = (newFiles: File[]) => {
    const formatted: UploadedFile[] = newFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.name.endsWith('.json') || file.name.endsWith('.tsx') ? 'code' : 'doc',
      progress: 100,
    }))
    setFiles((prev) => [...prev, ...formatted])
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <FileCode size={18} color="#ff8a3d" />
      case 'sheet':
        return <FileSpreadsheet size={18} color="#4ade80" />
      default:
        return <FileText size={18} color="#38bdf8" />
    }
  }

  return (
    <div className="demo-stack demo-dropzone-container">
      <div
        className={`demo-dropzone-stage ${isDragging ? 'is-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="dropzone-input"
          className="demo-visually-hidden"
          multiple
          onChange={handleFileInput}
        />
        <label htmlFor="dropzone-input" className="demo-dropzone-content">
          <div className="demo-dropzone-icon-circle">
            <UploadCloud size={24} color="#ff8a3d" />
          </div>
          <strong>Drag & drop files here, or browse</strong>
          <span>Supports TSX, JSON, CSS, and PDF up to 10MB</span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="demo-file-list" aria-label="Attached files">
          {files.map((file) => (
            <div className="demo-file-item" key={file.id}>
              <div className="demo-file-lead">
                <span className="demo-file-type-icon">{getIcon(file.type)}</span>
                <div className="demo-file-meta">
                  <span className="demo-file-name">{file.name}</span>
                  <small className="demo-file-size">{file.size}</small>
                </div>
              </div>
              <div className="demo-file-actions">
                <span className="demo-badge demo-badge-success" title="Ready to upload">
                  <Check size={12} /> Ready
                </span>
                <button
                  type="button"
                  className="demo-icon-button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removeFile(file.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <span className="demo-hint" aria-live="polite">
        {files.length} file{files.length === 1 ? '' : 's'} attached · Drag files directly into the dashed area.
      </span>
    </div>
  )
}

