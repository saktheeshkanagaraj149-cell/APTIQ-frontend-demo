import { useState, useEffect, useCallback } from 'react';

/**
 * Timer – Countdown timer with pulse‑red effect when < 10 seconds.
 * Shows MM:SS format with visual urgency cues.
 *
 * @param totalSeconds - Total time in seconds
 * @param onComplete - Callback when timer reaches 0
 * @param autoStart - Whether to start counting immediately (default: true)
 * @param className - Additional Tailwind classes
 */
export default function Timer({
    totalSeconds = 300,
    onComplete,
    autoStart = true,
    className = '',
}) {
    const [remaining, setRemaining] = useState(totalSeconds);
    const [isRunning, setIsRunning] = useState(autoStart);

    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    const percentage = (remaining / totalSeconds) * 100;

    const isUrgent = remaining <= 10;
    const isWarning = remaining <= 60 && remaining > 10;

    useEffect(() => {
        if (!isRunning || remaining <= 0) return;
        const interval = setInterval(() => {
            setRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsRunning(false);
                    onComplete?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning, remaining, onComplete]);

    const toggle = useCallback(() => setIsRunning((r) => !r), []);

    return (
        <div
            className={`flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-card border border-cream ${className}`}
            aria-label={`Timer: ${minutes}:${seconds} remaining`}
            role="timer"
        >
            {/* Clock icon */}
            <img
                src="https://unpkg.com/lucide-static@latest/icons/clock.svg"
                alt=""
                width="20"
                height="20"
                className={`${isUrgent ? 'animate-pulse-red' : 'opacity-50'}`}
                aria-hidden="true"
            />

            {/* Time display */}
            <span
                className={`font-heading text-2xl font-bold tabular-nums transition-colors duration-200
          ${isUrgent ? 'text-red-500 animate-pulse-red' : isWarning ? 'text-orange-500' : 'text-navy'}`}
            >
                {minutes}:{seconds}
            </span>

            {/* Mini progress bar */}
            <div className="flex-1 h-1.5 bg-cream rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-linear
            ${isUrgent ? 'bg-red-500' : isWarning ? 'bg-orange-400' : 'bg-softGreen'}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Pause/Play toggle */}
            <button
                onClick={toggle}
                className="p-1.5 rounded-lg hover:bg-cream transition-colors focus-visible:outline-2 focus-visible:outline-navy"
                aria-label={isRunning ? 'Pause timer' : 'Resume timer'}
            >
                <img
                    src={`https://unpkg.com/lucide-static@latest/icons/${isRunning ? 'pause' : 'play'}.svg`}
                    alt=""
                    width="16"
                    height="16"
                    className="opacity-50"
                    aria-hidden="true"
                />
            </button>
        </div>
    );
}
