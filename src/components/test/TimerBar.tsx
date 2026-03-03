/**
 * TimerBar – Countdown progress bar for the test timer.
 * Changes color as time runs out: green → yellow → red.
 * Pure, stateless UI — only displays the provided values.
 *
 * @param timeRemaining - Seconds remaining
 * @param totalTime - Total test time in seconds
 * @param className - Additional Tailwind classes for extensibility
 */

interface TimerBarProps {
    timeRemaining: number;
    totalTime: number;
    className?: string;
}

export function TimerBar({
    timeRemaining,
    totalTime,
    className = '',
}: TimerBarProps) {
    const percentage = Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100));

    // Color transitions: green (>50%) → yellow (20-50%) → red (<20%)
    const barColor =
        percentage > 50
            ? 'bg-green-soft'
            : percentage > 20
                ? 'bg-yellow-accent'
                : 'bg-red-400';

    const textColor =
        percentage > 50
            ? 'text-green-800'
            : percentage > 20
                ? 'text-yellow-800'
                : 'text-red-600';

    // Format time as MM:SS
    const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
    const seconds = String(timeRemaining % 60).padStart(2, '0');

    return (
        <div
            className={`select-none ${className}`}
            role="timer"
            aria-label={`Time remaining: ${minutes} minutes and ${seconds} seconds`}
        >
            {/* Time display */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <img
                        src="https://unpkg.com/lucide-static@latest/icons/timer.svg"
                        alt=""
                        width="16"
                        height="16"
                        className="opacity-50"
                        aria-hidden="true"
                    />
                    <span className="font-body text-sm text-navy/60 select-none">
                        Time Remaining
                    </span>
                </div>
                <span
                    className={`font-caveat text-2xl font-bold select-none ${textColor} ${timeRemaining < 60 ? 'animate-pulse' : ''
                        }`}
                >
                    {minutes}:{seconds}
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-cream rounded-full overflow-hidden shadow-inner">
                <div
                    className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-linear`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={timeRemaining}
                    aria-valuemin={0}
                    aria-valuemax={totalTime}
                />
            </div>

            {/* Low time warning */}
            {timeRemaining < 60 && timeRemaining > 0 && (
                <p className="font-body text-xs text-red-500 mt-1.5 text-center select-none animate-pulse">
                    ⚠️ Less than 1 minute remaining!
                </p>
            )}
        </div>
    );
}
