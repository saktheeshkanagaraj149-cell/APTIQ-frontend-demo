/**
 * LiveBadge – Small animated indicator showing real-time connection status.
 * Displays a pulsing green dot with "LIVE" text.
 *
 * @param className - Additional Tailwind classes for extensibility
 * @param label - Override text (default: "LIVE")
 */

interface LiveBadgeProps {
    className?: string;
    label?: string;
}

export function LiveBadge({ className = '', label = 'LIVE' }: LiveBadgeProps) {
    return (
        <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 bg-green-soft/30 border border-green-soft/50 rounded-full ${className}`}
            role="status"
            aria-label="Live updates active"
        >
            {/* Pulsing green dot */}
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="font-body text-xs font-bold text-green-700 uppercase tracking-wider animate-pulse">
                {label}
            </span>
        </div>
    );
}
