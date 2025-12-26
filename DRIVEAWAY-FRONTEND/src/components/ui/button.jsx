import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      disabled,
      loading,
      icon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary:
        'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 shadow-lg hover:shadow-neon',
      secondary:
        'bg-white dark:bg-primary-800 text-primary-950 dark:text-white border-2 border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-700',
      outline:
        'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600',
      ghost:
        'text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800',
      gold:
        'bg-gradient-to-r from-accent-gold to-accent-orange text-white hover:shadow-xl hover:scale-105',
      danger: 'bg-accent-red text-white hover:bg-red-600',
    };

    const sizes = {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4',
      xl: 'text-xl px-10 py-5',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && !loading && icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;