import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
  name?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.name ? ` (${this.props.name})` : ''}] Caught error:`, error, errorInfo)
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null })
    this.props.onReset?.()
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="demo-error-boundary" role="alert">
          <div className="demo-error-inner">
            <span className="demo-eyebrow">RENDER RECOVERY</span>
            <h4>Component temporarily unavailable</h4>
            <p className="demo-hint">
              {this.state.error?.message || 'An unexpected rendering error occurred in this view.'}
            </p>
            <button
              type="button"
              className="demo-button demo-button-primary"
              onClick={this.handleReset}
            >
              Try reloading component
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

