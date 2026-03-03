/**
 * PageWrapper – Wraps any page and applies fade‑slide entry animation.
 * Use this as the outermost wrapper in each route to get a smooth page entry.
 *
 * @param children - Page content
 * @param className - Additional Tailwind classes
 */
export default function PageWrapper({ children, className = '' }) {
    return (
        <div
            className={`animate-fade-slide ${className}`}
            role="main"
        >
            {children}
        </div>
    );
}
