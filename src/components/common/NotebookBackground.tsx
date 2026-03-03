import React from 'react';

/**
 * NotebookBackground – Wrapper component that applies the notebook
 * ruled-lines CSS pattern and paper texture to its children.
 *
 * @param children - Content to render inside the notebook background
 * @param className - Additional Tailwind classes for extensibility
 * @param showMargin - Whether to show the red margin line (default: false)
 * @param showSpiral - Whether to show spiral binding dots (default: false)
 */

interface NotebookBackgroundProps {
    children: React.ReactNode;
    className?: string;
    showMargin?: boolean;
    showSpiral?: boolean;
}

export function NotebookBackground({
    children,
    className = '',
    showMargin = false,
    showSpiral = false,
}: NotebookBackgroundProps) {
    return (
        <div className={`relative min-h-full bg-cream ${className}`}>
            {/* Ruled lines overlay */}
            <div
                className="absolute inset-0 bg-ruled-lines opacity-20 pointer-events-none"
                aria-hidden="true"
            />

            {/* Optional spiral binding */}
            {showSpiral && (
                <div
                    className="absolute left-0 top-0 bottom-0 w-8 bg-spiral opacity-40"
                    aria-hidden="true"
                />
            )}

            {/* Optional red margin line */}
            {showMargin && (
                <div
                    className="absolute left-10 top-0 bottom-0 w-[2px] bg-red-300/40"
                    aria-hidden="true"
                />
            )}

            {/* Content */}
            <div className="relative">{children}</div>
        </div>
    );
}
