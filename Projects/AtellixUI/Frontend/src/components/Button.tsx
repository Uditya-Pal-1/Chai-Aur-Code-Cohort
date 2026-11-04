import React from 'react'
import clsx from 'clsx'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'soft' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[40px]',
    lg: 'text-base px-6 py-3 gap-2.5 min-h-[48px]',
  }

  const variantStyles = {
    solid:
      'bg-[#ff8a3d] text-[#120c08] font-semibold hover:bg-[#ff9b55] active:scale-[0.98] shadow-[0_2px_14px_rgba(255,138,61,0.28)] focus-visible:ring-[#ff8a3d]',
    outline:
      'border border-[#ff8a3d]/60 text-[#ff8a3d] hover:bg-[#ff8a3d]/10 hover:border-[#ff8a3d] active:scale-[0.98] focus-visible:ring-[#ff8a3d]',
    soft: 'bg-[#ff8a3d]/15 text-[#ff8a3d] hover:bg-[#ff8a3d]/25 active:scale-[0.98] focus-visible:ring-[#ff8a3d]',
    ghost:
      'text-[var(--text)] hover:bg-[var(--accent-soft)] hover:text-[#ff8a3d] active:scale-[0.98] focus-visible:ring-[#ff8a3d]',
  }

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  )
}

export default Button
