/**
 * SkeletonCard – Placeholder card with shimmer loading effect.
 * Use while data is loading to prevent layout shift (CLS).
 *
 * @param lines - Number of text lines to simulate (default: 3)
 * @param hasImage - Whether to show an image placeholder (default: false)
 * @param className - Additional Tailwind classes
 */
export default function SkeletonCard({
    lines = 3,
    hasImage = false,
    className = '',
}) {
    return (
        <div
            className={`bg-white rounded-xl p-5 shadow-card border border-cream ${className}`}
            aria-busy="true"
            aria-label="Loading content..."
            role="status"
        >
            {/* Optional image placeholder */}
            {hasImage && (
                <div
                    className="w-full h-32 mb-4 rounded-lg
                     bg-gradient-to-r from-cream via-ruled/20 to-cream
                     bg-[length:200%_100%] animate-shimmer"
                />
            )}

            {/* Title line */}
            <div
                className="h-5 w-3/4 mb-3 rounded
                   bg-gradient-to-r from-cream via-ruled/30 to-cream
                   bg-[length:200%_100%] animate-shimmer"
            />

            {/* Content lines */}
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-3 mb-2 rounded
                     bg-gradient-to-r from-cream via-ruled/20 to-cream
                     bg-[length:200%_100%] animate-shimmer"
                    style={{
                        width: `${85 - i * 10}%`,
                        animationDelay: `${i * 150}ms`,
                    }}
                />
            ))}

            {/* Footer pill */}
            <div
                className="h-6 w-24 mt-4 rounded-full
                   bg-gradient-to-r from-cream via-ruled/20 to-cream
                   bg-[length:200%_100%] animate-shimmer"
                style={{ animationDelay: '400ms' }}
            />

            {/* Screen‑reader text */}
            <span className="sr-only">Loading...</span>
        </div>
    );
}
