import React from 'react';
import './Button.css';
import { clsx } from 'clsx';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  onClick, 
  type = 'button',
  fullWidth = false,
  ...props 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'base-button',
        `variant-${variant}`,
        `size-${size}`,
        fullWidth && 'full-width',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
