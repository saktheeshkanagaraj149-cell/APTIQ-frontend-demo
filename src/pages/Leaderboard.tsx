import { useState } from 'react';
import { LeaderboardScreen } from '../components/leaderboard/LeaderboardScreen';
import { FilterBar, type FilterKey } from '../components/leaderboard/FilterBar';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';
import { leaderboardEntries } from '../data/leaderboard';

/**
 * Leaderboard – Page composing LeaderboardScreen, FilterBar, LeaderboardTable.
 *
 * Side-effects (TODO):
 *   - Socket.io: listen to 'leaderboard:update' to refresh students
 *   - Socket.io: emit 'leaderboard:subscribe' with activeFilter
 */
export default function Leaderboard() {
    const [activeFilter, setActiveFilter] = useState<FilterKey>('all-india');

    const students = leaderboardEntries.map((entry) => ({
        rank: entry.rank,
        name: entry.name,
        college: entry.college,
        score: entry.score,
        accuracy: Math.round(60 + Math.random() * 35),
        timeTaken: `${Math.round(30 + Math.random() * 40)}s`,
    }));

    const currentUser = leaderboardEntries.find((e) => e.isCurrentUser);

    return (
        <LeaderboardScreen>
            {currentUser && (
                <div className="bg-yellow-accent/15 border-2 border-yellow-accent/30 rounded-xl p-5 mb-6 flex items-center gap-4 shadow-sm animate-fade-in">
                    <div className="w-12 h-12 bg-yellow-accent rounded-full flex items-center justify-center">
                        <span className="font-caveat text-2xl font-bold text-navy">{currentUser.rank}</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-caveat text-xl font-bold text-navy">Your Rank: #{currentUser.rank}</p>
                        <p className="font-body text-sm text-navy/60">Score: {currentUser.score.toLocaleString()} • {currentUser.college}</p>
                    </div>
                </div>
            )}
            <FilterBar activeFilter={activeFilter} onFilterChange={(f) => setActiveFilter(f)} className="mb-6" />
            <LeaderboardTable students={students} currentUserId={currentUser?.name || ''} />
            <p className="text-center font-body text-sm text-navy/40 mt-6">🔄 Rankings update in real-time via Socket.io</p>
        </LeaderboardScreen>
    );
}
