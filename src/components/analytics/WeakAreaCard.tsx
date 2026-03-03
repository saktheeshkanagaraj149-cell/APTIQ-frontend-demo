/**
 * WeakAreaCard – Lists weak topics that need improvement.
 * Each topic shows its name and accuracy with color-coded text.
 *
 * @param topics - Array of { name, accuracy } objects
 * @param className - Additional Tailwind classes for extensibility
 */

interface WeakTopic {
    name: string;
    accuracy: number;
}

interface WeakAreaCardProps {
    topics: WeakTopic[];
    className?: string;
}

export function WeakAreaCard({
    topics,
    className = '',
}: WeakAreaCardProps) {
    // Sort by lowest accuracy first
    const sorted = [...topics].sort((a, b) => a.accuracy - b.accuracy);

    return (
        <div
            className={`bg-white rounded-xl p-5 shadow-md border border-cream ${className}`}
        >
            <h4 className="font-caveat text-xl font-bold text-navy mb-4">
                🔍 Weak Areas to Improve
            </h4>

            {sorted.length === 0 ? (
                <p className="font-body text-navy/40 text-center py-4">
                    No weak areas found — great job! 🎉
                </p>
            ) : (
                <div className="space-y-3">
                    {sorted.map((topic, index) => {
                        const color =
                            topic.accuracy >= 80
                                ? 'text-green-700'
                                : topic.accuracy >= 50
                                    ? 'text-orange-600'
                                    : 'text-red-500';

                        const barColor =
                            topic.accuracy >= 80
                                ? 'bg-green-soft'
                                : topic.accuracy >= 50
                                    ? 'bg-yellow-accent'
                                    : 'bg-pink-light';

                        return (
                            <div
                                key={`${topic.name}-${index}`}
                                className="group"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-body text-sm text-navy/80 group-hover:text-navy transition-colors">
                                        {topic.name}
                                    </span>
                                    <span className={`font-caveat text-base font-bold ${color}`}>
                                        {topic.accuracy}%
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-cream rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${barColor} rounded-full transition-all duration-500`}
                                        style={{ width: `${topic.accuracy}%` }}
                                        role="progressbar"
                                        aria-valuenow={topic.accuracy}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
