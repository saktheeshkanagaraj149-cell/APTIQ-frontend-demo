/**
 * LeaderboardCard – Displays a single student's leaderboard entry
 * with rank badge, name, score, and college info.
 *
 * @param studentName - Display name of the student
 * @param rank - Numeric rank position (1-based)
 * @param score - Total score points
 * @param badgeColor - Tailwind bg color class for the avatar circle
 * @param college - College/institute name (optional)
 * @param isCurrentUser - Highlight if this is the logged-in user
 * @param className - Additional Tailwind classes for extensibility
 */

interface LeaderboardCardProps {
    studentName: string;
    rank: number;
    score: number;
    badgeColor: string;
    college?: string;
    isCurrentUser?: boolean;
    className?: string;
}

const medalEmojis: Record<number, string> = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
};

export function LeaderboardCard({
    studentName,
    rank,
    score,
    badgeColor,
    college = '',
    isCurrentUser = false,
    className = '',
}: LeaderboardCardProps) {
    return (
        <div
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isCurrentUser
                    ? 'bg-yellow-accent/20 border border-yellow-accent/40 shadow-sm'
                    : 'hover:bg-cream/60'
                } ${className}`}
            role="listitem"
            aria-label={`Rank ${rank}: ${studentName}, Score: ${score}`}
        >
            {/* Rank Badge */}
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                {rank <= 3 ? (
                    <span className="text-xl" role="img" aria-label={`Rank ${rank} medal`}>
                        {medalEmojis[rank]}
                    </span>
                ) : (
                    <span className="font-caveat text-lg font-bold text-navy/40">
                        #{rank}
                    </span>
                )}
            </div>

            {/* Avatar */}
            <div
                className={`w-9 h-9 ${badgeColor} rounded-full flex items-center justify-center flex-shrink-0`}
            >
                <span className="font-caveat font-bold text-navy text-sm">
                    {studentName.charAt(0).toUpperCase()}
                </span>
            </div>

            {/* Name & College */}
            <div className="flex-1 min-w-0">
                <p
                    className={`font-body text-sm truncate ${isCurrentUser ? 'font-bold text-navy' : 'text-navy/80'
                        }`}
                >
                    {studentName}
                </p>
                {college && (
                    <p className="font-body text-xs text-navy/40 truncate">
                        {college}
                    </p>
                )}
            </div>

            {/* Score */}
            <span className="font-caveat text-lg font-bold text-navy flex-shrink-0">
                {score.toLocaleString()}
            </span>
        </div>
    );
}
