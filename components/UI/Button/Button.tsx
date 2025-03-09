import React from 'react';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = ButtonType.BUTTON,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'rounded font-bold transition-all duration-200';
  const sizeStyles = {
    [ButtonSize.SMALL]: 'min-h-8 min-w-8 px-3 text-sm',
    [ButtonSize.MEDIUM]: 'min-h-10 min-w-48 px-4 text-base',
    [ButtonSize.LARGE]: 'min-h-12 px-5 text-lg',
  };

  const variantStyles = {
    [ButtonVariant.PRIMARY]: 'bg-primary text-black hover:bg-primary-dark',
    [ButtonVariant.SECONDARY]: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    [ButtonVariant.DANGER]: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
