/**
 * SectionBreakdownCard – Per-subject stats card showing correct, wrong,
 * skipped counts and accuracy percentage.
 *
 * @param subject - Name of the section/subject
 * @param correct - Number of correct answers
 * @param wrong - Number of wrong answers
 * @param skipped - Number of skipped questions
 * @param accuracy - Accuracy percentage (0–100)
 * @param className - Additional Tailwind classes for extensibility
 */

interface SectionBreakdownCardProps {
    subject: string;
    correct: number;
    wrong: number;
    skipped: number;
    accuracy: number;
    className?: string;
}

export function SectionBreakdownCard({
    subject,
    correct,
    wrong,
    skipped,
    accuracy,
    className = '',
}: SectionBreakdownCardProps) {
    const total = correct + wrong + skipped;

    // Accuracy color: ≥80 green, 50–79 orange, <50 red
    const accuracyColor =
        accuracy >= 80
            ? 'text-green-700'
            : accuracy >= 50
                ? 'text-orange-600'
                : 'text-red-500';

    const accuracyBg =
        accuracy >= 80
            ? 'bg-green-soft/30'
            : accuracy >= 50
                ? 'bg-yellow-accent/20'
                : 'bg-pink-light/30';

    return (
        <div
            className={`bg-white rounded-xl p-5 shadow-md border border-cream hover:shadow-lg transition-shadow duration-200 ${className}`}
        >
            {/* Header: subject name + accuracy */}
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-caveat text-xl font-bold text-navy">{subject}</h4>
                <span
                    className={`px-3 py-1 rounded-full font-caveat text-lg font-bold ${accuracyColor} ${accuracyBg}`}
                >
                    {accuracy}%
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden mb-4">
                <div className="h-full flex rounded-full overflow-hidden">
                    {/* Correct segment (green) */}
                    {correct > 0 && (
                        <div
                            className="bg-green-soft h-full transition-all duration-500"
                            style={{ width: `${(correct / total) * 100}%` }}
                            aria-label={`Correct: ${correct}`}
                        />
                    )}
                    {/* Wrong segment (red/pink) */}
                    {wrong > 0 && (
                        <div
                            className="bg-pink-light h-full transition-all duration-500"
                            style={{ width: `${(wrong / total) * 100}%` }}
                            aria-label={`Wrong: ${wrong}`}
                        />
                    )}
                    {/* Skipped segment (grey) */}
                    {skipped > 0 && (
                        <div
                            className="bg-ruled/50 h-full transition-all duration-500"
                            style={{ width: `${(skipped / total) * 100}%` }}
                            aria-label={`Skipped: ${skipped}`}
                        />
                    )}
                </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-green-soft rounded-full" aria-hidden="true" />
                    <span className="font-body text-navy/60">
                        Correct: <span className="font-semibold text-navy">{correct}</span>
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-pink-light rounded-full" aria-hidden="true" />
                    <span className="font-body text-navy/60">
                        Wrong: <span className="font-semibold text-navy">{wrong}</span>
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-ruled/50 rounded-full" aria-hidden="true" />
                    <span className="font-body text-navy/60">
                        Skipped: <span className="font-semibold text-navy">{skipped}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
