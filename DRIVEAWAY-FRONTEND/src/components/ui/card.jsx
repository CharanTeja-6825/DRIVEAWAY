import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, glass = false, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-300',
        glass
          ? 'glass shadow-glass dark:shadow-glass-dark'
          : 'bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-700 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={cn('p-6 pb-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn('text-2xl font-bold text-gray-900 dark:text-white', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ className, children, ...props }) => {
  return (
    <p
      className={cn('text-sm text-gray-600 dark:text-gray-400 mt-2', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className, children, ...props }) => {
  return (
    <div className={cn('p-6 pt-0 flex items-center gap-4', className)} {...props}>
      {children}
    </div>
  );
};