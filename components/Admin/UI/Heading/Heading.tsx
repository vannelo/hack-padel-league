import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Heading({
  children,
  size = 'md',
  className = '',
}: HeadingProps) {
  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  return (
    <h2
      className={`mb-4 font-bold text-gray-800 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </h2>
  );
}
