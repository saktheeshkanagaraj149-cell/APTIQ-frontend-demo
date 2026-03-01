/**
 * QuestionCard – Displays a single question with multiple-choice options.
 * Pure, stateless UI component — all interaction is via callbacks.
 *
 * @param questionText - The question string to display
 * @param options - Array of option strings
 * @param selectedAnswer - Index of the currently selected option (or null)
 * @param questionNumber - Display number for the question
 * @param section - Optional section/topic label
 * @param difficulty - Optional difficulty badge (Easy/Medium/Hard)
 * @param className - Additional Tailwind classes for extensibility
 * @param onSelectAnswer - Callback when an option is clicked
 */

interface QuestionCardProps {
    questionText: string;
    options: string[];
    selectedAnswer: number | null;
    questionNumber?: number;
    section?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    className?: string;
    onSelectAnswer?: (index: number) => void;
}

const difficultyStyles: Record<string, string> = {
    Easy: 'bg-green-soft/50 text-green-800',
    Medium: 'bg-yellow-light text-yellow-800',
    Hard: 'bg-pink-light text-red-800',
};

export function QuestionCard({
    questionText,
    options,
    selectedAnswer,
    questionNumber,
    section,
    difficulty,
    className = '',
    onSelectAnswer,
}: QuestionCardProps) {
    return (
        <div
            className={`bg-white rounded-xl shadow-card p-6 sm:p-8 bg-ruled-lines shadow-paper relative select-none font-body ${className}`}
        >
            {/* Red margin line */}
            <div
                className="absolute left-8 sm:left-10 top-0 bottom-0 w-[2px] bg-red-300/30"
                aria-hidden="true"
            />

            <div className="pl-6 sm:pl-8">
                {/* Section & difficulty badges */}
                {(section || difficulty) && (
                    <div className="flex items-center gap-2 mb-4 select-none">
                        {section && (
                            <span className="px-3 py-1 bg-cream rounded-full font-body text-xs text-navy/60">
                                {section}
                            </span>
                        )}
                        {difficulty && (
                            <span
                                className={`px-3 py-1 rounded-full font-body text-xs ${difficultyStyles[difficulty] || ''}`}
                            >
                                {difficulty}
                            </span>
                        )}
                    </div>
                )}

                {/* Question text */}
                <h3 className="font-body text-lg text-navy leading-relaxed mb-8 select-none">
                    {questionNumber !== undefined && (
                        <span className="font-caveat text-xl font-bold text-navy/40 mr-2 select-none">
                            Q{questionNumber}.
                        </span>
                    )}
                    {questionText}
                </h3>

                {/* Answer options */}
                <div className="space-y-3 select-none" role="radiogroup" aria-label="Answer options">
                    {options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        return (
                            <button
                                key={index}
                                onClick={() => onSelectAnswer?.(index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-body select-none ${isSelected
                                    ? 'border-yellow-accent bg-yellow-light/30 shadow-sticky'
                                    : 'border-ruled/50 bg-cream/30 hover:border-navy/20 hover:bg-cream/60'
                                    }`}
                                role="radio"
                                aria-checked={isSelected}
                            >
                                <span className="inline-flex items-center gap-3 select-none">
                                    <span
                                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm flex-shrink-0 transition-colors ${isSelected
                                            ? 'border-yellow-accent bg-yellow-accent text-navy'
                                            : 'border-navy/20 text-navy/40'
                                            }`}
                                    >
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="text-navy select-none font-body">{option}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
