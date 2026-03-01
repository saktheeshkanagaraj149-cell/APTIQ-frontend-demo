/**
 * LeaderboardRow – Single row in the leaderboard table.
 * Applies gold/silver/bronze left border for top 3 ranks.
 *
 * @param rank - Position on the leaderboard (1-based)
 * @param name - Student display name
 * @param college - College/institute name
 * @param score - Total score points
 * @param accuracy - Accuracy percentage (0–100)
 * @param timeTaken - Average time string (e.g. "42s")
 * @param isHighlighted - Highlights the row for the current logged-in user
 * @param className - Additional Tailwind classes for extensibility
 */

interface LeaderboardRowProps {
    rank: number;
    name: string;
    college: string;
    score: number;
    accuracy: number;
    timeTaken: string;
    isHighlighted?: boolean;
    className?: string;
}

/** Gold / Silver / Bronze border colors for top 3 */
const rankBorderColors: Record<number, string> = {
    1: 'border-l-[#FFD700]',
    2: 'border-l-[#C0C0C0]',
    3: 'border-l-[#CD7F32]',
};

/** Medal emojis for top 3 */
const rankMedals: Record<number, string> = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
};

/** Background tints for top 3 */
const rankBgColors: Record<number, string> = {
    1: 'bg-[#FFD700]/5',
    2: 'bg-[#C0C0C0]/5',
    3: 'bg-[#CD7F32]/5',
};

export function LeaderboardRow({
    rank,
    name,
    college,
    score,
    accuracy,
    timeTaken,
    isHighlighted = false,
    className = '',
}: LeaderboardRowProps) {
    const isTopThree = rank <= 3;
    const borderColor = rankBorderColors[rank] || 'border-l-transparent';
    const bgColor = isHighlighted
        ? 'bg-yellow-accent/15'
        : isTopThree
            ? rankBgColors[rank] || ''
            : '';

    return (
        <div
            className={`grid grid-cols-12 gap-2 px-4 sm:px-5 py-4 items-center border-b border-ruled/30 border-l-4 ${borderColor} transition-all duration-200 hover:bg-cream/50 ${bgColor} ${className}`}
            role="row"
            aria-label={`Rank ${rank}: ${name}, Score: ${score}`}
        >
            {/* Rank */}
            <div className="col-span-1 flex items-center justify-center" role="cell">
                {isTopThree ? (
                    <span className="text-xl" role="img" aria-label={`Rank ${rank}`}>
                        {rankMedals[rank]}
                    </span>
                ) : (
                    <span className="font-caveat text-lg font-bold text-navy/40">
                        #{rank}
                    </span>
                )}
            </div>

            {/* Student name + avatar */}
            <div className="col-span-4 sm:col-span-3 flex items-center gap-3" role="cell">
                <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isTopThree ? 'bg-yellow-accent/40' : 'bg-sky-soft/40'
                        }`}
                >
                    <span className="font-caveat font-bold text-navy text-sm">
                        {name.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div className="min-w-0">
                    <p
                        className={`font-body text-sm truncate ${isHighlighted ? 'font-bold text-navy' : 'text-navy/80'
                            }`}
                    >
                        {name}
                    </p>
                </div>
            </div>

            {/* College */}
            <div className="col-span-3 hidden sm:flex items-center" role="cell">
                <span className="font-body text-sm text-navy/50 truncate">
                    {college}
                </span>
            </div>

            {/* Accuracy */}
            <div className="col-span-2 hidden lg:flex items-center justify-center" role="cell">
                <span
                    className={`font-body text-sm font-medium ${accuracy >= 80
                            ? 'text-green-700'
                            : accuracy >= 60
                                ? 'text-yellow-700'
                                : 'text-red-500'
                        }`}
                >
                    {accuracy}%
                </span>
            </div>

            {/* Time Taken */}
            <div className="col-span-2 hidden lg:flex items-center justify-center" role="cell">
                <span className="font-body text-sm text-navy/50">{timeTaken}</span>
            </div>

            {/* Score */}
            <div className="col-span-5 sm:col-span-3 lg:col-span-1 flex items-center justify-end" role="cell">
                <span className="font-caveat text-lg font-bold text-navy">
                    {score.toLocaleString()}
                </span>
            </div>
        </div>
    );
}
