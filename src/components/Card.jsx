import React from 'react';
import './Card.css';
import { clsx } from 'clsx';

export const Card = ({ children, className, variant = 'default', ...props }) => {
  return (
    <div className={clsx('base-card', `card-${variant}`, className)} {...props}>
      {children}
    </div>
  );
};
