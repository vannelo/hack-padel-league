import React from 'react'

interface ButtonProps {
  label: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'rounded font-bold transition-all duration-200'
  const sizeStyles = {
    small: 'min-h-8 min-w-8 px-3 text-sm',
    medium: 'min-h-10 min-w-48 px-4 text-base',
    large: 'min-h-12 px-5 text-lg',
  }

  const variantStyles = {
    primary: 'bg-primary text-black hover:bg-primary-dark',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
