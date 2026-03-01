/**
 * NavigationButtons – Previous / Next / Submit buttons for the test engine.
 * Pure, stateless UI component — all interaction is via callbacks.
 *
 * @param onPrevious - Callback when "Previous" is clicked
 * @param onNext - Callback when "Next" is clicked
 * @param onSubmit - Callback when "Submit" is clicked
 * @param isLastQuestion - If true, shows "Submit" instead of "Next"
 * @param isFirstQuestion - If true, disables the "Previous" button
 * @param className - Additional Tailwind classes for extensibility
 */

interface NavigationButtonsProps {
    onPrevious?: () => void;
    onNext?: () => void;
    onSubmit?: () => void;
    isLastQuestion?: boolean;
    isFirstQuestion?: boolean;
    className?: string;
}

export function NavigationButtons({
    onPrevious,
    onNext,
    onSubmit,
    isLastQuestion = false,
    isFirstQuestion = false,
    className = '',
}: NavigationButtonsProps) {
    return (
        <div
            className={`flex items-center justify-between pt-6 border-t border-ruled/50 select-none ${className}`}
        >
            {/* Previous button */}
            <button
                onClick={onPrevious}
                disabled={isFirstQuestion}
                className="px-5 py-2.5 bg-cream text-navy font-body rounded-lg border border-navy/10 hover:border-navy/20 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 select-none shadow-sm"
                aria-label="Go to previous question"
            >
                ← Previous
            </button>

            {/* Next or Submit button */}
            {isLastQuestion ? (
                <button
                    onClick={onSubmit}
                    className="px-6 py-2.5 bg-green-soft text-navy font-body font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 select-none border border-green-soft"
                    aria-label="Submit test"
                >
                    ✅ Submit Test
                </button>
            ) : (
                <button
                    onClick={onNext}
                    className="px-6 py-2.5 bg-navy text-cream font-body rounded-lg shadow-md hover:bg-navy-light hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 select-none"
                    aria-label="Go to next question"
                >
                    Next →
                </button>
            )}
        </div>
    );
}
