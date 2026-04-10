import React from 'react';
import './Badge.css';
import { clsx } from 'clsx';

export const Badge = ({ children, variant = 'primary', className }) => {
  return (
    <span className={clsx('base-badge', `badge-${variant}`, className)}>
      {children}
    </span>
  );
};
