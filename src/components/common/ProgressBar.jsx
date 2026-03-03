import { useEffect, useState } from 'react';

/**
 * ProgressBar – Animated fill bar that transitions from 0% to target.
 * Starts animating on mount for a smooth reveal effect.
 *
 * @param percentage - Target fill percentage (0–100)
 * @param color - Tailwind bg class for the bar (default: "bg-softGreen")
 * @param label - Accessible label text
 * @param height - Bar height in Tailwind class (default: "h-3")
 * @param showLabel - Whether to show the percentage label
 * @param className - Additional Tailwind classes
 */
export default function ProgressBar({
    percentage = 0,
    color = 'bg-softGreen',
    label = 'Progress',
    height = 'h-3',
    showLabel = true,
    className = '',
}) {
    const [width, setWidth] = useState(0);

    // Animate from 0 to target on mount
    useEffect(() => {
        const timer = setTimeout(() => setWidth(percentage), 100);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className={className}>
            {showLabel && (
                <div className="flex justify-between items-center mb-1">
                    <span className="font-body text-sm text-navy/60">{label}</span>
                    <span className="font-heading text-lg font-bold text-navy">{percentage}%</span>
                </div>
            )}
            <div
                className={`w-full ${height} bg-cream rounded-full overflow-hidden border border-ruled/30`}
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${label}: ${percentage}%`}
            >
                <div
                    className={`${height} ${color} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}
