import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(
  ({ className, type = 'text', error, label, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'w-full rounded-lg border bg-white dark:bg-primary-800 text-gray-900 dark:text-white transition-all duration-300',
              'px-4 py-3 text-base',
              icon && 'pl-12',
              error
                ? 'border-accent-red focus:ring-accent-red'
                : 'border-gray-300 dark:border-primary-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-accent-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;