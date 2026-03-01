import React from 'react';

/**
 * TestContainer – Main wrapper for the test screen.
 * Enforces anti-cheat measures: disables right-click and text selection.
 * Displays notebook-aesthetic cream background with ruled lines.
 *
 * @param children - Test content (QuestionCard, TimerBar, NavigationButtons)
 * @param timeRemaining - Seconds remaining in the test
 * @param questionNumber - Current question number (1-based)
 * @param totalQuestions - Total number of questions in the test
 * @param className - Additional Tailwind classes for extensibility
 */

interface TestContainerProps {
    children: React.ReactNode;
    timeRemaining: number;
    questionNumber: number;
    totalQuestions: number;
    violationCount?: number;
    maxViolations?: number;
    className?: string;
}

export function TestContainer({
    children,
    timeRemaining,
    questionNumber,
    totalQuestions,
    violationCount = 0,
    maxViolations = 3,
    className = '',
}: TestContainerProps) {
    return (
        <div
            className={`min-h-screen bg-cream select-none relative font-body ${className}`}
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Notebook ruled lines background */}
            <div
                className="absolute inset-0 bg-ruled-lines opacity-15 pointer-events-none"
                aria-hidden="true"
            />

            {/* Top info bar */}
            <div className="relative bg-white/80 backdrop-blur-sm border-b-2 border-ruled px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm select-none">
                <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                        <span className="text-yellow-accent font-caveat font-bold text-sm">IQ</span>
                    </div>
                    <span className="font-caveat text-lg font-bold text-navy hidden sm:block">
                        Apt<span className="text-yellow-accent">IQ</span> Test
                    </span>
                </div>

                {/* Question counter */}
                <div className="flex items-center gap-2">
                    <span className="font-body text-sm text-navy/60 select-none">
                        Question
                    </span>
                    <span className="font-caveat text-xl font-bold text-navy select-none">
                        {questionNumber}
                    </span>
                    <span className="font-body text-sm text-navy/40 select-none">
                        / {totalQuestions}
                    </span>
                </div>

                {/* Time remaining (compact display) */}
                <div className="flex items-center gap-4">
                    {/* Violation indicator */}
                    {violationCount > 0 && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 rounded-lg border border-red-200">
                            <span className="font-body text-xs text-red-500 select-none">⚠️</span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: maxViolations }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${i < violationCount
                                            ? 'bg-red-500'
                                            : 'bg-red-200'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Time remaining */}
                    <div className="flex items-center gap-2">
                        <img
                            src="https://unpkg.com/lucide-static@latest/icons/clock.svg"
                            alt=""
                            width="16"
                            height="16"
                            className="opacity-50"
                            aria-hidden="true"
                        />
                        <span
                            className={`font-caveat text-lg font-bold select-none ${timeRemaining < 60
                                ? 'text-red-500 animate-pulse'
                                : timeRemaining < 300
                                    ? 'text-yellow-600'
                                    : 'text-navy'
                                }`}
                            aria-label={`Time remaining: ${Math.floor(timeRemaining / 60)} minutes ${timeRemaining % 60} seconds`}
                        >
                            {String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:
                            {String(timeRemaining % 60).padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className="relative">{children}</div>
        </div>
    );
}
