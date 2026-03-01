import { LeaderboardRow } from './LeaderboardRow';

/**
 * LeaderboardTable – Renders the full leaderboard from a students array.
 * Designed for Socket.io data injection — accepts students[] prop directly.
 *
 * @param students - Array of student objects from the server
 * @param currentUserId - ID or name of the logged-in user (for row highlighting)
 * @param className - Additional Tailwind classes for extensibility
 */

interface Student {
    rank: number;
    name: string;
    college: string;
    score: number;
    accuracy: number;
    timeTaken: string;
}

interface LeaderboardTableProps {
    students: Student[];
    currentUserId?: string;
    className?: string;
}

export function LeaderboardTable({
    students,
    currentUserId = '',
    className = '',
}: LeaderboardTableProps) {
    return (
        <div
            className={`bg-white rounded-xl shadow-card overflow-hidden ${className}`}
            role="table"
            aria-label="Leaderboard rankings"
        >
            {/* Table header */}
            <div
                className="grid grid-cols-12 gap-2 px-4 sm:px-5 py-3 bg-navy/5 border-b-2 border-ruled border-l-4 border-l-transparent"
                role="row"
                aria-label="Column headers"
            >
                <div className="col-span-1 font-body text-xs text-navy/50 uppercase tracking-wider text-center" role="columnheader">
                    Rank
                </div>
                <div className="col-span-4 sm:col-span-3 font-body text-xs text-navy/50 uppercase tracking-wider" role="columnheader">
                    Student
                </div>
                <div className="col-span-3 hidden sm:block font-body text-xs text-navy/50 uppercase tracking-wider" role="columnheader">
                    College
                </div>
                <div className="col-span-2 hidden lg:block font-body text-xs text-navy/50 uppercase tracking-wider text-center" role="columnheader">
                    Accuracy
                </div>
                <div className="col-span-2 hidden lg:block font-body text-xs text-navy/50 uppercase tracking-wider text-center" role="columnheader">
                    Time
                </div>
                <div className="col-span-5 sm:col-span-3 lg:col-span-1 font-body text-xs text-navy/50 uppercase tracking-wider text-right" role="columnheader">
                    Score
                </div>
            </div>

            {/* Rows */}
            <div role="rowgroup">
                {students.map((student, index) => (
                    <LeaderboardRow
                        key={`${student.rank}-${student.name}-${index}`}
                        rank={student.rank}
                        name={student.name}
                        college={student.college}
                        score={student.score}
                        accuracy={student.accuracy}
                        timeTaken={student.timeTaken}
                        isHighlighted={student.name === currentUserId}
                    />
                ))}

                {/* Empty state */}
                {students.length === 0 && (
                    <div className="text-center py-12">
                        <p className="font-caveat text-2xl text-navy/30 mb-2">📊</p>
                        <p className="font-body text-navy/40">No students to display</p>
                    </div>
                )}
            </div>
        </div>
    );
}
