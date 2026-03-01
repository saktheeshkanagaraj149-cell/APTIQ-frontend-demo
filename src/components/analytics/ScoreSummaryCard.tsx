/**
 * ScoreSummaryCard – Large score display card with yellow background.
 * Shows total score, max score, percentile, and time taken.
 *
 * @param totalScore - Score achieved by the student
 * @param maxScore - Maximum possible score
 * @param percentile - Student's percentile ranking
 * @param timeTaken - Total time taken (e.g. "23m 45s")
 * @param className - Additional Tailwind classes for extensibility
 */

interface ScoreSummaryCardProps {
    totalScore: number;
    maxScore: number;
    percentile: number;
    timeTaken: string;
    className?: string;
}

export function ScoreSummaryCard({
    totalScore,
    maxScore,
    percentile,
    timeTaken,
    className = '',
}: ScoreSummaryCardProps) {
    const percentage = Math.round((totalScore / maxScore) * 100);

    const percentageColor =
        percentage >= 80
            ? 'text-green-700'
            : percentage >= 50
                ? 'text-orange-600'
                : 'text-red-500';

    return (
        <div
            className={`bg-[#fff176] rounded-xl p-6 sm:p-8 shadow-md border border-cream relative overflow-hidden ${className}`}
        >
            {/* Decorative pencil doodle */}
            <div className="absolute top-3 right-4 text-3xl opacity-10 rotate-12 select-none" aria-hidden="true">
                ✏️
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Score circle */}
                <div className="relative w-28 h-28 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-28 h-28 transform -rotate-90" aria-label={`Score: ${percentage}%`}>
                        <path
                            d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
                            fill="none"
                            stroke="rgba(26,58,92,0.1)"
                            strokeWidth="3"
                        />
                        <path
                            d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
                            fill="none"
                            stroke="#1a3a5c"
                            strokeWidth="3"
                            strokeDasharray={`${percentage}, 100`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-caveat text-3xl font-bold text-navy">{totalScore}</span>
                        <span className="font-body text-xs text-navy/50">/ {maxScore}</span>
                    </div>
                </div>

                {/* Stats grid */}
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <div className="text-center sm:text-left">
                        <p className="font-body text-xs text-navy/50 uppercase tracking-wide">Accuracy</p>
                        <p className={`font-caveat text-2xl font-bold ${percentageColor}`}>
                            {percentage}%
                        </p>
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="font-body text-xs text-navy/50 uppercase tracking-wide">Percentile</p>
                        <p className="font-caveat text-2xl font-bold text-navy">
                            {percentile}<span className="text-base text-navy/50">th</span>
                        </p>
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="font-body text-xs text-navy/50 uppercase tracking-wide">Time Taken</p>
                        <p className="font-caveat text-2xl font-bold text-navy">{timeTaken}</p>
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="font-body text-xs text-navy/50 uppercase tracking-wide">Status</p>
                        <p className="font-caveat text-2xl font-bold">
                            {percentage >= 60 ? (
                                <span className="text-green-700">✅ Pass</span>
                            ) : (
                                <span className="text-red-500">❌ Fail</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
