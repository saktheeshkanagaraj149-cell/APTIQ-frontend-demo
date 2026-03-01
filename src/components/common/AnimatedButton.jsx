import { useState } from 'react';

/**
 * AnimatedButton – Button with click‑pulse, hover shadow‑lift,
 * and smooth background transition. Notebook paper‑fold effect.
 *
 * @param children - Button label
 * @param variant - "primary" (navy) or "accent" (yellow)
 * @param onClick - Click handler
 * @param disabled - Disabled state
 * @param className - Additional Tailwind classes
 * @param ariaLabel - Accessible label
 */
export default function AnimatedButton({
    children,
    variant = 'primary',
    onClick,
    disabled = false,
    className = '',
    ariaLabel,
}) {
    const [isPulsing, setIsPulsing] = useState(false);

    const handleClick = (e) => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 300);
        onClick?.(e);
    };

    const baseStyles = `
    relative px-6 py-3 rounded-lg font-body font-semibold text-base
    transition-all duration-200 ease-out
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:-translate-y-0.5 active:translate-y-0
  `;

    const variants = {
        primary: 'bg-navy text-cream hover:bg-primary-light hover:shadow-hover shadow-card',
        accent: 'bg-accent text-navy hover:bg-yellow-light hover:shadow-hover shadow-card',
        outline: 'bg-white text-navy border-2 border-navy/15 hover:border-navy/30 hover:shadow-card',
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${isPulsing ? 'animate-click-pulse' : ''} ${className}`}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}
