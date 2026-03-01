/**
 * ScoreAnalyticsCard – Displays a single subject's performance metrics
 * with a progress bar, accuracy percentage, and time taken.
 *
 * @param subject - Name of the subject/section
 * @param accuracy - Accuracy percentage (0–100)
 * @param timeTaken - Average time per question (e.g. "45s" or "1m 20s")
 * @param barColor - Tailwind bg class for the progress bar (default: 'bg-yellow-accent')
 * @param icon - Optional Lucide icon name for the subject
 * @param className - Additional Tailwind classes for extensibility
 */

interface ScoreAnalyticsCardProps {
    subject: string;
    accuracy: number;
    timeTaken: string;
    barColor?: string;
    icon?: string;
    className?: string;
}

export function ScoreAnalyticsCard({
    subject,
    accuracy,
    timeTaken,
    barColor = 'bg-yellow-accent',
    icon,
    className = '',
}: ScoreAnalyticsCardProps) {
    // Determine label color based on accuracy
    const accuracyColor =
        accuracy >= 75
            ? 'text-green-700'
            : accuracy >= 50
                ? 'text-yellow-700'
                : 'text-red-500';

    return (
        <div
            className={`bg-white rounded-xl p-5 shadow-card hover:shadow-hover transition-shadow duration-200 ${className}`}
        >
            {/* Header row: subject name + icon */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {icon && (
                        <img
                            src={`https://unpkg.com/lucide-static@latest/icons/${icon}.svg`}
                            alt=""
                            width="18"
                            height="18"
                            className="opacity-60"
                            aria-hidden="true"
                        />
                    )}
                    <h4 className="font-caveat text-xl font-bold text-navy">{subject}</h4>
                </div>
                <span className={`font-caveat text-xl font-bold ${accuracyColor}`}>
                    {accuracy}%
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden mb-3">
                <div
                    className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${Math.min(accuracy, 100)}%` }}
                    role="progressbar"
                    aria-valuenow={accuracy}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${subject} accuracy: ${accuracy}%`}
                />
            </div>

            {/* Footer: time taken */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <img
                        src="https://unpkg.com/lucide-static@latest/icons/clock.svg"
                        alt=""
                        width="14"
                        height="14"
                        className="opacity-40"
                        aria-hidden="true"
                    />
                    <span className="font-body text-sm text-navy/50">
                        Avg: {timeTaken}/question
                    </span>
                </div>
                <span className="font-body text-xs text-navy/40">
                    {accuracy >= 75 ? '✅ Strong' : accuracy >= 50 ? '⚡ Improving' : '🔴 Needs work'}
                </span>
            </div>
        </div>
    );
}
